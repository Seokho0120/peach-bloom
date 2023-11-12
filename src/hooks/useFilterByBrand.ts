import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  initialProductsListAtom,
  productsListAtom,
  // filteredProductsListAtom,
} from '@/atoms/ProductsListAtom';

export default function useFilterByBrand() {
  const productsList = useRecoilValue(productsListAtom);
  const setFilteredProductsList = useSetRecoilState(productsListAtom);
  const initialProductsList = useRecoilValue(initialProductsListAtom);

  return (brand: string) => {
    if (productsList)
      if (brand === '전체') {
        setFilteredProductsList(initialProductsList);
      } else {
        const filtered = productsList.filter(
          (product) => product.brandTitle === brand
        );
        setFilteredProductsList(filtered);
      }
  };
}
