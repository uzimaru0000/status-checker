const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

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

exports.createGroup = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === "POST") {
      try {
        const ref = await app.firestore().collection('group').add({
          name: req.body.name,
          members: [req.body.id]
        });

        const userRef = app.firestore().collection('users').doc(req.body.id);
        const user = await userRef.get().then(x => x.data());
        user.joinedGroups = user.joinedGroups || [];
        user.joinedGroups.push(ref.id);
        await userRef.update(user);

        res.status(200).send({ groupID: ref.id });
      } catch (err) {
        res.status(500).send({ message: err });
      }
    } else {
      res.status(400).send({ message: "bad request" });
    }
  });
});