import { useEffect, useRef } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import ErrorMessage from "../../common/components/ErrorMessage";
import EmptyPlaylist from "./EmptyPlaylist";
import styled from "@emotion/styled";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import Playlist from "./Playlist";
import { Box } from "@mui/material";

const PlaylistContainer = styled("div")({
  overflowY: "auto",
  flex: 1,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const Library = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetCurrentUserPlaylists({ limit: 20, offset: 0 });

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const allPlaylists = data?.pages.flatMap((page) => page.items) || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {!data || allPlaylists.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <Playlist playlists={allPlaylists} />
          <div ref={observerRef} style={{ height: "20px" }}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </PlaylistContainer>
      )}
    </Box>
  );
};

export default Library;

