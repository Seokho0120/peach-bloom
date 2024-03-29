import { atom } from 'recoil';
import { ProductListType } from '../types/ProductType';

// 초기값
export const initialProductsListAtom = atom<ProductListType[]>({
  key: 'initialProductsListAtom',
  default: [],
});

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
});

export const prevProductsListAtom = atom<ProductListType[]>({
  key: 'prevProductsList',
  default: [],
});

export const discountedPriceAtom = atom<number>({
  key: 'discountedPriceAtom',
  default: 0,
});

export const categoryAtom = atom<string>({
  key: 'categoryAtom',
  default: '',
});
