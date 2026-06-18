import type { LoaderFunctionArgs } from 'react-router'; // в v7 импортируем из 'react-router'
import type { Person, Planet, Starship } from '../../../store/api-models';
import type { CategoryMap } from '../../../store/starWarsApi';

export interface SearchLoaderData {
  deferredData: Promise<{
    items: (Person | Planet | Starship)[];
    totalPages: number;
  }>;
  searchQuery: string;
  currentPage: number;
}

const VALID_CATEGORIES: (keyof CategoryMap)[] = [
  'people',
  'planets',
  'starships',
];

export const searchResultLoader = ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search') || '';
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const categoryName = params.categoryName as keyof CategoryMap;

  if (!categoryName || !VALID_CATEGORIES.includes(categoryName)) {
    throw new Response('Not Found', {
      status: 404,
      statusText: 'Invalid Category',
    });
  }

  return {
    searchQuery,
    currentPage,
    categoryName,
  };
};
