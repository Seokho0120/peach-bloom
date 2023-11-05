import Image from 'next/image';
import Link from 'next/link';
import { ProductListType } from '../types/Product';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';

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

  const discountedPrice = useDisCountedPrice({ price, saleRate });
  const formatPrice = useFormatPrice;

  return (
    <Link href={`/detail/${productId}`}>
      <Image src={imageUrl} alt='productImage' width={500} height={300} />
      <div className='my-4'>
        <p className='text-slate-800'>{brandTitle}</p>
        <p className='text-xl font-bold'>{productTitle}</p>
      </div>
      <div className='flex gap-4'>
        {isSale ? (
          <div className='flex items-center gap-2'>
            <p>{formatPrice(discountedPrice)}원</p>
            <div className='flex gap-1 text-slate-400'>
              <p>{`<`} </p>
              <p className='line-through'>{formatPrice(price)}</p>
            </div>
            <p className='text-red-500'>{saleRate}%</p>
          </div>
        ) : (
          <>
            <p>{formatPrice(price)}원</p>
          </>
        )}
      </div>
    </Link>
  );
}
