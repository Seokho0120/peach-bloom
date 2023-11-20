import SearchList from '@/components/SearchList';

type Props = {
  params: {
    keyword: string;
  };
};

export default function SearchPage({ params: { keyword } }: Props) {
  return (
    <section className='mx-52 flex justify-center'>
      <SearchList keyword={keyword} />
    </section>
  );
}
