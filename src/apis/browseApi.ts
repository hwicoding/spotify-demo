import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { RecommendationsResponse } from "../models/track";

export const getRecommendations = async (token: string, seed_genres: string = "pop,k-pop"): Promise<RecommendationsResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_genres,
        limit: 20,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch recommendations");
  }
};
