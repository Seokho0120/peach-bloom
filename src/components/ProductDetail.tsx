'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeartIcon from './ui/HeartIcon';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import { useGetLikeCountDocId, useGetProductDetail } from '@/hooks/useProducts';
import { useUserSession } from '@/hooks/useUserSession';
import { arrProductDetailType } from '@/types/Product';
import {
  addToCart,
  checkAndCreateLikeDoc,
  getInitialLikeStatus,
  likesRef,
  monitoringLikesData,
  updateLikedCount,
  updateLikerList,
} from '@/app/api/firesotre';
import { DocumentReference } from 'firebase/firestore';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const router = useRouter();
  const NumProductId = Number(productId);

  const user = useUserSession();
  const userId = user?.id;

  const { productDetail, isError, isLoading } =
    useGetProductDetail(NumProductId);

  const { likeCountDocId } = useGetLikeCountDocId(NumProductId);
  const initialLikeCount = likeCountDocId?.likeCountData;
  const docId = likeCountDocId?.docId;

  const formatPrice = useFormatPrice;
  const discountedPrice = useDisCountedPrice({
    price: productDetail?.price,
    saleRate: productDetail?.saleRate,
    isSale: productDetail?.isSale,
  });
  const arrProductDetail: arrProductDetailType[] = productDetail
    ? [{ ...productDetail }]
    : [];

  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likerList, setLikerList] = useState<string[]>([]);
  const [likesDocRef, setLikesDocRef] = useState<
    DocumentReference | undefined
  >();

  const [priceCount, setPriceCount] = useState<number>(0);

  useEffect(() => {
    setLikesDocRef(likesRef(NumProductId));
  }, [NumProductId]);

  // 컴포넌트 마운트될때 초기 값 설정
  useEffect(() => {
    if (!initialLikeCount || !userId) return;

    getInitialLikeStatus({
      likesDocRef,
      setLikerList,
      setIsLiked,
      setLike,
      initialLikeCount,
      userId,
    });
  }, [initialLikeCount, likesDocRef, userId]);

  const handleLike = async () => {
    if (!userId) {
      console.error('로그인 먼저 해주세요 🚨');
      router.push('/auth/signIn');
      return;
    }

    await checkAndCreateLikeDoc(likesDocRef);

    const newCount = isLiked && like > 0 ? like - 1 : like + 1;
    const newIsLiked = !isLiked;

    setLike(newCount);
    setIsLiked(newIsLiked);
    await updateLikedCount(docId, newCount);
    await updateLikerList({
      likesDocRef,
      userId: userId,
      isLiked,
    });
  };

  // 실시간 업데이트 감지 및 중지
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = monitoringLikesData({
      likesDocRef,
      setLikerList,
      setIsLiked,
      userId,
    });

    return unsubscribe;
  }, [likesDocRef, userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='flex flex-col'>
      {arrProductDetail &&
        arrProductDetail.map(
          ({
            imageUrl,
            productId,
            brandTitle,
            productTitle,
            price,
            isSale,
            saleRate,
            likedCount,
            isNew,
            description,
            ingredients,
            howToUse,
          }) => (
            <div key={productId} className='flex justify-between gap-16'>
              <div className='flex-shrink-0 relative w-[500px] h-[500px]'>
                <Image
                  src={imageUrl}
                  alt={productTitle}
                  layout='fill'
                  objectFit='cover'
                  className='absolute'
                  priority
                />
              </div>

              <div className='flex-grow flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                  <p className='text-navypoint text-2xl'>{brandTitle}</p>
                  <button
                    onClick={handleLike}
                    className='text-slate-200 flex items-center gap-1 cursor-pointer'
                  >
                    <HeartIcon type='detail' isLiked={isLiked} />
                  </button>
                </div>
                <p className='text-4xl font-semibold'>{productTitle}</p>

                <div className='flex flex-col gap-4 border-y py-6'>
                  <p className=''>{description}</p>
                  <div className='flex flex-col gap-2'>
                    <p>사용방법</p>
                    <span className='text-sm text-slate-600'>{howToUse}</span>
                    <p>성분</p>
                    <span className='text-sm text-slate-600'>
                      {ingredients}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-8'>
                  <div className='flex items-center border gap-4 p-1'>
                    <button onClick={() => setPriceCount((prev) => prev - 1)}>
                      -
                    </button>
                    <div>{priceCount}</div>
                    <button onClick={() => setPriceCount((prev) => prev + 1)}>
                      +
                    </button>
                  </div>
                  <p className='text-2xl font-semibold mr-6'>
                    {formatPrice(discountedPrice!)}원
                  </p>
                  {/* <div className='text-pinkpoint flex items-center gap-1 text-sm'>
                    <HeartIcon type='' /> {likedCount}
                  </div> */}
                </div>

                <button
                  // onClick={() => addToCart()}
                  onClick={() => console.log('구매하기')}
                  className='bg-navypoint hover:bg-pinkpoint text-lg font-bold p-2 cursor-pointer text-white rounded-lg'
                >
                  구매하기
                </button>
              </div>
            </div>
          )
        )}
    </div>
  );
}
