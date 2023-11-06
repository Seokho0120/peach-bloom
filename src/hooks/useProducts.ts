import { useQuery } from '@tanstack/react-query';
import {
  getProductsList,
  getProductDetail,
  fetchProductDetail,
  fetchProducts,
} from '../app/api/firesotre';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { productsListAtom, productDetailAtom } from '@/atoms/productsListAtom';
import { ProductListType, ProductDetailType } from '../types/Product';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';

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

// 수정
// export function useGetProductDetail(productId: number) {
//   const setProductDetail = useSetRecoilState(productDetailAtom);

//   const {
//     data: productDetail,
//     isLoading,
//     isError,
//   } = useQuery<ProductDetailType[]>({
//     queryKey: ['productDetail', productId],
//     queryFn: () => getProductDetail(productId),
//   });

//   useEffect(() => {
//     if (productDetail) {
//       setProductDetail(productDetail);
//     }
//   }, [productDetail, setProductDetail]);

//   return { isError, isLoading };
// }
// 수정
// export function useGetSelectedProduct(productId: number) {
//   const productsList = useRecoilValue(productsListAtom);
//   const productDetails = useRecoilValue(productDetailAtom);

//   console.log('productDetails', productDetails);

//   const selectedProduct = productsList.filter(
//     (product) => product.productId === productId
//   );

//   const detailedProducts = selectedProduct.map((product) => {
//     const detail = productDetails.find(
//       (detail) => detail.productId === productId
//     );

//     return detail ? { ...product, ...detail } : product;
//   });

//   return { selectedProduct: detailedProducts };
// }

// 기존꺼
// export function useGetProductDetail(productId: number) {
//   const setProductDetail = useSetRecoilState(productDetailAtom);

//   const {
//     data: productDetail,
//     isLoading,
//     isError,
//   } = useQuery<ProductDetailType[]>({
//     queryKey: ['productDetail', productId],
//     queryFn: getProductDetail,
//   });

//   useEffect(() => {
//     if (productDetail) {
//       const filteredProductDetail = productDetail?.filter(
//         (detail) => detail.productId === productId
//       );
//       setProductDetail(filteredProductDetail);
//     }
//   }, [productDetail, productId, setProductDetail]);

//   return { isError, isLoading };
// }

// export function useGetSelectedProduct(productId: number) {
//   const productsList = useRecoilValue(productsListAtom);
//   const productDetails = useRecoilValue(productDetailAtom);

//   console.log('productDetails', productDetails);

//   const selectedProduct = productsList.filter(
//     (product) => product.productId === productId
//   );

//   const detailedProducts = selectedProduct.map((product) => {
//     const detail = productDetails.find(
//       (detail) => detail.productId === productId
//     );

//     return detail ? { ...product, ...detail } : product;
//   });

//   return { selectedProduct: detailedProducts };
// }

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
