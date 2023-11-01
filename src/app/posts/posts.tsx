'use client';

import { useQueryClient } from '@tanstack/react-query';

interface Props {
  name: string;
  price: number;
}

export default function Posts() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Props[]>(['skincare']);
  console.log('data', data);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((posts, idx) => (
          <li key={idx}>
            {posts.name}
            <div>{posts.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
