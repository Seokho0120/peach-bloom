import { atom } from 'recoil';
import { ProductListType } from '../types/Product';

// type mainListAtomType = {};

export const mainRankingAtom = atom<ProductListType[]>({
  key: 'mainRankingAtom',
  default: [],
});

export const mainSaleRateAtom = atom<ProductListType[]>({
  key: 'mainSaleRateAtom',
  default: [],
});

export const mainIsNewAtom = atom<ProductListType[]>({
  key: 'mainIsNewAtom',
  default: [],
});
