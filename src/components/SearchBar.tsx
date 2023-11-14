'use client';

import { useGetProductList } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   searchText.length > 0 &&
  //     router.push(`/search/${encodeURIComponent(searchText)}`);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setSearchText(value);
  // };

  useEffect(() => {
    if (searchText) {
      router.push(`/search/${encodeURIComponent(searchText)}`);
    }
  }, [router, searchText]);

  return (
    <form>
      <input
        type='text'
        name='search'
        value={searchText}
        className='rounded-2xl p-1 w-64'
        // onChange={handleChange}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='검색어 입력 후 엔터를 눌러주세요.'
      />
    </form>
  );
}
