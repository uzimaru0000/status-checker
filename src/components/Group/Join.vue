<template>
  <section class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <span class="title is-1">Join Group</span>
      </div>
      <div class="column is-6">
        <div class="field">
          <label class="label">GroupID</label>
          <div class="control">
            <input class="input" type="text">
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button is-primary">Join</button>
            <router-link class="button is-light" to="/group">Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Join"
};
</script>

<style scoped>
</style>
