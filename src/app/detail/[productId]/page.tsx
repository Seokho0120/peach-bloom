import ProductDetail from '@/components/ProductDetail';

type Props = {
  params: {
    productId: number;
  };
};

export default function ProductDetailPage({ params: { productId } }: Props) {
  return (
    <>
      <ProductDetail productId={productId} />
    </>
  );
}
