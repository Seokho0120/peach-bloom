import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/firesotre';
import { ProductListType } from '../types/Product';

export function useProductsList(category: string) {
  const { data, isError, isLoading } = useQuery<ProductListType[]>({
    queryKey: ['productsList'],
    queryFn: fetchProducts,
  });

  const filteredProducts = data?.filter(
    (product) => product.category === category
  );

  return { products: filteredProducts, isError, isLoading };
}
