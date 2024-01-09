import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  initialProductsListAtom,
  productsListAtom,
} from '@/atoms/ProductsAtom';
import { FilterAtom } from '@/atoms/FilterAtom';

const useFilterByBrand = () => {
  const [productsList, setFilteredProductsList] =
    useRecoilState(productsListAtom);
  const initialProductsList = useRecoilValue(initialProductsListAtom);
  const setSelectedFilter = useSetRecoilState(FilterAtom);

  const filterByBrand = (brand: string) => {
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

  return { filterByBrand };
};

export default useFilterByBrand;
