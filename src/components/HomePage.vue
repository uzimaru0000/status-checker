<template>
  <div class="is-vertical-center" style="height:600px">
    <figure class="image" style="width:400px">
      <img src="../assets/logo/logo_transparent.jpeg">
    </figure>
    <div>
      <router-link v-if="user===null" class="button is-primary is-normal" to="/signin">Sign In</router-link>
      <router-link v-else class="button is-primary is-normal" :to="groupURL">Go to Group Page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    user: Object
  },
  data() {
    return {};
  },
  computed: {
    groupURL() {
      if (
        this.user &&
        this.user.joinedGroups &&
        this.user.joinedGroups.length > 0
      ) {
        return `/group/${this.user.joinedGroups[0]}`;
      } else {
        return "/group";
      }
    }
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

