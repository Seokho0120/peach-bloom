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
  discountedPrice?: number;
}

export interface ProductDetailType {
  description: string;
  howToUse: string;
  ingredients: string;
  productId: number;
  docId?: string;
}

export interface SelectedProductDetailType extends ProductListType {
  description: string;
  ingredients: string;
  howToUse: string;
}

export interface arrProductDetailType {
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
  howToUse?: string;
  ingredients?: string;
}

export interface addProductType {
  product: ProductListType;
  imageUrl: string;
}

export interface cartItemType {
  imageUrl: string;
  price: number;
  productId: number;
  productTitle: string;
  quantity: number;
  brandTitle: string;
}
