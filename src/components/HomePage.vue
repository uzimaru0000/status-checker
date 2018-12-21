<template>
  <div class="is-vertical-center" style="height:600px">
    <figure class="image" style="width:400px">
      <img src="../assets/logo/logo_transparent.jpeg">
    </figure>
    <div class="columns">
      <!-- <input type="button" class="button is-primary is-large" value="Log In"> -->
      <router-link class="button is-primary is-large" to="/login">Sign In</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {}
};
</script>

<style lang="scss" scoped>
.is-vertical-center {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
}
</style>

