import React from "react";
import { Card, CardMedia, Typography, Box, IconButton, styled } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#181818",
  padding: theme.spacing(2),
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  position: "relative",
  "&:hover": {
    backgroundColor: "#282828",
  },
  "&:hover .play-button": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#1db954",
  color: "black",
  position: "absolute",
  bottom: "16px",
  right: "16px",
  opacity: 0,
  transform: "translateY(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1ed760",
    transform: "scale(1.05)",
  },
  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
})) as typeof IconButton;

interface SearchResultCardProps {
  image?: string;
  title: string;
  subtitle: string;
  type?: "artist" | "album" | "playlist" | "track";
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ image, title, subtitle, type }) => {
  return (
    <StyledCard>
      <Box sx={{ position: "relative", mb: 2 }}>
        <CardMedia
          component="img"
          image={image || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A467b4c?v=v2"}
          alt={title}
          sx={{
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: type === "artist" ? "50%" : "4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        />
        <PlayButton className="play-button" size="large">
          <PlayArrowIcon fontSize="large" />
        </PlayButton>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#b3b3b3",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {subtitle}
      </Typography>
    </StyledCard>
  );
};

export default SearchResultCard;
