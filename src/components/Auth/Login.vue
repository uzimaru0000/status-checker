<template>
  <section class="section is-medium">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <h1 class="title is-1 is-center">Sign In</h1>
      </div>
      <div class="column is-full columns is-centered">
        <div class="column is-5">
          <button @click="Login('github')" class="button is-large is-fullwidth is-github">
            <b-icon pack="fab" icon="github"/>
            <span>Sign In with GitHub</span>
          </button>
        </div>
      </div>
      <div class="column is-full columns is-centered">
        <div class="column is-5">
          <button @click="Login('google')" class="button is-large is-fullwidth is-google">
            <b-icon pack="fab" icon="google"/>
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../../firebase";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    async Login(name) {
      try {
        let user;
        switch (name) {
          case "github":
            user = await firebase.LoginWithGithub();
            break;
          case "google":
            user = await firebase.LoginWithGoogle();
            break;
        }

        this.$router.push({ path: "/" });
      } catch (err) {
        this.$toast.open({
          duration: 5000,
          message: "Failed to sign in",
          position: "is-top",
          type: "is-danger"
        });
      }
    }
  }
};
</script>


<style scoped>
</style>
