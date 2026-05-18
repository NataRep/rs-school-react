import type { LoaderFunction } from 'react-router-dom';
import { ApiService, type CategoryMap } from '../../../services/api-service/api-service';

export const detailLoader: LoaderFunction = async ({ params }) => {
  const { categoryName, id } = params;

  if (!categoryName || !id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const data = await ApiService.getEntityDetails(categoryName as keyof CategoryMap, id);

    if (!data) {
      throw new Response("Not Found", { status: 404 });
    }

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Response("Entity Not Found", { status: 404 });
      }
    }

    throw new Response("Failed to load details", { status: 500 });
  }
};