import BrandList from '@/components/BrandList';
import ProductsList from '@/components/ProductsList';

type Props = {
  params: {
    categories: string;
  };
};

export default function ProductsListPage({ params: { categories } }: Props) {
  return (
    <div className='mx-36'>
      <BrandList category={categories} />
      <ProductsList category={categories} />
    </div>
  );
}
