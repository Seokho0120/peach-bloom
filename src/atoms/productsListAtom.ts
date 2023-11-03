import { atom } from 'recoil';
import { ProductListType, ProductDetailType } from '../types/Product';

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
});

export const productDetailAtom = atom<ProductDetailType[]>({
  key: 'productDetailAtom',
  default: [],
});
