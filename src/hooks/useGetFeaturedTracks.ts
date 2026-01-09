import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SEARCH_TYPE } from "../models/search";

const useGetFeaturedTracks = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['featured-tracks'],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      // recommendations 대신 더 안정적인 search API를 사용하여 홈페이지 트랙을 가져옵니다.
      return searchItemsByKeyword(clientCredentialToken, {
        q: "top 2024",
        type: [SEARCH_TYPE.Track],
        limit: 12,
      });
    },
    enabled: !!clientCredentialToken,
  })
}

export default useGetFeaturedTracks;
