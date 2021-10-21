import { initializeApp, firebase } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseLooper } from "./firebaseTools";

const firebaseConfig = {
    apiKey: "AIzaSyB029BnW17PgCWpf6NrNOtRP1U3VqyiZaI",
    authDomain: "link-shortener-802e6.firebaseapp.com",
    projectId: "link-shortener-802e6",
    storageBucket: "link-shortener-802e6.appspot.com",
    messagingSenderId: "28487172788",
    appId: "1:28487172788:web:2e6446fa5f87537af84de1",
    measurementId: "G-MFJH424V9N"
};

const app = initializeApp(firebaseConfig);

export default getFirestore();

export const auth = getAuth();

// detect auth state change
onAuthStateChanged(auth, user => {
    if(user !== null){
        console.log("Logged in")
    } else {
        console.log("No user")
    }
})

