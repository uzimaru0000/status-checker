<template>
  <div>
    <h1>Login</h1>
    <button @click="Login" class="btn">
      <i class="icon github"></i>
      Login
    </button>
    <br>
    <router-link to="/signup">SignUp</router-link>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    Login() {
      firebase.LoginWithGithub();
    }
  }
};
</script>


<style scoped>
</style>
