<template>
  <section class="section is-medium">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <h1 class="title is-1 is-center">Login</h1>
      </div>
      <div class="column is-one-third">
        <button @click="Login" class="button is-large is-fullwidth">
          <b-icon pack="fab" icon="github"/>
          <span>Login</span>
        </button>
      </div>
      <div class="column is-full has-text-centered">
        <span>If not yet signup, move to</span>
        <router-link to="/signup">SignUp</router-link>
      </div>
    </div>
  </section>
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
