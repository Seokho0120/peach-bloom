import { atom } from 'recoil';
import { ProductListType } from '../types/Product';

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
});
