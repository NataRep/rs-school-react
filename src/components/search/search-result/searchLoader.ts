import type { LoaderFunctionArgs } from 'react-router';
import type { CategoryMap } from '../../../store/starWarsApi';

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
