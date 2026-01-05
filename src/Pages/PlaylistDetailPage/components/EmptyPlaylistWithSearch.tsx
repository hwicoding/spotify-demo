import { Box, InputAdornment, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Box)({
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",

  "& .MuiInputBase-root": {
    borderRadius: "500px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    paddingLeft: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.2)",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255, 255, 255, 0.5)",
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <SearchContainer>
      <Box display="inline-block" width="100%">
        <Typography variant="h5" fontWeight={700} mb="20px">
          Let's find something for your playlist
        </Typography>

        <StyledTextField
          value={keyword}
          autoComplete="off"
          variant="outlined"
          placeholder="Search for songs or episodes"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearchKeyword}
        />
      </Box>
      <div style={{ marginTop: "20px" }}>
        {keyword === "" ? (
          <></>
        ) : isLoading && !isFetchingNextPage ? (
          <LoadingSpinner />
        ) : hasResults ? (
          <SearchResultList
            list={tracks}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {`No results found for "${keyword}"`}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.5)">
              Please check your spelling or use more general keywords.
            </Typography>
          </Box>
        )}
      </div>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;



