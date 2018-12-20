<template>
  <router-view :user="user"></router-view>
</template>

<script>
export default {
  name: "Group",
  props: {
    user: Object
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    if (this.user.joinedGroups && this.user.joinedGroups.length !== 0) {
      this.$router.push({ path: `/group/${this.user.joinedGroups[0]}` });
    }
  }
};
</script>

<style scoped>
</style>
