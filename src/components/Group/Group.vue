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
    if (this.user.joinedGroup && this.user.joinedGroup.length !== 0) {
      console.log(this.user.joinedGroup[0]);
    }
  }
};
</script>

<style scoped>
</style>
