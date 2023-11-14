'use client';

import { useGetProductList } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (searchText.length > 0) {
      router.push(`/search/${encodeURIComponent(searchText)}`);
    } else if (searchText.length === 0) {
      router.push('/');
    }
  }, [router, searchText]);

  return (
    <form>
      <input
        type='text'
        name='search'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='rounded-3xl w-64 text-xs p-2 box-border'
        placeholder='검색어 입력 후 엔터를 눌러주세요.'
      />
    </form>
  );
}
