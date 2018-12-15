<template>
  <div>
    <h1>SignUp</h1>
    <button @click="SignUp">SignUp with GitHub</button>
    <button @click="Logout">Logout</button>
    <br>
    <router-link to="/login">Login</router-link>
    <br>
    <span>{{ user !== null ? "login" : "not login" }}</span>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  props: {
    user: Object
  },
  name: "SignUp",
  methods: {
    SignUp() {
      firebase.LoginWithGithub();
    },
    Logout() {
      firebase
        .Logout()
        .then(() => this.$router.push({ path: "/" }))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style scoped>
</style>
