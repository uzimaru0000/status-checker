<template>
  <div id="app">
    <navbar :user="user"/>
    <router-view v-if="initFlag" :user="user"/>
    <b-loading v-else :is-full-page="true" :active="true"></b-loading>
    <div>{{user}}</div>
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
      initFlag: false,
      userUnSubs: null
    };
  },
  created() {
    firebase.OnAuthStateChanged(async user => {
      if (user !== null) {
        this.user = await fetch(
          `https://us-central1-status-a7b18.cloudfunctions.net/user/${user.uid}`
        ).then(x => x.json());
        this.userUnsubs = firebase
          .Instence()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(
            x => (this.user = Object.assign(x.data(), { id: x.id })),
            err => console.log(err)
          );
      } else {
        this.user = null;
        if (this.userUnSubs) this.userUnSubs();
        this.userUnSubs = null;
        console.log("hoge");
      }
      this.initFlag = true;
    });
  }
};
</script>


<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #4daab3;
$primary-invert: findColorInvert($primary);
$info: #4d8ab3;
$info-invert: findColorInvert($info);
$success: #4db371;
$success-invert: findColorInvert($success);
$warning: #b39f4d;
$warning-invert: findColorInvert($warning);
$danger: #b34d61;
$danger-invert: findColorInvert($danger);
$light: #eeeeee;
$light-invert: findColorInvert($light);

$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  )
);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
