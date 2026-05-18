import type { LoaderFunction } from 'react-router-dom';
import { ApiService, type CategoryMap } from '../../../services/api-service/api-service';

export const detailLoader: LoaderFunction = async ({ params }) => {
  const { categoryName, id } = params;

  if (!categoryName || !id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const data = await ApiService.getEntityDetails(categoryName as keyof CategoryMap, id);

    return data;
  } catch (error) {
    console.error("Ошибка при загрузке деталей:", error);
    throw new Response("Failed to load details", { status: 500 });
  }
};