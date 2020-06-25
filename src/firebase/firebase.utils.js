import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB7GQ8smOKNByU9KGZyqdFlgwb5CuW2o_k",
    authDomain: "crwn-db-5f1c7.firebaseapp.com",
    databaseURL: "https://crwn-db-5f1c7.firebaseio.com",
    projectId: "crwn-db-5f1c7",
    storageBucket: "crwn-db-5f1c7.appspot.com",
    messagingSenderId: "743266703388",
    appId: "1:743266703388:web:d0ee7fc9d1bab19dab67d9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
