import ProductDetail from '@/components/ProductDetail';

type Props = {
  params: {
    productId: number;
  };
};

export default function ProductDetailPage({ params: { productId } }: Props) {
  return (
    <section className='mx-52 flex justify-center'>
      <ProductDetail productId={productId} />
    </section>
  );
}
