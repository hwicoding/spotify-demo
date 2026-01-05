import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
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

const PlaylistHeader = styled(Grid)({
  display: "flex",
  padding: "80px 30px 40px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)",
  minHeight: "340px",
});

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
              style={{ width: 232, height: 232, boxShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
            />
          ) : (
            <DefaultImage sx={{ width: 232, height: 232 }}>
              <MusicNoteIcon style={{ fontSize: 100 }} />
            </DefaultImage>
          )}
        </Grid>
        <Grid size="grow">
          <Typography variant="overline" fontWeight="bold">
            PLAYLIST
          </Typography>
          <Typography variant="h1" fontWeight="bold" sx={{ fontSize: "6rem", my: 2 }}>
            {playlist?.name}
          </Typography>
          <Box display="flex" alignItems="center">
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
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
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