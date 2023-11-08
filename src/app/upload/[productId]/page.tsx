import NewProductDetail from '@/components/NewProductDetail';

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
