'use client';

import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import Image from 'next/image';
import HeartIcon from './ui/HeartIcon';
import { useGetLikeCountDocId, useGetProductDetail } from '@/hooks/useProducts';
import { arrProductDetailType } from '@/types/Product';
import { db, updateLikedCount } from '../app/api/firesotre';
import { useEffect, useState } from 'react';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useUserSession } from '@/hooks/useUserSession';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const NumProductId = Number(productId);
  const { productDetail, isError, isLoading } =
    useGetProductDetail(NumProductId);
  const { likeCountDocId } = useGetLikeCountDocId(NumProductId);
  const user = useUserSession();
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

  useEffect(() => {
    setLike(likeCountDocId?.likeCountData);
  }, [likeCountDocId?.likeCountData]);

  const likeRef = doc(db, 'likes', productId.toString());

  const handleLike = async () => {
    if (!user?.name) {
      console.error('Username is undefined.');
      return;
    }

    const likeData = await getDoc(likeRef);

    if (!likeData.exists()) {
      await setDoc(likeRef, {
        likerList: [],
      });
    }

    if (isLiked) {
      setLike(like - 1);
      setIsLiked(false);
      await updateLikedCount(likeCountDocId?.docId, like - 1);
      await updateDoc(likeRef, {
        likerList: arrayRemove(user?.name),
      });
    } else {
      setLike(like + 1);
      setIsLiked(true);
      await updateLikedCount(likeCountDocId?.docId, like + 1);
      await updateDoc(likeRef, {
        likerList: arrayUnion(user?.name),
      });
    }
  };

  const [likerList, setLikerList] = useState<string[]>([]);
  const [isCurrentUserLike, setIsCurrentUserLike] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(likeRef, (doc) => {
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

  console.log('like', like);

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
