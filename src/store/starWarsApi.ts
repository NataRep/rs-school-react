import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Person, Planet, Starship } from "../services/api-service/api-models";

export type CategoryMap = {
  people: Person;
  planets: Planet;
  starships: Starship;
};

const getCacheTTL = (): number => {
  try {
    const metaEnv = (new Function('return import.meta.env'))();
    return Number(metaEnv?.VITE_CACHE_TTL) || 120;
  } catch {
    return 120;
  }
};

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.py4e.com/api',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },

  }),

  keepUnusedDataFor: getCacheTTL(),

  tagTypes: ['SwapiData'],

  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ category, searchQuery, page = 1 }) => {
        const searchParams = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '';
        return {
          url: `${category}/?page=${page}${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, arg) => [
        { type: 'SwapiData', id: arg.category }
      ],
    }),

    getEntityDetails: builder.query({
      query: ({ category, id }) => ({
        url: `${category}/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, arg) => [
        { type: 'SwapiData', id: `${arg.category}_${arg.id}` }
      ],
    }),
  }),
});

export const { useGetDataQuery, useGetEntityDetailsQuery } = starWarsApi;
