import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGl9eh-q0bBuu5CdrmvalbNvig23Gm99c",
  authDomain: "gisty-7c6ec.firebaseapp.com",
  projectId: "gisty-7c6ec",
  storageBucket: "gisty-7c6ec.appspot.com",
  messagingSenderId: "122486214875",
  appId: "1:122486214875:web:039b77419e8398abc3bcfe",
  measurementId: "G-2TZKLB0N7X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginEmailPassword = async (values) => {
  const {email, password} = values;

  try {
    await signInWithEmailAndPassword(auth, email, password)

    alert("Sign-in succeded!")
  } 
  catch (e) {
    alert("Sign-in failed!")
  }
} 

export const createUser = async (values) => {
  const {email, password} = values;

  try {
    await createUserWithEmailAndPassword(auth, email, password)

    alert("You have successfully signed up! Now you can try to sign in using the same credentials")

  }
  catch (e) {
    alert("Unfortunately something happened(")
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


