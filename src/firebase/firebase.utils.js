import firebase from "firebase/app";
import "firebase/firestore";

import "firebase/auth";
const config = {
  apiKey: "AIzaSyD-gTKwCwmNHL263LGR9gqjHZnYNVHG78E",
  authDomain: "crwn-db-10dc8.firebaseapp.com",
  projectId: "crwn-db-10dc8",
  storageBucket: "crwn-db-10dc8.appspot.com",
  messagingSenderId: "568704878805",
  appId: "1:568704878805:web:147a246b6cedd37f687a5c",
  measurementId: "G-3BEPXKWSF7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
