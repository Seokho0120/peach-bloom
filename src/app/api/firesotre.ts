// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  DocumentReference,
  setDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from 'firebase/firestore';
import app from './firebasedb';
import {
  ProductListType,
  ProductDetailType,
  addProductType,
} from '@/types/Product';
import {
  InitialLikeStatusType,
  monitoringLikesDataType,
  updateLikerListProps,
} from '@/types/FirestoreType';

export const db = getFirestore(app);

export async function getProductsList(): Promise<ProductListType[]> {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.empty
    ? []
    : snapshot.docs.map((doc) => doc.data() as ProductListType);
}

export async function getProductDetail(
  productId: number
): Promise<ProductDetailType> {
  const productQuery = query(
    collection(db, 'productDetail'),
    where('productId', '==', productId)
  );

  const querySnapshot = await getDocs(productQuery);
  const productDocs = querySnapshot.docs.map((doc) => doc.data());
  const productData = productDocs[0] as ProductDetailType;

  if (productDocs.length === 0) {
    throw new Error(`FireStoe에 ${productId}를 가진 데이터가 없습니다.🚨`);
  }

  return productData;
}

export const addNewProduct = async ({ product, imageUrl }: addProductType) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      imageUrl,
    });
    console.log('docRef.id', docRef.id); // 문서 ID
    return docRef.id;
  } catch (error) {
    console.error('Firestore에 상품 업로드 중 에러 발생 🚨', error);
    throw error;
  }
};

export const getProductById = async (productId: string) => {
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().productId;
  } else {
    console.log('products 찾을 수 없음 🚨');
    return null;
  }
};

export const addNewDeatil = async (productDetail: ProductDetailType) => {
  try {
    const docRef = await addDoc(collection(db, 'productDetail'), {
      ...productDetail,
    });
    return docRef.id;
  } catch (error) {
    console.error('Firestore에 상품 디테일 업로드 중 에러 발생 🚨', error);
    throw error;
  }
};

export async function getLikeCountDocId(productId: number) {
  const productQuery = query(
    collection(db, 'products'),
    where('productId', '==', productId)
  );

  const querySnapshot = await getDocs(productQuery);
  const productDocs = querySnapshot.docs[0];
  const productData = productDocs.data();

  const likeCountData = productData.likedCount; // likedCount 초기값
  const docId = productDocs.id; // 문서 ID
  return { likeCountData, docId };
}

export const updateLikedCount = async (
  docId: string | undefined,
  likedCount: number
) => {
  const productRef = doc(db, 'products', `${docId}`);

  await updateDoc(productRef, {
    likedCount,
  });
};

// productId에 해당하는 문서를 가리키는 포인터
export const likesRef = (productId: number) =>
  doc(db, 'likes', productId.toString());

// likes 컬렉션에 productId 문서있는지 체크 및 생성
export const checkAndCreateLikeDoc = async (
  likesDocRef: DocumentReference<unknown, DocumentData> | undefined
) => {
  if (!likesDocRef) return;
  const likesData = await getDoc(likesDocRef);

  if (!likesData.exists()) {
    await setDoc(likesDocRef, { likerList: [] });
  }
};

// 좋아요 했으면, likerList에서 name삭제 및 추가
export const updateLikerList = async ({
  likesDocRef,
  username,
  isLiked,
}: updateLikerListProps) => {
  if (!likesDocRef) return;
  if (isLiked) {
    await updateDoc(likesDocRef, {
      likerList: arrayRemove(username),
    });
  } else {
    await updateDoc(likesDocRef, {
      likerList: arrayUnion(username),
    });
  }
};

export const getInitialLikeStatus = async (props: InitialLikeStatusType) => {
  const {
    likesDocRef,
    setLikerList,
    setIsLiked,
    setLike,
    initialLikeCount,
    userName,
  } = props;
  if (!likesDocRef) return;

  const likesData = await getDoc(likesDocRef);

  if (likesData.exists()) {
    const likerList = likesData.data()?.likerList || [];

    setLikerList(likerList);
    setIsLiked(likerList.includes(userName));
    setLike(initialLikeCount);
  }
};

export const monitoringLikesData = (props: monitoringLikesDataType) => {
  const { likesDocRef, userName, setLikerList, setIsLiked } = props;
  if (!likesDocRef || !userName) return;

  const unsubscribe = onSnapshot(likesDocRef, (doc) => {
    const likesData = doc.data();
    const likerList = likesData?.likerList || [];

    setLikerList(likerList);
    setIsLiked(likerList.includes(userName));
  });

  return unsubscribe;
};

// // Dummy data List로직
// export async function fetchProducts() {
//   const response = await axios
//     .get('/data/productsDummy.json')
//     .catch((e) => console.error('Network 오류!!!!!!', e));
//   if (!response) return;
//   const productData = response.data;

//   return productData;
// }
// // Dummy data Detail로직
// export async function fetchProductDetail() {
//   const response = await axios
//     .get('/data/productsDetailDummy.json')
//     .catch((e) => console.error('Network 오류!!!!!!', e));
//   if (!response) return;
//   const productDetailData = response.data;

//   return productDetailData;
// }
