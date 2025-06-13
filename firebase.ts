// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: 'AIzaSyBoqacMT6Xf8DRf1J2Wixj-imABXbdS7B8',
  authDomain: 'mywellcare-c20aa.firebaseapp.com',
  projectId: 'mywellcare-c20aa',
  storageBucket: 'mywellcare-c20aa.firebasestorage.app',
  messagingSenderId: '428523676350',
  appId: '1:428523676350:web:5120a48b705d3c8d5fb4ef',
  // ✅ measurementId는 웹용 → 생략 가능
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 export
export const db = getFirestore(app);
