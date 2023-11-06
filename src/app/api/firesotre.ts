import {
  doc,
  getDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import app from './firebasedb';
import { ProductListType, ProductDetailType } from '../../types/Product';
import axios from 'axios';
import { useEffect } from 'react';

const db = getFirestore(app);

export async function getProductsList(): Promise<ProductListType[]> {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.empty
    ? []
    : snapshot.docs.map((doc) => doc.data() as ProductListType);
}

// 수정
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

// export async function getProductDetail(): Promise<ProductDetailType[]> {
//   const snapshot = await getDocs(collection(db, 'productDetail'));

//   return snapshot.empty
//     ? []
//     : snapshot.docs.map((doc) => doc.data() as ProductDetailType);
// }

// 더미 데이터 리스트
export async function fetchProducts() {
  const response = await axios
    .get('/data/productsDummy.json')
    .catch((e) => console.error('Network 오류!!!!!!', e));
  if (!response) return;
  const productData = response.data;

  return productData;
}
// 더미 데이터 디테일
export async function fetchProductDetail() {
  const response = await axios
    .get('/data/productsDetailDummy.json')
    .catch((e) => console.error('Network 오류!!!!!!', e));
  if (!response) return;
  const productDetailData = response.data;

  return productDetailData;
}

export default db;
