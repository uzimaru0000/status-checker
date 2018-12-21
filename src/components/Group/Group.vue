<template>
  <div>
    <router-view :user="user"></router-view>
  </div>
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
  created() {}
};
</script>

<style scoped>
</style>
