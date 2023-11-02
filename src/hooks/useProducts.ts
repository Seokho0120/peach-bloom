import { useQuery } from '@tanstack/react-query';
import {
  fetchProductDetail,
  fetchProducts,
  getProductsList,
} from '../api/firesotre';
import { ProductListType, ProductDetailType } from '../types/Product';

export function useGetProductList() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ['productsList'],
    queryFn: getProductsList,
  });

  return { data: products, isLoading, isError };
}

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
