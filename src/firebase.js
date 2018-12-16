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
  Instence: () => firebase.firestore(),
  OnAuthStateChanged: (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
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
  IsAuth: () => {
    return firebase.auth().currentUser ? true : false;
  },
  StoreUserData: user => {
    firebase.firestore().collection('users').doc(user.email).set({
      imageURL: user.photoURL,
      name: user.displayName,
      motivation: 100,
      comment: "",
      status: "",
      joinedGroups: [],
      email: user.email
    });
  },
  IsUserRegister: async email => {
    const user = await firebase.firestore().collection('users').doc(email).get();
    return user.exists;
  },
  GetUser: async email => {
    const snapshot = await firebase.firestore().collection('users').doc(email).get();
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      return null;
    }
  },
  UpdateUser: user => {
    return firebase.firestore().collection('users').doc(user.email).set(user);
  },
  CreateGroup: (name, user) => {
    return firebase.firestore().collection('group').add({
      name: name,
      members: [firebase.firestore().collection('users').doc(user.email)]
    });
  },
  JoinGroup: (id, user) => {
    const ref = firebase.firestore().collection('users').doc(user.email);

    return firebase.firestore().collection('group').doc(id).update({
      members: firebase.firestore.FieldValue.arrayUnion(ref)
    });
  }
};


export default modules;