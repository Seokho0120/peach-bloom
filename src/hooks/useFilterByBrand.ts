import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  initialProductsListAtom,
  productsListAtom,
} from '@/atoms/ProductsAtom';
import { FilterAtom } from '@/atoms/FilterAtom';
import { useRouter } from 'next/navigation';

export default function useFilterByBrand() {
  const productsList = useRecoilValue(productsListAtom);
  const setFilteredProductsList = useSetRecoilState(productsListAtom);
  const initialProductsList = useRecoilValue(initialProductsListAtom);
  const setSelectedFilter = useSetRecoilState(FilterAtom);
  const router = useRouter();

  return (brand: string) => {
    if (productsList)
      if (brand === '전체') {
        setSelectedFilter('랭킹순');
        setFilteredProductsList(initialProductsList);
      } else {
        const filtered = productsList.filter(
          (product) => product.brandTitle === brand,
        );
        setFilteredProductsList(filtered);
      }
  };
}
