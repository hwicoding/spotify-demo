import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.removeItem("code_verifier");
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
    onError: () => {

    },

  });
}

export default useExchangeToken;