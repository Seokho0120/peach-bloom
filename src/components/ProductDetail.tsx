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

  console.log('NumProductId', NumProductId);
  console.log('like', like);
  console.log('isLiked', isLiked);
  console.log('likerList', likerList);

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
              <div className='w-96 flex-shrink-0'>
                <Image
                  src={imageUrl}
                  alt={productTitle}
                  priority
                  width={700}
                  height={700}
                />
              </div>
              <div className='flex-grow flex flex-col gap-4'>
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
                <p>{formatPrice(discountedPrice!)}원</p>
                <p>{description}</p>
                <p>{ingredients}</p>
                <p>{howToUse}</p>
              </div>
            </div>
          )
        )}
    </div>
  );
}
