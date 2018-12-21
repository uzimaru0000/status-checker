const functions = require('firebase-functions');
const admin = require('firebase-admin');
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

exports.deleteUser = functions.auth.user().onDelete(async data => {
  const user = await model.getUser(data.uid);
  await Promise.all(user.joinedGroups.map(x => {
    return model.app.firestore().collection('group').doc(x).update({
      members: admin.firestore.FieldValue.arrayRemove(user.id)
    });
  }));
  await model.app.firestore().collection('users').doc(user.id).delete();
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
    group.members = await Promise.all(group.members.map(async userID => await model.getUser(userID)));
    res.status(200).send(group);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});
groupRequest.post('', async (req, res) => {
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
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bad request" });
    return;
  }
  try {
    await model.updateUser(id, req.body);
    res.status(200).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ message: 'error' });
  }
});
exports.user = functions.https.onRequest(userRequest);

// Chat関連
const chatRequest = express();
chatRequest.use(cors({ origin: true }));
chatRequest.post('/create', async (req, res) => {
  try {
    const roomID = await model.createChat(req.body.userID, req.body.brosID);
    res.status(200).send({ roomID: roomID });
  } catch (err) {
    res.status(500).send({ message: 'error' });
  }
});
chatRequest.post('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bat request." });
    return;
  }
  try {
    await model.addMessage(id, req.body.userID, req.body.message);
    res.status(200).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ message: 'error' });
  }
});
chatRequest.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "bat request." });
    return;
  }
  try {
    const room = await model.getRoom(id);
    res.status(200).send(room);
  } catch (err) {
    res.status(500).send({ message: 'error' });
  }
});
exports.chat = functions.https.onRequest(chatRequest);