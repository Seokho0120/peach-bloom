import { cartItemType } from '@/types/ProductType';
import { atom, selector } from 'recoil';

type CartItem = {
  userId: number;
  quantity: number;
  product: {
    productId: number;
    productTitle: string;
    brandTitle: string;
    price: number | undefined;
    imageUrl: string;
  };
};

export const CartItemAtom = atom<CartItem[]>({
  key: 'CartItemAtom',
  default: [],
});

export const CartItemUpdateAtom = atom<cartItemType[]>({
  key: 'CartItemUpdateAtom',
  default: [],
});

export const TotalPriceSelector = selector({
  key: 'TotalPriceSelector',
  get: ({ get }) => {
    const CartItem = get(CartItemUpdateAtom);
    return CartItem.reduce((prev, current) => {
      const singlePrice = Math.floor(current.price / current.quantity);
      return prev + singlePrice * current.quantity;
    }, 0);
  },
});

export const TotalQuantitySelector = selector({
  key: 'TotalQuantitySelector',
  get: ({ get }) => {
    const CartItem = get(CartItemUpdateAtom);
    return CartItem.length;
  },
});
