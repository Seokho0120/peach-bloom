import { atom, selector } from 'recoil';

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

export const TotalQuantitySelector = selector({
  key: 'TotalQuantitySelector',
  get: ({ get }) => {
    const CartItem = get(CartItemAtom);
    return CartItem.length;
  },
});

export const TotalPriceSelector = selector({
  key: 'TotalPriceSelector',
  get: ({ get }) => {
    const CartItem = get(CartItemAtom);
    CartItem.reduce(
      (prev, current) => prev + current.product.price! * current.quantity,
      0
    );
  },
});
