import { ProductListType } from '../types/Product';

export function useSortProducts() {
  const sortProducts = (products: ProductListType[], filter: string) => {
    const sortedProducts = [...products].sort((a, b) => {
      switch (filter) {
        case '랭킹순':
          return (a.saleRank || 0) - (b.saleRank || 0);
        case '좋아요순':
          return (b.likedCount || 0) - (a.likedCount || 0);
        case '가격높은순':
          return (b.discountedPrice || 0) - (a.discountedPrice || 0);
        case '가격낮은순':
          return (a.discountedPrice || 0) - (b.discountedPrice || 0);
        case '높은할인순':
          return (b.saleRate || 0) - (a.saleRate || 0);
        default:
          return 0;
      }
    });

    return sortedProducts;
  };

  return sortProducts;
}
