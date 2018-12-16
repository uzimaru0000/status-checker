<template>
  <section class="section">
    <div class="columns is-multiline is-centered">
      <div class="column has-text-centered">
        <span class="title is-1">Join / Create Group</span>
      </div>
    </div>
    <div class="columns is-centered is-multiline">
      <div class="column is-7">
        <router-link class="button is-fullwidth is-large" to="/group/create">Create</router-link>
      </div>
      <div class="column is-7">
        <router-link class="button is-fullwidth is-large" to="/group/join">Join</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Select"
};
</script>

<style scoped>
</style>
