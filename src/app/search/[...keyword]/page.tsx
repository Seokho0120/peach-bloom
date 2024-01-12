import dynamic from 'next/dynamic';
const SearchList = dynamic(() => import('@/components/SearchList'));

type Props = {
  params: {
    keyword: string;
  };
};

const SearchPage = ({ params: { keyword } }: Props) => {
  return (
    <section className="mx-6 md:mx-36 lg:mx-52 flex justify-center">
      <SearchList keyword={keyword} />
    </section>
  );
};

export default SearchPage;
