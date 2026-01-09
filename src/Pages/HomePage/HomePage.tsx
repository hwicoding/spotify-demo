import React from "react";
import NewReleases from "./components/NewReleases";
import Tracks from "./components/Tracks";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2rem', fontWeight: 800 }}>
        Home
      </Typography>

      <Tracks />
      <NewReleases />
    </Box>
  );
};

export default HomePage;