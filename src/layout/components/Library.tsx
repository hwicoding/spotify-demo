
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import ErrorMessage from "../../common/components/ErrorMessage";
import EmptyPlaylist from "./EmptyPlaylist";
import styled from "@emotion/styled";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import Playlist from "./Playlist";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
}));
const Library = () => {
  const { data, isLoading, error } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });


  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data.pages.flatMap((page) => page.items).length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>

          <Playlist playlists={data.pages.flatMap((page) => page.items)} />


        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;

