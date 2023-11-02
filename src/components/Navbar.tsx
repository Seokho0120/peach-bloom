'use client';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  name: string;
  price: number;
}

export default function Navbar() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Props[]>(['skincare']);

  return (
    <div>
      <h1>데이터 내용 리스트</h1>
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
