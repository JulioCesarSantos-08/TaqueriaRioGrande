import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyDOgmOzpNR7Xj4mZMnxrXh_5ur19eqPKR0",

authDomain: "taqueriariogrande-aa940.firebaseapp.com",

databaseURL: "https://taqueriariogrande-aa940-default-rtdb.firebaseio.com",

projectId: "taqueriariogrande-aa940",

storageBucket: "taqueriariogrande-aa940.firebasestorage.app",

messagingSenderId: "723466200983",

appId: "1:723466200983:web:89c1404fe05accf2c506d2"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export {

auth,

provider,

db

};