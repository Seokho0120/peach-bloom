import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDLwwhSzGE_U5Ee7exVp5ak9PdYFD-HTeg',
  authDomain: 'peachbloom-27ec8.firebaseapp.com',
  projectId: 'peachbloom-27ec8',
  storageBucket: 'peachbloom-27ec8.appspot.com',
  messagingSenderId: '399974555241',
  appId: '1:399974555241:web:d94e5808f90f071f2cccf8',
  measurementId: 'G-SFRSWH0MW7',
};

const firebasedb = initializeApp(firebaseConfig);

export default firebasedb;
