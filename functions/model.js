const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp(functions.config());
admin.firestore().settings({ timestampsInSnapshots: true });

const getUser = async id => {
  try {
    return await app.firestore().collection('users').doc(id).get()
      .then(x => Object.assign(x.data(), { id: x.id }));
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, user) => {
  try {
    delete user.id;
    await app.firestore().collection('users').doc(id).update(user);
  } catch (err) {
    throw err;
  }
}

const addChatRoom = async (userID, brosID, roomID) => {
  try {
    const rooms = {};
    rooms[brosID] = roomID;

    await app.firestore().collection('users').doc(userID).set({
      chatRoom: rooms
    }, { merge: true });
  } catch (err) {
    throw err;
  }
}

const getGroup = async id => {
  try {
    const group =
      await app
        .firestore()
        .collection('group')
        .doc(id)
        .get()
        .then(x => x.exists ? x.data() : Promise.reject('This ID is not exist.'));
    return group;
  } catch (err) {
    throw err;
  }
};

const createGroup = async (name, id) => {
  try {
    const ref = await app.firestore().collection('group').add({
      name: name,
      members: [id]
    });

    await userJoinGroup(id, ref.id);
    return ref.id;
  } catch (err) {
    throw err;
  }
};

const updateGroup = async (id, group) => {
  try {
    await app.firestore().collection('group').doc(id).update(group);
  } catch (err) {
    throw err;
  }
};

const joinGroup = async (id, userID) => {
  try {
    const group = await getGroup(id);
    group.members = group.members.concat(userID);
    await updateGroup(id, group);
    await userJoinGroup(userID, id);
  } catch (err) {
    throw err;
  }
};

const userJoinGroup = async (userID, groupID) => {
  try {
    await app.firestore().collection('users').doc(userID).update({
      joinedGroups: admin.firestore.FieldValue.arrayUnion(groupID)
    });
  } catch (err) {
    throw err;
  }
};

const createChat = async (userID, brosID) => {
  try {
    const ref = await app.firestore().collection('chat').doc();
    ref.set({ messages: [] });

    await addChatRoom(userID, brosID, ref.id);
    await addChatRoom(brosID, userID, ref.id);

    return ref.id;
  } catch (err) {
    throw err;
  }
}

const addMessage = async (roomID, userID, message) => {
  try {
    await app.firestore().collection('chat').doc(roomID).update({
      messages: admin.firestore.FieldValue.arrayUnion({
        message: message,
        uid: userID,
        date: new Date()
      })
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRoom = async roomID => {
  try {
    const room =
      await app.firestore()
        .collection('chat')
        .doc(roomID).get()
        .then(x => x.exists ? x.data() : Promise.reject('This id is not exist.'));

    room.messages = room.messages.map(x => {
      x.date = x.date.toDate();
      return x;
    });

    return room;
  } catch (err) {
    return err;
  }
}

module.exports = { app, getUser, updateUser, getGroup, createGroup, joinGroup, createChat, addMessage, getRoom };