import getQueryClient from '../getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import PostsPage from './page';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await response.json()) as Post[];
  return posts;
}

export default async function hydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsPage />
    </HydrationBoundary>
  );
}
