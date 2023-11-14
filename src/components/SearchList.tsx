'use client';

import { searchItemAtom } from '@/atoms/SearchListAtom';
import { useGetProductList, useGetSearchList } from '@/hooks/useProducts';
import { useRecoilValue } from 'recoil';

type Props = {
  keyword: string;
};

export default function SearchList({ keyword }: Props) {
  const decodeKeyword = decodeURIComponent(keyword);
  const { isLoading, isError } = useGetSearchList(decodeKeyword);
  const test = useRecoilValue(searchItemAtom);

  console.log('test', test);

  return <>{decodeURIComponent(keyword)}SearchList</>;
}
