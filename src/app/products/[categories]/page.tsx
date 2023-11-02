import ProductsList from '@/components/ProductsList';

type Props = {
  params: {
    categories: string;
  };
};

export default function Products({ params: { categories } }: Props) {
  return (
    <>
      <ProductsList category={categories} />
    </>
  );
}
