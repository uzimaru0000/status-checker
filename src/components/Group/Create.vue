<template>
  <section class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <span class="title is-1">Create Group</span>
      </div>
      <div class="column is-6">
        <div class="field">
          <label class="label">GroupName</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="groupName"
              :class="{ 'is-danger': errors.name }"
            >
          </div>
          <p v-if="errors.name" class="help is-danger">入力してください</p>
        </div>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button
              class="button is-primary"
              @click="createGroup"
              :class="{ 'is-loading': creating }"
            >Create</button>
            <router-link class="button is-light" to="/group">Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../../firebase";

export default {
  name: "Create",
  props: {
    user: Object
  },
  data() {
    return {
      groupName: "",
      errors: {},
      creating: false
    };
  },
  methods: {
    async createGroup() {
      if (this.groupName === "") {
        this.$set(this.errors, "name", true);
        return;
      }

      this.$set(this.errors, "name", false);

      try {
        this.creating = true;
        await firebase.CreateGroup(this.groupName, this.user);
        this.creating = false;
      } catch (err) {
        console.log(err);
        this.$toast.open({
          duration: 5000,
          message: "Create Error",
          position: "is-top",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
