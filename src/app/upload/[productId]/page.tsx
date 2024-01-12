import dynamic from 'next/dynamic';
const NewProductDetail = dynamic(() => import('@/components/NewProductDetail'));

type Props = {
  params: {
    productId: string;
  };
};

const UploadDeatilPage = ({ params: { productId } }: Props) => {
  return (
    <>
      <NewProductDetail productId={productId} />
    </>
  );
};

export default UploadDeatilPage;
