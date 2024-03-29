import app from './firebasedb';
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
  DocumentSnapshot,
  limit,
  QueryConstraint,
  startAfter,
  orderBy,
} from 'firebase/firestore';
import {
  ProductListType,
  ProductDetailType,
  addProductType,
  cartItemType,
} from '@/types/ProductType';
import {
  InitialLikeStatusType,
  addToCartType,
  cartUpdateType,
  monitoringLikesDataType,
  removeCartType,
  updateLikerListProps,
} from '@/types/FirestoreType';

export const db = getFirestore(app);

// 모든 데이터 필터 x
const getAllProductsList = () => {
  return getDocs(collection(db, 'products')).then((snapshot) =>
    snapshot.empty
      ? []
      : snapshot.docs.map((doc) => doc.data() as ProductListType),
  );
};

// 모든 데이터 필터 o
const getProductsList = async (
  category?: string,
  pageParam?: DocumentData | unknown,
): Promise<{
  products: ProductListType[];
  lastDoc: DocumentSnapshot | undefined;
}> => {
  const baseQuery = collection(db, 'products');
  const categoryConstraint =
    category !== 'all' && category ? where('category', '==', category) : null;
  const pageConstraint = pageParam ? startAfter(pageParam) : null;

  const queries: QueryConstraint[] = [
    categoryConstraint,
    orderBy('saleRank'),
    limit(8),
    pageConstraint,
  ].filter(Boolean) as QueryConstraint[]; // 배열의 null값들 제거

  const productQuery = query(baseQuery, ...queries);
  const snapshot = await getDocs(productQuery);
  const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // 마지막 문서

  return {
    products: snapshot.docs.map((doc) => doc.data() as ProductListType),
    lastDoc,
  };
};

const getProductDetail = async (
  productId: number,
): Promise<ProductDetailType> => {
  const productQuery = query(
    collection(db, 'productDetail'),
    where('productId', '==', productId),
  );

  const querySnapshot = await getDocs(productQuery);
  const productDocs = querySnapshot.docs.map((doc) => doc.data());
  const productData = productDocs[0] as ProductDetailType;

  if (productDocs.length === 0) {
    throw new Error(`FireStoe에 ${productId}를 가진 데이터가 없습니다.🚨`);
  }

  return productData;
};

const addNewProduct = async ({ product, imageUrl }: addProductType) => {
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

const getProductById = async (productId: string) => {
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().productId;
  } else {
    console.log('products 찾을 수 없음 🚨');
    return null;
  }
};

const addNewDeatil = async (productDetail: ProductDetailType) => {
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

// 초기값 설정
const getLikeCountDocId = async (productId: number) => {
  const productQuery = query(
    collection(db, 'products'),
    where('productId', '==', productId),
  );

  const querySnapshot = await getDocs(productQuery);
  const productDocs = querySnapshot.docs[0];
  const productData = productDocs.data();

  const likeCountData = await productData.likedCount; // likedCount 초기값
  const docId = productDocs.id; // 문서 ID

  return { likeCountData, docId };
};

const updateLikedCount = async (
  docId: string | undefined,
  likedCount: number,
) => {
  const productRef = doc(db, 'products', `${docId}`);

  await updateDoc(productRef, {
    likedCount,
  });
};

// productId에 해당하는 문서를 가리키는 포인터
const likesRef = (productId: number) => doc(db, 'likes', productId.toString());

// likes 컬렉션에 productId 문서있는지 체크 및 생성
const checkAndCreateLikeDoc = async (
  likesDocRef: DocumentReference<unknown, DocumentData> | undefined,
) => {
  if (!likesDocRef) return;
  const likesData = await getDoc(likesDocRef);

  if (!likesData.exists()) {
    await setDoc(likesDocRef, { likerList: [] });
  }
};

// 좋아요 했으면, likerList에서 userId 삭제 및 추가
const updateLikerList = async ({
  likesDocRef,
  userId,
  isLiked,
}: updateLikerListProps) => {
  if (!likesDocRef) return;
  if (isLiked) {
    await updateDoc(likesDocRef, {
      likerList: arrayRemove(userId),
    });
  } else {
    await updateDoc(likesDocRef, {
      likerList: arrayUnion(userId),
    });
  }
};

const getInitialLikeStatus = async (props: InitialLikeStatusType) => {
  const {
    likesDocRef,
    setLikerList,
    setIsLiked,
    setLike,
    initialLikeCount,
    userId,
  } = props;
  if (!likesDocRef) return;

  const likesData = await getDoc(likesDocRef);

  if (likesData.exists()) {
    const likerList = likesData.data()?.likerList || [];

    setLikerList(likerList);
    setIsLiked(likerList.includes(userId));
    setLike(initialLikeCount);
  }
};

const monitoringLikesData = (props: monitoringLikesDataType) => {
  const { likesDocRef, userId, setLikerList, setIsLiked } = props;
  if (!likesDocRef || !userId) return;

  const unsubscribe = onSnapshot(likesDocRef, (doc) => {
    const likesData = doc.data();
    const likerList = likesData?.likerList || [];
    setLikerList(likerList);
    setIsLiked(likerList.includes(userId));
  });

  return unsubscribe;
};

// MY LIKE 데이터 가져오기
const getLikedProducts = async (userId: number) => {
  const likesCollection = collection(db, 'likes');
  const productsCollection = collection(db, 'products');

  const likesSnapshot = await getDocs(likesCollection);
  const likedDocIds = likesSnapshot.docs
    .filter((doc) => doc.data().likerList.includes(userId))
    .map((doc) => doc.id);
  const likedDocIdsAsNumbers = likedDocIds.map(Number);

  const productsSnapshot = await getDocs(productsCollection);
  const likedProducts = productsSnapshot.docs
    .filter((doc) => likedDocIdsAsNumbers.includes(doc.data().productId))
    .map((doc) => doc.data());

  return likedProducts;
};

const subscribeToLikes = (userId: number, callback: () => void) => {
  const likesCollection = collection(db, 'likes');

  return onSnapshot(
    likesCollection,
    () => {
      callback();
    },
    (error) => {
      console.error(error);
    },
  );
};

const addToCart = async (cartItem: addToCartType[]) => {
  await Promise.all(
    cartItem.map(async (item) => {
      const {
        userId,
        quantity,
        product: { productId, productTitle, price, imageUrl, brandTitle },
      } = item;

      const userCartRef = await doc(db, 'carts', userId.toString());
      const docSnap = await getDoc(userCartRef);

      const newCartItem = {
        quantity,
        productId,
        productTitle,
        price,
        imageUrl,
        brandTitle,
      };

      if (docSnap.exists()) {
        const existingCartItemList = docSnap.data().items;
        const existingCartItemIndex = existingCartItemList.findIndex(
          (i: any) => i.productId === productId,
        );

        if (existingCartItemIndex !== -1) {
          existingCartItemList[existingCartItemIndex] = newCartItem;
        } else {
          existingCartItemList.push(newCartItem);
        }

        await updateDoc(userCartRef, { items: existingCartItemList });
      } else {
        await setDoc(userCartRef, { items: [newCartItem] });
      }
    }),
  );
};

const getCartItems = async (userId: number): Promise<cartItemType[]> => {
  const userCartRef = doc(db, 'carts', userId.toString());
  const docSnap = await getDoc(userCartRef);

  if (docSnap.exists()) {
    const items = docSnap.data().items || {};
    return Object.values(items);
  } else {
    return [];
  }
};

const fetchCartItems = (userId: number): Promise<cartItemType[]> => {
  const userCartRef = doc(db, 'carts', userId.toString());

  return new Promise((resolve, reject) => {
    getDoc(userCartRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const items = docSnap.data().items || {};
          resolve(Object.values(items));
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 카트 아이템 실시간 업데이트
const subscribeToCartItems = (userId: number, callback: () => void) => {
  const userCartRef = doc(db, 'carts', userId.toString());

  return onSnapshot(
    userCartRef,
    () => {
      callback();
    },
    (error) => {
      console.error(error);
    },
  );
};

// 카트 아이템 수량 업데이트
const updateCartItem = async ({ userId, product }: cartUpdateType) => {
  const userCartRef = await doc(db, 'carts', userId.toString());
  const userCartSanp = await getDoc(userCartRef);
  if (!userCartSanp.exists()) {
    throw new Error('카트에 제품이 존재하지 않아요 🚨');
  }

  const items = userCartSanp.data().items;

  const updatedItems = await items.map((item: cartItemType) => {
    if (item.productId === product.productId) {
      return { ...item, quantity: product.quantity, price: product.price };
    } else {
      return item;
    }
  });

  await updateDoc(userCartRef, {
    items: updatedItems,
  });
};

const removeFromCart = async ({ userId, productId }: removeCartType) => {
  const userCartRef = doc(db, 'carts', userId.toString());
  const userCartSnap = await getDoc(userCartRef);
  if (!userCartSnap.exists()) {
    throw new Error('카트에 제품이 존재하지 않아요 🚨');
  }

  const items = userCartSnap.data().items;
  const updatedItems = items.filter(
    (item: cartItemType) => item.productId !== productId,
  );

  await updateDoc(userCartRef, {
    items: updatedItems,
  });
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

export {
  getAllProductsList,
  getProductsList,
  getProductDetail,
  addNewProduct,
  getProductById,
  addNewDeatil,
  getLikeCountDocId,
  updateLikedCount,
  likesRef,
  checkAndCreateLikeDoc,
  updateLikerList,
  getInitialLikeStatus,
  monitoringLikesData,
  getLikedProducts,
  subscribeToLikes,
  addToCart,
  getCartItems,
  fetchCartItems,
  subscribeToCartItems,
  updateCartItem,
  removeFromCart,
};
