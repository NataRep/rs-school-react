import type { LoaderFunctionArgs } from "react-router"; // в v7 импортируем из 'react-router'
import type { Person, Planet, Starship } from "../../../services/api-service/api-models";
import { ApiService, type CategoryMap } from "../../../services/api-service/api-service";

export interface SearchLoaderData {
  deferredData: Promise<{
    items: (Person | Planet | Starship)[];
    totalPages: number;
  }>;
  searchQuery: string;
  currentPage: number;
}

const VALID_CATEGORIES: (keyof CategoryMap)[] = ['people', 'planets', 'starships'];

export const searchResultLoader = ({
  params,
  request
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search') || '';
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const categoryName = params.categoryName as keyof CategoryMap;

  if (!categoryName || !VALID_CATEGORIES.includes(categoryName)) {
    throw new Response("Not Found", { status: 404, statusText: "Invalid Category" });
  }

  const apiPromise = ApiService.getData(categoryName, searchQuery, currentPage).then((data) => ({
    items: data.results || [],
    totalPages: Math.ceil((data.count || 0) / 10),
  }));

  return {
    deferredData: apiPromise,
    searchQuery,
    currentPage
  };
};