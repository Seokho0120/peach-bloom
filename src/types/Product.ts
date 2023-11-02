export interface ProductListType {
  productId: number;
  category: string;
  brandTitle: string;
  productTitle: string;
  imageUrl: string;
  price: number;
  slaeRank: number;
  likedCount: number;
  reviewCount: number;
  isSale: boolean;
  saleRate: number;
}

export interface ProductDetailType extends ProductListType {
  description: string;
  ingredients: string;
  howToUse: string;
}
