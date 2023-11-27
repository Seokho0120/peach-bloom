'use client';

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const debouncedKeyword = useDebounce(searchText);

  useEffect(() => {
    if (debouncedKeyword.length > 0) {
      router.push(`/search/${encodeURIComponent(debouncedKeyword)}`);
    } else if (debouncedKeyword.length === 0) {
      router.push('/');
    }
  }, [router, debouncedKeyword]);

  return (
    <form>
      <input
        type='text'
        name='search'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='rounded-3xl w-48 sm:w-64 text-xs p-2 box-border'
        placeholder={`검색어 입력 후 엔터를 눌러주세요.`}
      />
    </form>
  );
}
