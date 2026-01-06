import React from "react";
import { Box, Typography, TextField, InputAdornment, Grid, Card, CardMedia, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useGetCategories from "../../hooks/useGetCategories";

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "400px",
  marginBottom: theme.spacing(4),
  "& .MuiOutlinedInput-root": {
    borderRadius: "500px",
    backgroundColor: "#242424",
    paddingLeft: theme.spacing(2),
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid white",
    },
    "& input": {
      color: "white",
      padding: "12px 14px 12px 0",
    }
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  borderRadius: "8px",
  position: "relative",
  overflow: "hidden",
  height: "200px",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  }
}));

const CategoryTitle = styled(Typography)({
  color: "white",
  fontWeight: 700,
  fontSize: "24px",
  padding: "16px",
  wordBreak: "break-word",
  maxWidth: "80%",
});

const CategoryImage = styled(CardMedia)({
  width: "100px",
  height: "100px",
  position: "absolute",
  bottom: "-10px",
  right: "-10px",
  transform: "rotate(25deg)",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
}) as typeof CardMedia;

const getRandomColor = () => {
  const colors = [
    "#E13300", "#1E3264", "#E8115B", "#148A08", "#BC5900",
    "#77327D", "#8D67AB", "#DC148C", "#477D95", "#0D73EC",
    "#D84000", "#E91429", "#7D4B32", "#503750", "#AF2896"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SearchPage = () => {
  const { data: categoriesData, isLoading } = useGetCategories();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchInput
          placeholder="What do you want to listen to?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#b3b3b3" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Typography variant="h1" sx={{ mb: 3 }}>
        Browse all
      </Typography>

      {isLoading ? (
        <Typography>Loading categories...</Typography>
      ) : (
        <Grid container spacing={3}>
          {categoriesData?.categories.items.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={category.id}>
              <CategoryCard sx={{ backgroundColor: getRandomColor() }}>
                <CategoryTitle variant="h1">
                  {category.name}
                </CategoryTitle>
                <CategoryImage
                  component="img"
                  image={category.icons[0]?.url}
                  alt={category.name}
                />
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;