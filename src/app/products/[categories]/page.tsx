import { Metadata } from 'next';
import { getProductsList } from '@/app/api/firesotre';
import BrandList from '@/components/BrandList';
import ProductsList from '@/components/ProductsList';

export async function generateMetadata({
  params: { categories },
}: Props): Promise<Metadata> {
  const { products } = await getProductsList(categories);

  return products
    ? {
        title: `${categories} 의 제품 리스트`,
        description: `${categories} 에 해당하는 제품들을 확인할 수 있습니다.`,
        openGraph: {
          title: `${categories} 의 제품 리스트`,
          description: `${categories}에 해당하는 제품들을 확인할 수 있습니다.`,
          images: [products[0].imageUrl],
          type: 'website',
          url: `https://peach-bloom.vercel.app/detail/${categories}`,
          emails: 'seokho0120@gmail.com',
        },
      }
    : {};
}

type Props = {
  params: {
    categories: string;
  };
};

export default function ProductsListPage({ params: { categories } }: Props) {
  return (
    <section className='mx-52'>
      <BrandList category={categories} />
      <ProductsList category={categories} />
    </section>
  );
}
