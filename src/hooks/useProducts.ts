import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProductsList,
  getProductDetail,
  getLikeCountDocId,
  listenProductsChange,
  // fetchProductDetail,
  // fetchProducts,
} from '../app/api/firesotre';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  productsListAtom,
  productDetailAtom,
  initialProductsListAtom,
} from '@/atoms/ProductsListAtom';
import { ProductListType, ProductDetailType } from '../types/Product';

export function useGetProductList(category: string) {
  const queryClient = useQueryClient();

  const setProductList = useSetRecoilState(productsListAtom);
  const setInitialProductList = useSetRecoilState(initialProductsListAtom);

  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ['productsList', category],
    queryFn: getProductsList,
  });

  useEffect(() => {
    const unsubscribe = listenProductsChange(() => {
      queryClient.invalidateQueries({ queryKey: ['productsList', category] });
    });
    return unsubscribe;
  }, [category, queryClient]);

  useEffect(() => {
    if (productsList) {
      // 랭킹순 정렬
      const saleRankSortedList = [...productsList].sort(
        (a: ProductListType, b: ProductListType) =>
          (a.saleRank || 0) - (b.saleRank || 0)
      );

      // 리스트에 할인된 가격 추가 -> 할인된 가격으로 필터링
      const updatedProductsList = saleRankSortedList.map((product) => {
        const { price, saleRate, isSale } = product;
        const discountedPrice = isSale
          ? price - (price * (saleRate || 0)) / 100
          : price;

        return { ...product, discountedPrice };
      });

      // 카테고리에 해당하는 상품 정렬
      const filteredProductList = updatedProductsList.filter(
        (product) => product.category === category
      );

      setProductList(filteredProductList);
      setInitialProductList(filteredProductList);
    }
  }, [category, productsList, setProductList, setInitialProductList]);

  return { isLoading, isError };
}

export function useGetProductDetail(productId: number) {
  const productsList = useRecoilValue(productsListAtom);
  const setProductDetail = useSetRecoilState(productDetailAtom);

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery<ProductDetailType>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (productDetail) {
      setProductDetail(productDetail);
    }
  }, [productDetail, setProductDetail]);

  const productDetails = useRecoilValue(productDetailAtom);

  const selectedProduct = productsList.find(
    (product) => product.productId === productId
  );

  const selectedProductDetail =
    selectedProduct && productDetails
      ? { ...selectedProduct, ...productDetails }
      : null;

  return { productDetail: selectedProductDetail, isLoading, isError };
}

export function useGetLikeCountDocId(productId: number) {
  const { data: likeCountDocId } = useQuery({
    queryKey: ['likeCountDocId', productId],
    queryFn: () => getLikeCountDocId(productId),
  });

  return { likeCountDocId };
}

// // 더미데이터 리스트 불러오기
// export function useProductsList(category: string) {
//   const { data, isError, isLoading } = useQuery<ProductListType[]>({
//     queryKey: ['productsList'],
//     queryFn: fetchProducts,
//   });

//   const filteredProductsList = data?.filter(
//     (product) => product.category === category
//   );

//   return { productsList: filteredProductsList, isError, isLoading };
// }

// // 더미데이터 디테일 불러오기
// export function useProductDetail(productId: number) {
//   const { data, isError, isLoading } = useQuery<ProductDetailType[]>({
//     queryKey: ['productsDetail'],
//     queryFn: fetchProductDetail,
//   });

//   const filteredProductDetail = data?.filter(
//     (product) => product.productId === productId
//   );

//   return { productDetail: filteredProductDetail, isError, isLoading };
// }
