<template>
  <div id="app">
    <router-view v-if="initFlag" :user="user"/>
  </div>
</template>

<script>
import firebase from "./firebase";

export default {
  name: "App",
  data() {
    return {
      user: null,
      initFlag: false
    };
  },
  created() {
    firebase.OnAuthStateChanged(async user => {
      this.user = user;
      this.initFlag = true;

      if (user !== null && !(await firebase.IsUserRegister(user.email))) {
        firebase.StoreUserData(user);
      }
    });
  }
};
</script>

<style>
</style>
