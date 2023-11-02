import {
  QuerySnapshot,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import app from './firebasedb';

const db = getFirestore(app);

export async function getSkincareProducts() {
  const skincareCollection = collection(db, 'skincare');
  return getDocs(skincareCollection) //
    .then((snapshot: QuerySnapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => doc.data());
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
