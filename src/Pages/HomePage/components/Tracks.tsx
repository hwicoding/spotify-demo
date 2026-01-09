import { Grid, Typography, Box } from "@mui/material";
import useGetFeaturedTracks from "../../../hooks/useGetFeaturedTracks";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const Tracks = () => {
  const { data, isLoading, error } = useGetFeaturedTracks();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  // searchItemsByKeyword를 사용하므로 data.tracks.items를 사용합니다.
  const tracks = data?.tracks?.items || [];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h1" sx={{ mb: 3, fontWeight: 700 }}>
        Popular Tracks for You
      </Typography>
      {tracks.length > 0 ? (
        <Grid container spacing={3}>
          {tracks.map((track) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={track.id}>
              <Card
                name={track.name}
                artistName={track.artists
                  ?.map((artist: any) => artist.name)
                  .join(", ")}
                image={track.album?.images[0].url}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No tracks available at the moment.
        </Typography>
      )}
    </Box>
  );
};

export default Tracks;
