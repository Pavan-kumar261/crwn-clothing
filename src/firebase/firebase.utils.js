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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Getting the reference object of the user with id
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // Getting the snapshot object (basically data) of the user reference
  const snapshot = await userRef.get();

  // If data does not exist we are creating the data which we require to store in the db
  if (!snapshot.exists) {
    
    // Taking displayName and email properties from the google object when we sign in
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Creating a new google auth provider with GoogleAuthProvider class from firebase auth
const provider = new firebase.auth.GoogleAuthProvider();

// This makes the sign window pop-up everytime we click on sign in with google button
provider.setCustomParameters({ prompt: "select_account" });

// signInWithPopup method triggers the pop-up. So to tell it to pop-up the google related pop-up we provide our provider as an argument to it.
// This usually provides various pop-ups depending on the provider argument passed to it.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
