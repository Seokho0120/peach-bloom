import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import app from './firebasedb';
import {
  ProductListType,
  ProductDetailType,
  addProductType,
} from '../../types/Product';
import { FieldValue } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const db = getFirestore(app);

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
    console.log('No such product!');
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

  const likeCountData = productData.likedCount;
  const docId = productDocs.id;

  console.log('likeCount', likeCountData); // likedCount 초기값
  console.log('docId', docId); // 문서 ID
  return { likeCountData, docId };
}

export const incrementLikedCount = async (
  docId: string | undefined,
  count: number
) => {
  // docId를 받아와서 그에 해당하는 좋아요 개수 조정하기
  const productRef = doc(db, 'products', `${docId}`);

  await updateDoc(productRef, {
    likedCount: count,
  });
};

// export const uploadDetail = async (productId: string) => {
//   const product = await getProductById(productId);

//   if (product) {
//     // detail 내용을 업로드하는 코드를 여기에 작성하세요.
//     // 예를 들어, Firestore에 detail 내용을 업로드하는 경우 다음과 같이 작성할 수 있습니다:
//     const docRef = await addDoc(collection(db, 'details'), {
//       productId: product.productId,
//       // 다른 detail 내용
//     });
//     console.log('docRef.id >>>>', docRef.id);
//   } else {
//     console.error('Product not found!');
//   }
// };

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
