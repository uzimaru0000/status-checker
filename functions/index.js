const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const model = require('./model');

exports.createUser = functions.auth.user().onCreate(user => {
  return model.app.firestore().collection('users').doc(user.uid).set({
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

// GroupのRequest処理
const groupRequest = express();
groupRequest.use(cors({ origin: true }));
groupRequest.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bad request" })
    return;
  }
  try {
    const group = await model.getGroup(id);
    group.members = await Promise.all(group.members.map(async userID => getUser(userID)));
    res.status(200).send(group);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});
groupRequest.post('/', async (req, res) => {
  try {
    const groupID = await model.createGroup(req.body.name, req.body.id);
    res.status(200).send({ groupID: groupID });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});
groupRequest.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bad request" })
    return;
  }
  try {
    await model.joinGroup(id, req.body.user);
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: 'error' });
  }
});
exports.group = functions.https.onRequest(groupRequest);

// userのRequest処理
const userRequest = express();
userRequest.use(cors({ origin: true }));
userRequest.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bad request" });
    return;
  }
  try {
    const user = await model.getUser(id);
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
    await model.updateUser(id, user);
    res.status(200).send({ message: success });
  } catch (err) {
    res.status(500).send(err);
  }
});
exports.user = functions.https.onRequest(userRequest);