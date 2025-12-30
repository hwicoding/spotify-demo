import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Box, Grid, styled, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DefaultImage from "../../common/components/DefaultImage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",
  boxShadow: "0 4px 60px rgba(0,0,0,.5)",
  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",
  fontWeight: 900,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Navigate to="/" />;

  const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <Box sx={{ flex: 1, overflowY: "auto", color: "white" }}>
      <PlaylistHeader container spacing={4}>
        <ImageGrid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
          {playlist?.images && playlist.images.length > 0 ? (
            <AlbumImage src={playlist.images[0].url} alt={playlist.name} />
          ) : (
            <DefaultImage>
              <MusicNoteIcon sx={{ fontSize: 80, color: "#b3b3b3" }} />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ xs: 12, sm: 8, md: 9, lg: 10 }}>
          <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, textTransform: "uppercase" }}>
              Playlist
            </Typography>
            <ResponsiveTypography variant="h1">
              {playlist?.name}
            </ResponsiveTypography>
            {playlist?.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                {playlist.description}
              </Typography>
            )}
            <Box display="flex" alignItems="center" mt={2} flexWrap="wrap" gap={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                {playlist?.owner?.display_name || "Unknown"}
              </Typography>
              {playlist?.tracks?.total !== undefined && (
                <Typography variant="subtitle2" color="text.secondary">
                  • {playlist.tracks.total.toLocaleString()} songs
                </Typography>
              )}
              {playlist?.followers?.total !== undefined && (
                <Typography variant="subtitle2" color="text.secondary">
                  • {playlist.followers.total.toLocaleString()} likes
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>

      {/* Track list section will go here */}
      <Box p={3}>
        {/* TODO: Implement Track List */}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;