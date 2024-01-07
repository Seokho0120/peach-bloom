import { atom } from 'recoil';
import { ProductListType } from '../types/ProductType';
import { recoilPersist } from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'test',
  storage: sessionStorage,
});

// 초기값
export const initialProductsListAtom = atom<ProductListType[]>({
  key: 'initialProductsListAtom',
  default: [],
});

export const productsListAtom = atom<ProductListType[]>({
  key: 'productsListAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const discountedPriceAtom = atom<number>({
  key: 'discountedPriceAtom',
  default: 0,
});
