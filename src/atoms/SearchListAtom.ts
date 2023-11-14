import { atom } from 'recoil';
import { ProductListType } from '../types/Product';

export const searchItemAtom = atom<ProductListType[]>({
  key: 'searchItemAtom',
  default: [],
});
