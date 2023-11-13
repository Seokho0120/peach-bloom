'use client';

import { cartItemType } from '@/types/Product';

type Props = {
  product: cartItemType;
};

export default function CartItem({ product }: Props) {
  console.log('product', product);
  return <>CartItem</>;
}
