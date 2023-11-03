import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from './firebasedb';
import { ProductListType, ProductDetailType } from '../types/Product';
import axios from 'axios';

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
  const response = await axios
    .get('/data/productsDummy.json')
    .catch((e) => console.error('Network 오류!!!!!!', e));
  if (!response) return;
  const productData = response.data;

  return productData;
}

export async function fetchProductDetail() {
  const response = await axios
    .get('/data/productsDetailDummy.json')
    .catch((e) => console.error('Network 오류!!!!!!', e));
  if (!response) return;
  const productDetailData = response.data;

  return productDetailData;
}

// export async function fetchProductDetail() {
//   const response = await fetch('/data/productsDetailDummy.json');
//   if (!response.ok) {
//     throw new Error('Network 오류!!!!!!');
//   }

//   return response.json();
// }

export default db;
