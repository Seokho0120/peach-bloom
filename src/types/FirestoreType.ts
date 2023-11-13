import { DocumentData, DocumentReference } from 'firebase/firestore';

export type updateLikerListProps = {
  likesDocRef: DocumentReference<unknown, DocumentData> | undefined;
  userId: number;
  isLiked: boolean;
};

export type InitialLikeStatusType = {
  likesDocRef: DocumentReference | undefined;
  setLikerList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setLike: React.Dispatch<React.SetStateAction<number>>;
  initialLikeCount: number;
  userId: number;
};

export type monitoringLikesDataType = {
  likesDocRef: DocumentReference | undefined;
  userId: number;
  setLikerList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

export type addToCartType = {
  userId: number;
  quantity: number;
  product: {
    productId: number;
    productTitle: string;
    brandTitle: string;
    price: number | undefined;
    // price: number;
    imageUrl: string;
  };
};

export type cartUpdateType = {
  userId: number;
  product: {
    imageUrl: string;
    price: number;
    productId: number;
    productTitle: string;
    quantity: number;
    brandTitle: string;
  };
};
