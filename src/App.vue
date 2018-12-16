<template>
  <div id="app">
    <navbar :user="user"/>
    <router-view v-if="initFlag" :user="user"/>
    <b-loading v-else :is-full-page="true" :active="true"></b-loading>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import firebase from "./firebase";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      user: null,
      initFlag: false
    };
  },
  created() {
    firebase.OnAuthStateChanged(async user => {
      if (user !== null) {
        if (!(await firebase.IsUserRegister(user.email)))
          firebase.StoreUserData(user);
        this.user = await firebase.GetUser(user.email);
      }
      this.initFlag = true;
    });
  }
};
</script>

<style>
</style>
