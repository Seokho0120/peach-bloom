import {
  QuerySnapshot,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import app from './firebasedb';
import { ProductListType, ProductDetailType } from '../types/Product';

const db = getFirestore(app);

export async function getProductsList(): Promise<ProductListType[]> {
  const skincareCollection = collection(db, 'products');
  return getDocs(skincareCollection).then((snapshot) => {
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => doc.data() as ProductListType);
    }
    return [];
  });
}

export async function fetchProducts() {
  const response = await fetch('/data/productsDummy.json');
  if (!response.ok) {
    throw new Error('Network 오류!!!!!!');
  }

  return response.json();
}

export async function fetchProductDetail() {
  const response = await fetch('/data/productsDetailDummy.json');
  if (!response.ok) {
    throw new Error('Network 오류!!!!!!');
  }

  return response.json();
}

export default db;
