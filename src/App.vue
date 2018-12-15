<template>
  <div id="app">
    <router-view v-if="initFlag" :user="user"/>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "App",
  data() {
    return {
      user: {},
      initFlag: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.initFlag = true;
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
