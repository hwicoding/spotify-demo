import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCurrentUserProfile } from "../apis/userApi"
import { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: () => getCurrentUserProfile(),
    enabled: !!accessToken,
  })
}

export default useGetCurrentUserProfile;