import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDOFLMZA1sJr4BFEaCEgPj49-dSVUccF34",
    authDomain: "vue-typescript-lab5.firebaseapp.com",
    projectId: "vue-typescript-lab5",
    storageBucket: "vue-typescript-lab5.firebasestorage.app",
    messagingSenderId: "874254774753",
    appId: "1:874254774753:web:d0b780b854e65fddf562a0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
