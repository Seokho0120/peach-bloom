import dynamic from 'next/dynamic';
const NewProductDetail = dynamic(() => import('@/components/NewProductDetail'));

type Props = {
  params: {
    productId: string;
  };
};

export default function UploadDeatilPage({ params: { productId } }: Props) {
  return (
    <>
      <NewProductDetail productId={productId} />
    </>
  );
}
