import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Person, Planet, Starship } from './api-models';

export type CategoryMap = {
  people: Person;
  planets: Planet;
  starships: Starship;
};

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL);

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.py4e.com/api',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),

  keepUnusedDataFor: CACHE_TTL,

  tagTypes: ['SwapiData'],

  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ category, searchQuery, page = 1 }) => {
        const searchParams = searchQuery
          ? `&search=${encodeURIComponent(searchQuery)}`
          : '';
        return {
          url: `${category}/?page=${page}${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, arg) => [{ type: 'SwapiData', id: arg.category }],
    }),

    getEntityDetails: builder.query({
      query: ({ category, id }) => ({
        url: `${category}/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, arg) => [
        { type: 'SwapiData', id: `${arg.category}_${arg.id}` },
      ],
    }),
  }),
});

export const { useGetDataQuery, useGetEntityDetailsQuery } = starWarsApi;
