import type { AppStore } from '@/store';
import type { LoaderFunctionArgs } from 'react-router';
import { starWarsApi, type CategoryMap } from '../../../store/starWarsApi';

const VALID_CATEGORIES: (keyof CategoryMap)[] = [
  'people',
  'planets',
  'starships',
];

export const createSearchResultLoader = (store: AppStore) => {
  return async ({ params, request }: LoaderFunctionArgs) => {
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

    const queryArgs = {
      category: categoryName,
      searchQuery: searchQuery,
      page: currentPage,
    };

    const queryRef = store.dispatch(
      starWarsApi.endpoints.getData.initiate(queryArgs),
    );

    try {
      await queryRef.unwrap();

      return {
        searchQuery,
        currentPage,
        categoryName,
      };
    } catch {
      return {
        searchQuery,
        currentPage,
        categoryName,
      };
    } finally {
      queryRef.unsubscribe();
    }
  };
};
