import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const FilterAtom = atom({
  key: 'FilterAtom',
  default: '랭킹순',
  effects_UNSTABLE: [persistAtom],
});
