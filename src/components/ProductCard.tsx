import Image from 'next/image';
import Link from 'next/link';
import { ProductListType } from '../types/Product';

type Props = {
  product: ProductListType;
};

export default function ProductCard({ product }: Props) {
  const {
    imageUrl,
    productId,
    brandTitle,
    productTitle,
    price,
    isSale,
    saleRate,
    likedCount,
  } = product;

  return (
    <Link href={`/detail/${productId}`}>
      <Image src={imageUrl} alt='productImage' width={500} height={300} />
      <div className='my-4'>
        <p className='text-slate-800'>{brandTitle}</p>
        <p className='text-xl font-bold'>{productTitle}</p>
      </div>
      <div className='flex gap-4'>
        {isSale ? (
          <>
            <p>{price}</p>
            <p className='text-red-500'>{saleRate}%</p>
          </>
        ) : (
          <>
            <p>{price}</p>
          </>
        )}
      </div>
    </Link>
  );
}
