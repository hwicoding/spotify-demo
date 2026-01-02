import React, { useEffect } from "react";
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
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  padding: "40px 30px",
  background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
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
  if (error) return <ErrorMessage errorMessage={error.message} />;

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
          <Typography p={4}>No tracks in this playlist.</Typography>
        ) : (
          <Table>
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

      <Box p={3}>
        {/* Additional sections can go here */}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;