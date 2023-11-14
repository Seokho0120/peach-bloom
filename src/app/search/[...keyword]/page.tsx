import SearchList from '@/components/SearchList';
import { useGetProductList } from '@/hooks/useProducts';

type Props = {
  params: {
    keyword: string;
  };
};

export default function SearchPage({ params: { keyword } }: Props) {
  return (
    <div className='mx-52 flex justify-center'>
      <SearchList keyword={keyword} />
    </div>
  );
}
