import axios from "axios";

import { clientID, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

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