import type { LoaderFunctionArgs } from "react-router-dom";
import type { Person, Planet, Starship } from "../../../services/api-service/api-models";
import { ApiService, type CategoryMap } from "../../../services/api-service/api-service";

export interface SearchLoaderData {
  items: (Person | Planet | Starship)[]
  totalPages: number;
  searchQuery: string;
  currentPage: number;
}

export const searchResultLoader = async ({
  params,
  request
}: LoaderFunctionArgs): Promise<SearchLoaderData> => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search') || '';
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const categoryName = (params.categoryName as keyof CategoryMap) || 'people';

  const data = await ApiService.getData(categoryName, searchQuery, currentPage);

  return {
    items: data.results || [],
    totalPages: Math.ceil((data.count || 0) / 10),
    searchQuery,
    currentPage
  };
};