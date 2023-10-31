'use client';

import firestore from '../api/firestore';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState<any>('');
  const [age, setAge] = useState<any>(0);
  const [list, setList] = useState<any>([]);

  const [value, setValue] = useState('');

  const snap = onSnapshot(collection(firestore, 'auth'), (querySnapshot) => {
    let tempList: any = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data = { ...data, id: doc.id };
      tempList.push(data);
    });
    setList(tempList);
  });

  const editdoc = async (event: any) => {
    await updateDoc(doc(firestore, 'auth', event.target.id), {
      // 수정하고 업데이트하기
      name: 'NULL',
      age: 0,
    });
  };

  const removeDoc = async (event: any) => {
    console.log(event.target.id);
    await deleteDoc(doc(firestore, 'auth', event.target.id));
  };

  const onClickUpLoadButton = async () => {
    await addDoc(collection(firestore, `auth`), {
      name,
      age,
    });
  };

  useEffect(() => {
    async function getDocument() {
      const c = await getDoc(doc(firestore, 'auth', '9vcrTxxu4u78GMBKoJKc'));
      console.log(c.data());
    }
    getDocument();
  }, []);

  useEffect(() => {
    getDocs(collection(firestore, 'auth')).then((results: any) => {
      let tempList: any = [];
      results.forEach((doc: any) => {
        const data = doc.data();
        tempList.push(data);
      });
      setList(tempList);
    });
  }, []);

  return (
    <main>
      peachBloom
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label> 이름 </label>
          <input onChange={(e) => setName(e.target.value)} />
          <label> 나이 </label>
          <input onChange={(e) => setAge(e.target.value)} />
          <button onClick={onClickUpLoadButton}>전송</button>
        </form>
        <h1>회원 리스트 </h1>
        {list &&
          list.map((value: any, idx: number) => (
            <div key={idx} className='m-3'>
              <p>
                {value.name} , {value.age} 살
              </p>
              <button id={value.id} onClick={removeDoc} className='mr-3'>
                삭제
              </button>
              <button id={value.id} onClick={editdoc}>
                수정
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}
