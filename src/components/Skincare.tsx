import getQueryClient from '../app/getQueryClient';

import {
  dehydrate,
  QueryClient,
  useQuery,
  HydrationBoundary,
} from '@tanstack/react-query';

import { getSkincareProducts } from '@/api/firesotre';

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

export default async function Skincare() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    // queryKey: ['skincare'],
    // queryFn: getSkincareProducts,
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>ㅠㅠ</HydrationBoundary>;
}
