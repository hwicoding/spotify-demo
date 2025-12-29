import { useInfiniteQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi"
import { GetCurrentUserPlaylistsRequest } from "../models/playlist"

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistsRequest) => {
  const accessToken = localStorage.getItem("accessToken");
  return useInfiniteQuery({
    queryKey: ["current-user-playlists", accessToken],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    enabled: !!accessToken,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  })
}

export default useGetCurrentUserPlaylists