import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYxeMw3OaNLuFBbbUUlvlyW1riL1BjhTE",
  authDomain: "fir-c329a.firebaseapp.com",
  databaseURL: "https://fir-c329a.firebaseio.com",
  projectId: "fir-c329a",
  storageBucket: "fir-c329a.appspot.com",
  messagingSenderId: "734117625205",
  appId: "1:734117625205:web:b5d7894ce0bf047eac673c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);
