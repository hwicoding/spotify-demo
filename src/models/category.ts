import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface GetCategoriesResponse {
  categories: ApiResponse<Category>;
}
