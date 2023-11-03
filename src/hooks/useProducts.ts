import { useQuery } from '@tanstack/react-query';
import {
  fetchProductDetail,
  fetchProducts,
  getProductsList,
} from '../api/firesotre';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { productsListAtom } from '@/atoms/productsListAtom';
import { ProductListType, ProductDetailType } from '../types/Product';

export function useGetProductList(category: string) {
  const setProductList = useSetRecoilState(productsListAtom);

  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ['productsList', category],
    queryFn: getProductsList,
  });

  useEffect(() => {
    if (productsList) {
      const filteredProductList = productsList?.filter(
        (product) => product.category === category
      );

      setProductList(filteredProductList);
    }
  }, [category, productsList, setProductList]);

  return { isLoading, isError };
}

// 더미데이터 리스트 불러오기
export function useProductsList(category: string) {
  const { data, isError, isLoading } = useQuery<ProductListType[]>({
    queryKey: ['productsList'],
    queryFn: fetchProducts,
  });

  const filteredProductsList = data?.filter(
    (product) => product.category === category
  );

  return { productsList: filteredProductsList, isError, isLoading };
}

// 더미데이터 디테일 불러오기
export function useProductDetail(productId: number) {
  const { data, isError, isLoading } = useQuery<ProductDetailType[]>({
    queryKey: ['productsDetail'],
    queryFn: fetchProductDetail,
  });

  const filteredProductDetail = data?.filter(
    (product) => product.productId === productId
  );

  return { productDetail: filteredProductDetail, isError, isLoading };
}