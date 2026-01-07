import { useQuery } from "@tanstack/react-query";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SEARCH_TYPE } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

export const useSearch = (keyword: string) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["search", keyword],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return searchItemsByKeyword(clientCredentialToken, {
        q: keyword,
        type: [
          SEARCH_TYPE.Track,
          SEARCH_TYPE.Artist,
          SEARCH_TYPE.Album,
          SEARCH_TYPE.Playlist,
        ],
        limit: 10,
      });
    },
    enabled: !!clientCredentialToken && !!keyword,
  });
};
