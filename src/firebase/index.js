import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAvj1lm7SkPMHTPLOoii_zTEhMK727PE4Q",
    authDomain: "task-fdc5e.firebaseapp.com",
    projectId: "task-fdc5e",
    storageBucket: "task-fdc5e.appspot.com",
    messagingSenderId: "1058188678152",
    appId: "1:1058188678152:web:12ea115342467d8341edbd"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;