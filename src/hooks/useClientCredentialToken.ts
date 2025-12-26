import { useQuery } from "@tanstack/react-query"
import { getClientCredientialToken } from "../apis/authApi"

const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ['client-credential-token'],
    queryFn: getClientCredientialToken
  })
  const clientCredentialToken = data?.access_token;
  return clientCredentialToken;
}

export default useClientCredentialToken;
