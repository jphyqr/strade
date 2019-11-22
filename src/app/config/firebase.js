  import firebase from 'firebase/app'
  
  import 'firebase/firestore'
  import 'firebase/database'
  import 'firebase/auth'
  import 'firebase/storage'
 // import 'firebase/analytics'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBmLiQh0EBoDBZtlotVRbddryeGFSUbFSE",
    authDomain: "strade-fe535.firebaseapp.com",
    databaseURL: "https://strade-fe535.firebaseio.com",
    projectId: "strade-fe535",
    storageBucket: "strade-fe535.appspot.com",
    messagingSenderId: "374574781809",
    appId: "1:374574781809:web:d3f12b02e7d124ca72d2d0",
    measurementId: "G-SXVQFVFK0F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();
  firebase.firestore();

  export default firebase
