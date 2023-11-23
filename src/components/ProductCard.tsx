import Image from 'next/image';
import Link from 'next/link';
import { ProductListType } from '../types/Product';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import HeartIcon from './ui/HeartIcon';

type Props = {
  product: ProductListType;
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: Props) {
  const {
    imageUrl,
    productId,
    brandTitle,
    productTitle,
    price,
    isSale,
    saleRate,
    likedCount,
    isNew,
  } = product;
  const discountedPrice = useDisCountedPrice({ price, saleRate, isSale });
  const formatPrice = useFormatPrice;

  return (
    <Link href={`/detail/${productId}`} className='relative'>
      <div className='relative w-full pb-[100%]'>
        <Image
          src={imageUrl}
          alt='productImage'
          priority={priority}
          fill
          className='object-cover'
          sizes='(min-width: 1440px) 275px, (min-width: 1024px) 20vw, (min-width: 580px) 50vw, 100vw'
        />
      </div>
      <div className='flex'>
        {isSale && (
          <div className='bg-pinkpoint text-white w-8 h-8 flex items-center justify-center font-bold absolute top-0'>
            S
          </div>
        )}
        {isNew && (
          <div className='bg-navypoint text-white w-8 h-8 flex items-center justify-center font-bold absolute top-0 left-8'>
            N
          </div>
        )}
      </div>
      <div className='my-4'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-slate-800'>{brandTitle}</p>
          <div className='text-pinkpoint flex items-center gap-1 text-sm'>
            <HeartIcon type='' /> {likedCount}
          </div>
        </div>
        <p className='text-sm font-bold leading-5'>{productTitle}</p>
      </div>
      <div className='flex gap-4'>
        {isSale ? (
          <div className='flex items-center gap-2'>
            <p>{formatPrice(discountedPrice!)}원</p>
            <div className='flex gap-1 text-slate-400'>
              <p>{`<`} </p>
              <p className='line-through'>{formatPrice(price)}</p>
            </div>
            <p className='text-pinkpoint'>{saleRate}%</p>
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
