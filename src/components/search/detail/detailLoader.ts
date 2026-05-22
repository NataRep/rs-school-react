import type { LoaderFunction } from 'react-router-dom';
import { ApiService, type CategoryMap } from '../../../services/api-service/api-service';

export const detailLoader: LoaderFunction = ({ params }) => {
  const { categoryName, id } = params;

  if (!categoryName || !id) {
    throw new Response("Not Found", { status: 404 });
  }
  const detailsPromise = ApiService.getEntityDetails(categoryName as keyof CategoryMap, id)
    .then((data) => {
      if (!data) {
        throw new Response("Not Found", { status: 404 });
      }
      return data;
    })
    .catch((error) => {
      if (error instanceof Response) {
        throw error;
      }

      if (error instanceof Error && error.message.includes('404')) {
        throw new Response("Entity Not Found", { status: 404 });
      }

      throw new Response("Failed to load details", { status: 500 });
    });

  return detailsPromise;
};