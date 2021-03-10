import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp({
  apiKey: "AIzaSyBFf6fZ_nh3ZeeMGKVTHJa_o9dJBrDkZ5Q",
  authDomain: "firechat-2d56e.firebaseapp.com",
  projectId: "firechat-2d56e",
  storageBucket: "firechat-2d56e.appspot.com",
  messagingSenderId: "417284908382",
  appId: "1:417284908382:web:ee67dadf2353d22ac05bcf"
});

export const Context = React.createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);

