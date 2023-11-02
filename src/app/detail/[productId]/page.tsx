import ProductDetail from '@/components/ProductDetail';

type Props = {
  params: {
    productId: number;
  };
};

export default function Detail({ params: { productId } }: Props) {
  return (
    <>
      <ProductDetail productId={productId} />
    </>
  );
}
