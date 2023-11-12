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
import ProductInfo from './ProductInfo';

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

  const [priceCount, setPriceCount] = useState<number>(1);

  const formatPrice = useFormatPrice;
  const discountedPrice = useDisCountedPrice({
    price: productDetail?.price,
    saleRate: productDetail?.saleRate,
    isSale: productDetail?.isSale,
    priceCount: priceCount,
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

  const handleAddToCart = () => {
    console.log('카트에 담기');

    // addToCart()

    // export type addToCartType = {
    //   userId: string;
    //   quantity: number;
    //   product: {
    //     productId: number;
    //     productTitle: string;
    //     price: number;
    //     imageUrl: string;
    //   };
    // };
  };

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
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='absolute'
                  // priority
                />
              </div>

              <div className='flex-grow flex flex-col gap-5'>
                <ProductInfo
                  brandTitle={brandTitle}
                  handleLike={handleLike}
                  isLiked={isLiked}
                  productTitle={productTitle}
                  description={description}
                  howToUse={howToUse}
                  ingredients={ingredients}
                />

                <div className='flex items-center justify-between'>
                  <div className='flex items-center justify-between border border-gray-200 rounded-md gap-4  py-2'>
                    <button
                      onClick={() =>
                        setPriceCount((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      className='border-r flex items-center justify-center px-4 hover:text-pinkpoint'
                    >
                      -
                    </button>
                    <div>{priceCount}</div>
                    <button
                      onClick={() => setPriceCount((prev) => prev + 1)}
                      className='border-l flex items-center justify-center px-4 hover:text-pinkpoint'
                    >
                      +
                    </button>
                  </div>
                  <p className='text-4xl font-semibold'>
                    {formatPrice(discountedPrice!)}원
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  // onClick={() => console.log('구매하기')}
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
