<template>
  <div class="is-vertical-center" style="height:100vh">
    <div class="is-vertical-center">
      <p class="title" style="margin:20px 0">
        <span class="title is-1 has-text-primary">404</span> Not Found
      </p>
      <p class="subtitle" style="margin:0">Sorry, the page not found</p>
    </div>
    <div class="is-vertical-center">
      <figure class="image is-128x128">
        <img src="../assets/egg.svg">
      </figure>
    </div>
    <div class="is-vertical-center">
      <p style="margin-bottom:10px;">the link you followed may be broken or have expired.</p>
      <div class="content is-vertical-center">
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/group">Go to groups page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
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

