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
    if (this.user.joinedGroup) {
      // TODO: 0番目のグループViewに移動
    }
  }
};
</script>

<style scoped>
</style>
