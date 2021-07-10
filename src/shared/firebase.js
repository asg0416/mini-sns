import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAZe7VZUNfGPPk0JoG_liCPiZcNPPMDLrw",
    authDomain: "mini-sns-ab4a7.firebaseapp.com",
    projectId: "mini-sns-ab4a7",
    storageBucket: "mini-sns-ab4a7.appspot.com",
    messagingSenderId: "751132231593",
    appId: "1:751132231593:web:39dbb3241562b4e4ce26b8",
    measurementId: "G-20Z3QW837C"};

firebase.initializeApp(firebaseConfig);

const apiKey = "AIzaSyAZe7VZUNfGPPk0JoG_liCPiZcNPPMDLrw"
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };