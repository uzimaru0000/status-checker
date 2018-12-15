<template>
  <section class="section is-medium">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <h1 class="title is-1 is-center">SignUp</h1>
      </div>
      <div class="column is-one-third">
        <button @click="SignUp" class="button is-large is-fullwidth">
          <b-icon pack="fab" icon="github"/>
          <span>SignUp</span>
        </button>
      </div>
      <div class="column is-full has-text-centered">
        <span>If already sign up, move to</span>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </section>
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
