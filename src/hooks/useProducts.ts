import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getProductsList,
  getProductDetail,
  getLikeCountDocId,
  subscribeToCartItems,
  getAllProductsList,
  fetchCartItems,
  getLikedProducts,
  subscribeToLikes,
} from '../app/api/firesotre';
import { useEffect, useMemo, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  productsListAtom,
  initialProductsListAtom,
} from '@/atoms/ProductsAtom';
import {
  ProductListType,
  ProductDetailType,
  SelectedProductDetailType,
  ProductsResponse,
} from '../types/ProductType';
import { CartItemUpdateAtom } from '@/atoms/CartItemAtom';
import { searchItemAtom } from '@/atoms/SearchListAtom';
import {
  mainIsNewAtom,
  mainRankingAtom,
  mainSaleRateAtom,
} from '@/atoms/MainListAtom';

export function useGetProductList(category: string) {
  const setProductList = useSetRecoilState(productsListAtom);
  const setInitialProductList = useSetRecoilState(initialProductsListAtom);

  const {
    data: productsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ['products', category],
    queryFn: (context) => getProductsList(category, context.pageParam),
    getNextPageParam: (lastPage) => lastPage?.lastDoc || null,
    staleTime: 1000 * 60 * 5, // 5분
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!category,
  });

  useEffect(() => {
    if (productsList && category) {
      const allProductList = productsList.pages.flatMap((p) => p.products);

      // 리스트에 할인된 가격 추가 -> 할인된 가격으로 필터링
      const updatedProductsList = allProductList.map((product) => {
        const { price, saleRate, isSale } = product;
        const discountedPrice = isSale
          ? price - (price * (saleRate || 0)) / 100
          : price;

        return { ...product, discountedPrice };
      });

      // 카테고리에 해당하는 상품 정렬
      const filteredProductList = updatedProductsList.filter((product) => {
        if (category === 'all') {
          return updatedProductsList;
        }
        return product.category === category;
      });

      setProductList(filteredProductList);
      setInitialProductList(filteredProductList);
    }
  }, [category, productsList, setInitialProductList, setProductList]);

  return {
    isLoading,
    isError,
    productsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getProductsList,
  };
}

export function useGetProductDetail(productId: number) {
  const searchProductList = useRecoilValue(searchItemAtom);
  const mainRankingList = useRecoilValue(mainRankingAtom);
  const mainSaleRateList = useRecoilValue(mainSaleRateAtom);
  const mainIsNewList = useRecoilValue(mainIsNewAtom);
  const productsList = useRecoilValue(productsListAtom);
  const [localProductDetail, setLocalProductDetail] =
    useState<SelectedProductDetailType>();

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery<ProductDetailType>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    staleTime: 300000,
    placeholderData: keepPreviousData,
  });

  const selectedProductDetail = useMemo(() => {
    const listCollection = [
      productsList,
      searchProductList,
      mainRankingList,
      mainSaleRateList,
      mainIsNewList,
    ];

    const findProductById = (list: ProductListType[]) =>
      list.find((product) => product.productId === productId);

    const filteredProductDetail = listCollection
      .map(findProductById)
      .find((product) => product && productDetail);

    return filteredProductDetail
      ? { ...filteredProductDetail, ...productDetail }
      : null;
  }, [
    mainIsNewList,
    mainRankingList,
    mainSaleRateList,
    productDetail,
    productId,
    productsList,
    searchProductList,
  ]);

  useEffect(() => {
    const savedProductDetail = localStorage.getItem(
      `productDetail_${productId}`,
    );

    if (savedProductDetail) {
      setLocalProductDetail(JSON.parse(savedProductDetail));
    } else if (selectedProductDetail) {
      localStorage.setItem(
        `productDetail_${productId}`,
        JSON.stringify(selectedProductDetail),
      );
    }

    return () => {
      localStorage.removeItem(`productDetail_${productId}`);
    };
  }, [productId, selectedProductDetail]);

  return {
    productDetail: localProductDetail
      ? localProductDetail
      : selectedProductDetail,
    isLoading,
    isError,
  };
}

export function useLikedProducts(userId: number) {
  const queryClient = useQueryClient();
  const setProductList = useSetRecoilState(productsListAtom);

  const {
    isLoading,
    isError,
    data: likedProducts,
    error,
  } = useQuery({
    queryKey: ['likedProducts', userId],
    queryFn: () => getLikedProducts(userId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const unsubscribe = subscribeToLikes(userId, () => {
      queryClient.invalidateQueries({ queryKey: ['likedProducts', userId] });
    });

    return unsubscribe;
  }, [userId, queryClient]);

  useEffect(() => {
    if (likedProducts) {
      setProductList(likedProducts as ProductListType[]);
    }
    if (error) {
      setProductList([]);
    }
  }, [likedProducts, error, setProductList]);

  return { isLoading, isError };
}

export function useGetLikeCountDocId(productId: number) {
  const { data: likeCountDocId } = useQuery({
    queryKey: ['likeCountDocId', productId],
    queryFn: () => getLikeCountDocId(productId),
  });

  return { likeCountDocId };
}

export function useGetCartItems(userId: number) {
  const queryClient = useQueryClient();
  const setCartList = useSetRecoilState(CartItemUpdateAtom);

  const {
    isLoading,
    isError,
    data: cartItems,
  } = useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => fetchCartItems(userId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    cartItems && setCartList(cartItems);
  }, [cartItems, setCartList]);

  useEffect(() => {
    const unsubscribe = subscribeToCartItems(userId, () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
    });

    return () => unsubscribe();
  }, [userId, queryClient]);

  return { isLoading, isError, data: cartItems };
}

export function useGetSearchList(keyword: string) {
  const setSearchList = useSetRecoilState(searchItemAtom);

  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ['productsList', keyword],
    queryFn: getAllProductsList,
  });

  useEffect(() => {
    if (productsList && keyword) {
      const lowerCaseKeyword = keyword.toLowerCase();

      const searchProductList = productsList.filter(
        (product) =>
          product.brandTitle.toLowerCase().includes(lowerCaseKeyword) ||
          product.productTitle.toLowerCase().includes(lowerCaseKeyword),
      );

      setSearchList(searchProductList);
    }
  }, [keyword, productsList, setSearchList]);

  return { isLoading, isError };
}

export function useGetMainList() {
  const setMainRankingList = useSetRecoilState(mainRankingAtom);
  const setMainSaleRateList = useSetRecoilState(mainSaleRateAtom);
  const setMainIsNewList = useSetRecoilState(mainIsNewAtom);

  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ['productsList'],
    queryFn: getAllProductsList,
  });

  useEffect(() => {
    if (productsList) {
      const saleRankSortedList = [...productsList]
        .sort(
          (a: ProductListType, b: ProductListType) =>
            (a.saleRank || 0) - (b.saleRank || 0),
        )
        .slice(0, 5);

      setMainRankingList(saleRankSortedList);

      const saleSaleRateSortedList = [...productsList]
        .sort(
          (a: ProductListType, b: ProductListType) =>
            (b.saleRate || 0) - (a.saleRate || 0),
        )
        .slice(0, 5);
      setMainSaleRateList(saleSaleRateSortedList);

      const saleIsNewSortedList = productsList
        .filter((product) => product.isNew)
        .slice(0, 5);
      setMainIsNewList(saleIsNewSortedList);
    }
  }, [productsList, setMainIsNewList, setMainRankingList, setMainSaleRateList]);

  return { isLoading, isError };
}
