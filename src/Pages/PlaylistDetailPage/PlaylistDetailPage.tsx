import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DefaultImage from "../../common/components/DefaultImage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoginButton from "../../common/components/LoginButton";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import { Episode } from "../../models/track";

const PlaylistHeader = styled(Grid)(({ theme }) => ({
  display: "flex",
  padding: "80px 30px 40px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)",
  minHeight: "340px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 16px 24px",
    textAlign: "center",
    minHeight: "auto",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "transparent",
  color: theme.palette.common.white,
  padding: "0 30px",
  "& .MuiTableHead-root": {
    "& .MuiTableCell-root": {
      backgroundColor: "transparent",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.7)",
      textTransform: "uppercase",
      fontSize: "0.75rem",
      fontWeight: "bold",
    },
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();

  if (!id) return <Navigate to="/" />;

  const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: playlistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const firstTrack = playlistItems?.pages[0]?.items[0]?.track;
  const fallbackImage = (firstTrack && "album" in firstTrack && firstTrack.album?.images?.[0]?.url) ||
    (firstTrack && "images" in firstTrack && (firstTrack as Episode).images?.[0]?.url);

  // 상세 페이지에서 계산된 Fallback 이미지를 사이드바 캐시에도 강제로 주입합니다.
  useEffect(() => {
    if (fallbackImage && playlist && id) {
      // 이미 플레이리스트 원본 이미지가 있다면 (Spotify가 생성 완료했다면) 주입하지 않습니다.
      const hasOriginalImage = playlist.images && playlist.images.length > 0 && !!playlist.images[0].url;
      if (hasOriginalImage) return;

      // 사이드바 목록 캐시를 직접 수정하여 즉시 반영되도록 합니다.
      queryClient.setQueriesData({ queryKey: ["current-user-playlists"] }, (oldData: any) => {
        if (!oldData || !oldData.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            items: page.items.map((item: any) => {
              if (item.id === id) {
                // 이미지가 없거나, 우리가 주입한 이미지와 다를 경우에만 업데이트
                const currentImg = item.images?.[0]?.url;
                if (!currentImg || currentImg !== fallbackImage) {
                  return {
                    ...item,
                    images: [{ url: fallbackImage }]
                  };
                }
              }
              return item;
            }),
          })),
        };
      });
    }
  }, [fallbackImage, playlist, id, queryClient]);

  if (isLoading) return <LoadingSpinner />;

  if (error || playlistItemsError) {
    const isAuthError =
      (axios.isAxiosError(error) && error.response?.status === 401) ||
      (axios.isAxiosError(playlistItemsError) && playlistItemsError.response?.status === 401);

    if (isAuthError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load" />;
  }

  return (
    <Box>
      <PlaylistHeader container spacing={4} alignItems="flex-end">
        <Grid size="auto">
          {playlist?.images?.[0]?.url ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              style={{ width: "100%", maxWidth: 232, height: "auto", aspectRatio: "1/1", boxShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
            />
          ) : fallbackImage ? (
            <img
              src={fallbackImage}
              alt={playlist?.name}
              style={{ width: "100%", maxWidth: 232, height: "auto", aspectRatio: "1/1", boxShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
            />
          ) : (
            <DefaultImage sx={{ width: "100%", maxWidth: 232, aspectRatio: "1/1" }}>
              <MusicNoteIcon style={{ fontSize: 100 }} />
            </DefaultImage>
          )}
        </Grid>
        <Grid size="grow">
          <Typography variant="overline" fontWeight="bold">
            PLAYLIST
          </Typography>
          <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: "2rem", md: "6rem" }, my: 2 }}>
            {playlist?.name}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }}>
            <Typography variant="body2" fontWeight="bold">
              {playlist?.owner?.display_name}
            </Typography>
            {playlist?.tracks?.total !== undefined && (
              <Typography variant="body2" color="rgba(255,255,255,0.7)" ml={1}>
                • {playlist.tracks.total} songs
              </Typography>
            )}
          </Box>
        </Grid>
      </PlaylistHeader>

      <StyledTableContainer>
        {playlist?.tracks?.total === 0 ? (
          <EmptyPlaylistWithSearch playlist_id={id} />
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Album</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Date added</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <DesktopPlaylistItem
                      item={item}
                      key={`${pageIndex}-${itemIndex}`}
                      index={pageIndex * PAGE_LIMIT + itemIndex}
                    />
                  );
                })
              )}
              <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </Box>
  );
};

export default PlaylistDetailPage;