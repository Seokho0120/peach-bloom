export interface ProductListType {
  brandTitle: string;
  category: string;
  imageUrl: string;
  isSale?: boolean;
  likedCount: number;
  price: number;
  productId: number;
  productTitle: string;
  reviewCount: number;
  saleRank?: number;
  saleRate?: number;
  isNew?: boolean;
  description?: string;
  ingredients?: string;
  howToUse?: string;
}

export interface ProductDetailType extends ProductListType {
  description: string;
  ingredients: string;
  howToUse: string;
}
