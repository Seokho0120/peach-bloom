import { cartItemType } from '@/types/Product';
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
    return CartItem.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );
  },
});

export const TotalQuantitySelector = selector({
  key: 'TotalQuantitySelector',
  get: ({ get }) => {
    const CartItem = get(CartItemUpdateAtom);
    return CartItem.length;
  },
});

// export const TotalPriceSelector = selector({
//   key: 'TotalPriceSelector',
//   get: ({ get }) => {
//     const CartItem = get(CartItemUpdateAtom);
//     CartItem.reduce(
//       (prev, current) => prev + current.product.price! * current.quantity,
//       0
//     );
//   },
// });
