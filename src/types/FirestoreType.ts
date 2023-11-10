import { DocumentData, DocumentReference } from 'firebase/firestore';

export type updateLikerListProps = {
  likesDocRef: DocumentReference<unknown, DocumentData> | undefined;
  username: string;
  isLiked: boolean;
};

export type InitialLikeStatusType = {
  likesDocRef: DocumentReference | undefined;
  setLikerList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setLike: React.Dispatch<React.SetStateAction<number>>;
  initialLikeCount: number;
  userName: string;
};

export type monitoringLikesDataType = {
  likesDocRef: DocumentReference | undefined;
  userName: string;
  setLikerList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
};
