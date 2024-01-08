import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const MenubarAtom = atom({
  key: 'MenubarAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
