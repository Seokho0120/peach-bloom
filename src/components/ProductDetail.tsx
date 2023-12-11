'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState, useTransition } from 'react';
import { useRecoilState } from 'recoil';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import { useGetLikeCountDocId, useGetProductDetail } from '@/hooks/useProducts';
import { CartItemAtom } from '@/atoms/CartItemAtom';
import { arrProductDetailType } from '@/types/Product';
import { addToCartType } from '@/types/FirestoreType';
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
import GridSpinner from './ui/GridSpinner';
import { useSession } from 'next-auth/react';
const ProductInfo = dynamic(() => import('./ProductInfo'));
const QuantityControl = dynamic(() => import('./QuantityControl'));
const DetailBtn = dynamic(() =>
  import('./DetailBtn').then((mod) => mod.DetailBtn),
);
const Modal = dynamic(() => import('./Modal'));

type Props = {
  productId: number;
};

export const revalidate = 60 * 60 * 6;

export default function ProductDetail({ productId }: Props) {
  const router = useRouter();
  const NumProductId = Number(productId);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const { data: session } = useSession();
  const user = session?.user;
  const userId = session?.user.id;

  const { productDetail, isError, isLoading } =
    useGetProductDetail(NumProductId);

  const arrProductDetail: arrProductDetailType[] = productDetail
    ? [{ ...productDetail }]
    : [];

  const { likeCountDocId } = useGetLikeCountDocId(NumProductId);
  const initialLikeCount = likeCountDocId?.likeCountData;
  const docId = likeCountDocId?.docId;

  const [cartItem, setCartItem] = useRecoilState(CartItemAtom);
  const [quantity, setQuantity] = useState<number>(1);
  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likerList, setLikerList] = useState<string[]>([]);
  const [newProductDetail, setNewProductDetail] = useState<addToCartType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likesDocRef, setLikesDocRef] = useState<
    DocumentReference | undefined
  >();

  const discountedPrice = useDisCountedPrice({
    price: productDetail?.price,
    saleRate: productDetail?.saleRate,
    isSale: productDetail?.isSale,
    priceCount: quantity,
  });

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
    setIsFetching(true);
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
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
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

  useEffect(() => {
    if (productDetail?.productId !== 0 && productDetail && userId) {
      const newCartContent = {
        userId,
        quantity,
        product: {
          productId: productDetail.productId,
          productTitle: productDetail.productTitle,
          brandTitle: productDetail.brandTitle,
          price: discountedPrice,
          imageUrl: productDetail.imageUrl,
        },
      };

      setNewProductDetail(newCartContent);
    }
  }, [quantity, discountedPrice, productDetail?.productId]);

  const isAlreadyInCart =
    cartItem.findIndex((item) => item.product.productId === NumProductId) !==
    -1;

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth/signIn');
      return;
    }

    if (newProductDetail) {
      if (isAlreadyInCart) {
        addToCart(cartItem);
      } else {
        const newCartItem = [...cartItem, newProductDetail];
        setCartItem(newCartItem);
        addToCart(newCartItem);
      }
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleBuy = async () => {
    if (!user) {
      router.push('/auth/signIn');
      return;
    }

    if (newProductDetail) {
      if (isAlreadyInCart) {
        await addToCart(cartItem);
      } else {
        const newCartItem = [...cartItem, newProductDetail];
        setCartItem(newCartItem);
        await addToCart(newCartItem);
      }
      router.push('/carts');
    }
  };

  const goToCart = () => router.push('/carts');

  useEffect(() => {
    return () => {
      setCartItem([]);
    };
  }, []);

  return (
    <article className="flex flex-col w-full">
      {isLoading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-slate-500/20">
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          Error loading data.
        </p>
      )}
      {arrProductDetail &&
        arrProductDetail.map(
          ({
            imageUrl,
            productId,
            brandTitle,
            productTitle,
            description,
            ingredients,
            howToUse,
          }) => (
            <div
              key={productId}
              className="flex flex-col md:flex-row justify-between gap-4 lg:gap-16"
            >
              <div className="flex-shrink-0 relative w-[452px] h-[452px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]">
                <Image
                  src={imageUrl}
                  alt={productTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute"
                  priority
                />
              </div>
              <div className="flex-grow flex flex-col gap-2 lg:gap-5">
                {isUpdating && (
                  <div className="absolute z-20 inset-0 flex justify-center items-center">
                    <GridSpinner />
                  </div>
                )}

                <ProductInfo
                  disabled={isUpdating}
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

                <div className="flex gap-4 mt-3 lg:mt-0">
                  <DetailBtn text="장바구니 담기" onClick={handleAddToCart} />
                  <DetailBtn text="바로 구매하기" onClick={handleBuy} />
                  <Modal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onClick={handleAddToCart}
                    goToCart={goToCart}
                    text="장바구니에 상품이 담겼습니다."
                    modalText="장바구니 바로가기"
                  />
                </div>
              </div>
            </div>
          ),
        )}
    </article>
  );
}
