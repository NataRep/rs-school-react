import type { Params } from 'react-router-dom';

interface LoaderArgs {
  params: Params<string>;
  request: Request;
}

export const detailLoader = ({ params }: LoaderArgs) => {
  const { categoryName, id } = params;

  if (!categoryName || !id) {
    throw new Response('Not Found', { status: 404 });
  }
  return {
    categoryName,
    id,
  };
};
