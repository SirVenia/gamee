import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIZhvkWj7IktkrZHoFcLTTepcZANN8lzk",
  authDomain: "gamee-46e1f.firebaseapp.com",
  databaseURL: "https://gamee-46e1f.firebaseio.com",
  projectId: "gamee-46e1f",
  storageBucket: "gamee-46e1f.appspot.com",
  messagingSenderId: "456885510772",
  appId: "1:456885510772:web:bb3d51e69c944cc0c32721",
  measurementId: "G-C3EMJ38JWG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("app"));
