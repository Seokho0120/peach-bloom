import { Metadata } from 'next';
import { getProductsList } from '@/app/api/firesotre';
import dynamic from 'next/dynamic';
const BrandList = dynamic(() => import('@/components/BrandList'));
const ProductsList = dynamic(() => import('@/components/ProductsList'));

type Props = {
  params: {
    categories: string;
  };
};

export default function ProductsListPage({ params: { categories } }: Props) {
  return (
    <section className='mx-6 md:mx-36 lg:mx-52'>
      <BrandList category={categories} />
      <ProductsList category={categories} />
    </section>
  );
}

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
