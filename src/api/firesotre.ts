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

export default db;
