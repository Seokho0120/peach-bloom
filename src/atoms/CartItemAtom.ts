import { atom } from 'recoil';

type CartItem = {
  userId: number;
  quantity: number;
  product: {
    productId: number;
    productTitle: string;
    price: number | undefined;
    imageUrl: string;
  };
};

export const CartItemAtom = atom<CartItem[]>({
  key: 'CartItemAtom',
  default: [],
});
