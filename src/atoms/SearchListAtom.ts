import { atom } from 'recoil';
import { ProductListType } from '../types/ProductType';

export const searchItemAtom = atom<ProductListType[]>({
  key: 'searchItemAtom',
  default: [],
});
