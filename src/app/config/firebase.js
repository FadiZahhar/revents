import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/auth'; //v9
import 'firebase/compat/firestore'; //v9
import 'firebase/compat/storage';

const firebaseConfig= {
  apiKey: "AIzaSyC1HoRGGzR04pscwuMSoULUKQ_zH24iM_E",
  authDomain: "reventproject-6a573.firebaseapp.com",
  projectId: "reventproject-6a573",
  storageBucket: "reventproject-6a573.appspot.com",
  messagingSenderId: "251790231830",
  appId: "1:251790231830:web:bfb5737817e31bb163a837"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();



export default firebase;