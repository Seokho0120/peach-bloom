import { atom } from 'recoil';
import { ProductListType, ProductDetailType } from '../types/Product';

// 초기값
export const initialProductsListAtom = atom<ProductListType[]>({
  key: 'initialProductsListAtom',
  default: [],
});

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
});

export const productDetailAtom = atom<ProductDetailType>({
  key: 'productDetailAtom',
  default: {
    description: '',
    howToUse: '',
    ingredients: '',
    productId: 0,
  },
});

export const discountedPriceAtom = atom<number>({
  key: 'discountedPriceAtom',
  default: 0,
});
