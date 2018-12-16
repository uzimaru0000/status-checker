<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="title">
          <router-link to="/">LOGO</router-link>
        </span>

        <div class="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="user === null" class="buttons">
              <router-link to="/signup" class="button is-primary">SignUp</router-link>
              <router-link to="/login" class="button is-light">Login</router-link>
            </div>
            <button v-else @click="Logout" class="button is-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "Navbar",
  props: {
    user: Object
  },
  methods: {
    Logout() {
      firebase
        .Logout()
        .then(_ => this.$router.push({ path: "/" }))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.logo {
  width: 128px;
  margin: 8px;
}
</style>
