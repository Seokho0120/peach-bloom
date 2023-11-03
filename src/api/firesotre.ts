import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from './firebasedb';
import { ProductListType, ProductDetailType } from '../types/Product';
import axios from 'axios';

const db = getFirestore(app);

export async function getProductsList(): Promise<ProductListType[]> {
  const snapshot = await getDocs(collection(db, 'products'));

  return snapshot.empty
    ? []
    : snapshot.docs.map((doc) => doc.data() as ProductListType);
}

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
