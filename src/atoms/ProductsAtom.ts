import { atom } from 'recoil';
import { ProductListType } from '../types/Product';

// 초기값
export const initialProductsListAtom = atom<ProductListType[]>({
  key: 'initialProductsListAtom',
  default: [],
});

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
});

export const discountedPriceAtom = atom<number>({
  key: 'discountedPriceAtom',
  default: 0,
});
