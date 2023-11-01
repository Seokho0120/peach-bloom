'use client';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  name: string;
  price: number;
}

interface Props2 {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Navbar() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Props2[]>(['posts']);
  // const data = queryClient.getQueryData<Props[]>(['skincare']);

  return (
    <div>
      {/* <h1>Posts</h1> */}
      <ul>
        {data?.map((posts) => (
          <li key={posts.id}>
            {posts.title}
            <div>{posts.body}</div>
          </li>
        ))}

        {/* {data?.map((posts, idx) => (
          <li key={idx}>
            {posts.name}
            <div>{posts.price}</div>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
