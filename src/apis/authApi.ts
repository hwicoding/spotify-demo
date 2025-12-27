import axios from "axios";

import { clientID, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { SPOTIFY_REDIRECT_URI } from "../configs/commonConfig";

const encodeBase64 = (data: string): string => {
  if (typeof Buffer === 'undefined') {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString('base64')
  }
}

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials'
    });

    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodeBase64(clientID + ":" + clientSecret)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;

  } catch (error) {
    throw new Error(
      "Failed to fetch client credential token"
    )
  }
}

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    if (!clientID || !SPOTIFY_REDIRECT_URI) {
      throw new Error("Missing required parameters");
    }
    const body = new URLSearchParams({
      client_id: clientID,
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
      redirect_uri: SPOTIFY_REDIRECT_URI
    });

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch exchange token"
    )
  }
}