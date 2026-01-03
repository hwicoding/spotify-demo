import { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
  const response = await api.get('/me');
  return response.data;
};