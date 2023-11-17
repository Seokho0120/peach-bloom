import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  initialProductsListAtom,
  productsListAtom,
} from '@/atoms/ProductsListAtom';
import { FilterAtom } from '@/atoms/FilterAtom';

export default function useFilterByBrand() {
  const productsList = useRecoilValue(productsListAtom);
  const setFilteredProductsList = useSetRecoilState(productsListAtom);
  const initialProductsList = useRecoilValue(initialProductsListAtom);
  const setSelectedFilter = useSetRecoilState(FilterAtom);

  return (brand: string) => {
    if (productsList)
      if (brand === '전체') {
        setSelectedFilter('랭킹순');
        setFilteredProductsList(initialProductsList);
      } else {
        const filtered = productsList.filter(
          (product) => product.brandTitle === brand
        );
        setFilteredProductsList(filtered);
      }
  };
}
