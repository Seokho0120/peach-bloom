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
import { DetailBtn } from './DetailBtn';
import QuantityControl from './QuantityControl';
import { useRecoilState } from 'recoil';
import { CartItemAtom } from '@/atoms/CartItemAtom';
import Modal from './Modal';

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

  const [quantity, setQuantity] = useState<number>(1);
  const [cartItem, setCartItem] = useRecoilState(CartItemAtom);

  const discountedPrice = useDisCountedPrice({
    price: productDetail?.price,
    saleRate: productDetail?.saleRate,
    isSale: productDetail?.isSale,
    priceCount: quantity,
  });
  const arrProductDetail: arrProductDetailType[] = productDetail
    ? [{ ...productDetail }]
    : [];

  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likerList, setLikerList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  type CartItem = {
    userId: number;
    quantity: number;
    product: {
      productId: number;
      productTitle: string;
      price: number | undefined;
      imageUrl: string;
    };
  };
  const [cartContent, setCartContent] = useState<CartItem>();

  useEffect(() => {
    if (productDetail?.productId !== 0 && productDetail && userId) {
      const newCartContent = {
        userId,
        quantity,
        product: {
          productId: productDetail.productId,
          productTitle: productDetail.productTitle,
          price: discountedPrice,
          imageUrl: productDetail.imageUrl,
        },
      };
      setCartContent(newCartContent);
    }
  }, [quantity, discountedPrice, productDetail?.productId]);

  const isAlreadyInCart =
    cartItem.findIndex((item) => item.product.productId === NumProductId) !==
    -1;

  const handleAddToCart = () => {
    if (cartContent) {
      if (isAlreadyInCart) {
        addToCart(cartItem);
      } else {
        const newCartItem = [...cartItem, cartContent];
        console.log('newCartItem', newCartItem);
        setCartItem(newCartItem);
        addToCart(newCartItem);
      }
    }
    setIsModalOpen(!isModalOpen);
  };

  // const handleAddToCart = () => {
  //   setIsModalOpen(!isModalOpen);

  //   if (!isAlreadyInCart && cartContent) {
  //     setCartItem((prev) => [...prev, cartContent]);
  //   }

  //   addToCart(cartItem);
  // };

  console.log('cartItem >>>>>', cartItem);

  const handleBuy = () => {
    router.push('/carts');
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

                <QuantityControl
                  setQuantity={setQuantity}
                  quantity={quantity}
                  discountedPrice={discountedPrice}
                />

                <div className='flex gap-4'>
                  <DetailBtn text='장바구니 담기' onClick={handleAddToCart} />
                  <DetailBtn text='바로 구매하기' onClick={handleBuy} />
                  <Modal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onClick={handleAddToCart}
                    text='장바구니에 상품이 담겼습니다.'
                    modalText='장바구니 바로가기'
                  />
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
}
