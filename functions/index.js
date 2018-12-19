const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp(functions.config());
admin.firestore().settings({ timestampsInSnapshots: true });

exports.createUser = functions.auth.user().onCreate(user => {
  return app.firestore().collection('users').doc(user.uid).set({
    name: user.displayName || 'Anonymous',
    imageURL: user.photoURL,
    motivation: 100,
    comment: "",
    status: "",
    joinedGroups: [],
    email: user.email,
    skill: []
  });
});