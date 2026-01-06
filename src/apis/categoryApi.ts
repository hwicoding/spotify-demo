import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetCategoriesResponse } from "../models/category";

export const getCategories = async (token: string): Promise<GetCategoriesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
