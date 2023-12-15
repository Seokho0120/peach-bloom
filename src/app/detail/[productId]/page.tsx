import { Metadata } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/api/firesotre';
import ProductDetail from '@/components/ProductDetail';
import { ProductDetailType, ProductListType } from '@/types/ProductType';

export const revalidate = 60 * 60 * 6;

type Props = {
  params: {
    productId: number;
  };
};

export default function ProductDetailPage({ params: { productId } }: Props) {
  return (
    <section className="mx-6 md:mx-36 lg:mx-52 flex justify-center">
      <ProductDetail productId={productId} />
    </section>
  );
}

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'productDetail'));
  const productDetails = snapshot.docs.map(
    (doc) => doc.data() as ProductDetailType,
  );

  return productDetails.map((product) => ({
    params: { productId: product.productId },
  }));
}

export async function generateMetadata({
  params: { productId },
}: Props): Promise<Metadata> {
  const NumProductId = Number(productId);

  const productQuery = query(
    collection(db, 'productDetail'),
    where('productId', '==', productId),
  );

  const querySnapshot = await getDocs(productQuery);
  const productDocs = querySnapshot.docs.map((doc) => doc.data());
  const productDetail = productDocs[0] as ProductDetailType;

  const snapshot = await getDocs(collection(db, 'products'));
  const productList = !snapshot.empty
    ? snapshot.docs.map((doc) => doc.data() as ProductListType)
    : [];

  const selectedProduct = productList?.find(
    (product) => product.productId === NumProductId,
  );

  const newProductDetail = selectedProduct
    ? {
        ...selectedProduct,
        ...productDetail,
      }
    : null;

  return newProductDetail
    ? {
        title: newProductDetail.productTitle,
        description: newProductDetail.description,
        openGraph: {
          title: newProductDetail.productTitle,
          description: newProductDetail.description,
          images: newProductDetail.imageUrl,
          type: 'website',
          url: `https://peach-bloom.vercel.app/detail/${productId}`,
          emails: 'seokho0120@gmail.com',
        },
      }
    : {};
}
