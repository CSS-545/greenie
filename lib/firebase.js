import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkEa_XFUqUiTyKjYJA-YKTg_SZVqh6kKk",
  authDomain: "greenie-231a3.firebaseapp.com",
  projectId: "greenie-231a3",
  storageBucket: "greenie-231a3.appspot.com",
  messagingSenderId: "9016804688",
  appId: "1:9016804688:web:243822471980b60b539855",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };