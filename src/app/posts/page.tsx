'use client';

import { useQueryClient } from '@tanstack/react-query';
import { getSkincareProducts } from '@/api/firesotre';

interface Props2 {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Props2[]>(['posts']);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((posts) => (
          <li key={posts.id}>{posts.title}</li>
        ))}
      </ul>
    </div>
  );
}
