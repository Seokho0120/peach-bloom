'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeartIcon from './ui/HeartIcon';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import { useGetLikeCountDocId, useGetProductDetail } from '@/hooks/useProducts';
import { arrProductDetailType } from '@/types/Product';
import { useUserSession } from '@/hooks/useUserSession';
import {
  checkAndCreateLikeDoc,
  likeRef,
  updateLikedCount,
  updateLikerList,
} from '../app/api/firesotre';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const router = useRouter();
  const NumProductId = Number(productId);
  const user = useUserSession();
  const { productDetail, isError, isLoading } =
    useGetProductDetail(NumProductId);
  const { likeCountDocId } = useGetLikeCountDocId(NumProductId);
  const likeDocRef = likeRef(NumProductId);

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
  const [isCurrentUserLike, setIsCurrentUserLike] = useState(false);

  // like 초기값 설정
  useEffect(() => {
    setLike(likeCountDocId?.likeCountData);
  }, [likeCountDocId?.likeCountData]);

  const handleLike = async () => {
    if (!user?.name) {
      console.error('Username이 없어요 🚨');
      router.push('/auth/signIn');
      return;
    }

    await checkAndCreateLikeDoc(likeDocRef);
    if (isLiked) {
      setLike(like - 1);
      setIsLiked(false);
      await updateLikedCount(likeCountDocId?.docId, like - 1);
    } else {
      setLike(like + 1);
      setIsLiked(true);
      await updateLikedCount(likeCountDocId?.docId, like + 1);
    }
    await updateLikerList({
      likeRef: likeDocRef,
      username: user.name,
      isLiked,
    });
  };

  useEffect(() => {
    const getInitialLikeStatus = async () => {
      const likeData = await getDoc(likeDocRef);

      if (likeData.exists()) {
        const likerList = likeData.data()?.likerList || [];
        setLikerList(likerList);
        setIsLiked(likerList.includes(user?.name));
        setLike(likeCountDocId?.likeCountData || 0);
      }
    };

    getInitialLikeStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(likeDocRef, (doc) => {
      const likeData = doc.data();
      setLikerList(likeData?.likerList || []);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (likerList.includes(`${user?.name}`)) {
      setIsCurrentUserLike(true);
    } else {
      setIsCurrentUserLike(false);
    }
  }, [likerList, user?.name]);

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
                    {/* <HeartIcon type='detail' isLiked={isLiked} /> */}
                    <HeartIcon type='detail' isLiked={isCurrentUserLike} />
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
