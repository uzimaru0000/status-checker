const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

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

const userRequest = express();
userRequest.use(cors({ origin: true }));
userRequest.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bad request" });
    return;
  }
  try {
    const user = await app.firestore().collection('users').doc(id).get()
      .then(x => Object.assign(x.data(), { id: x.id }));
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
userRequest.put('/:id', async (req, res) => {
  const id = req.param('id');
  if (id) {
    res.status(400).send({ message: "bad request" });
    return;
  }
  try {
    await app.firestore().collection('users').doc(id).update(req.body);
    res.status(200).send({ message: success });
  } catch (err) {
    res.status(500).send(err);
  }
});
exports.user = functions.https.onRequest(userRequest);