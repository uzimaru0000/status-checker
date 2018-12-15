import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyD7n_Tfv-j7MiY3FtvLqB1YothMtcfCzUA",
  authDomain: "status-a7b18.firebaseapp.com",
  databaseURL: "https://status-a7b18.firebaseio.com",
  projectId: "status-a7b18",
  storageBucket: "status-a7b18.appspot.com",
  messagingSenderId: "934149131287"
};

export default {
  Init: () => {
    firebase.initializeApp(config);
  },
  LoginWithGithub: () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },
  LoginWithGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },
  Logout: () => {
    return firebase.auth().signOut();
  },
  GetCurrentUser: () => {
    return firebase.auth().currentUser;
  }
};
