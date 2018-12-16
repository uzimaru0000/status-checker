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

const modules = {
  Init: () => {
    firebase.initializeApp(config);
    const settings = { timestampsInSnapshots: true };
    firebase.firestore().settings(settings);
  },
  OnAuthStateChanged: callback => {
    firebase.auth().onAuthStateChanged(callback);
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
  StoreUserData: user => {
    firebase.firestore().collection('users').doc(user.email).set({
      imageURL: user.photoURL,
      name: user.displayName,
      motivation: 100,
      comment: "",
      status: ""
    });
  },
  IsUserRegister: async email => {
    const user = await firebase.firestore().collection('users').doc(email).get();

    return user.exists;
  }
};


export default modules;