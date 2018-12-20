<template>
  <section class="section">
    <b-loading :is-full-page="true" :active="creating"/>
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <span class="title is-1">Create Group</span>
      </div>
      <div class="column is-6">
        <b-field
          label="GroupName"
          :type="{ 'is-danger': errors.name }"
          :message="{ '入力してください': errors.name }"
        >
          <b-input v-model="groupName"/>
        </b-field>
        <b-field grouped position="is-right">
          <div class="control">
            <button
              class="button is-primary"
              @click="createGroup"
              :class="{ 'is-loading': creating }"
            >Create</button>
            <router-link class="button is-light" to="/group">Cancel</router-link>
          </div>
        </b-field>
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
        const res = await fetch(
          "https://us-central1-status-a7b18.cloudfunctions.net/group",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: this.groupName, id: this.user.id })
          }
        ).then(x => x.json());
        this.creating = false;
        // TODO: /group/:id に飛ばす
      } catch (err) {
        this.creating = false;
        this.$toast.open({
          duration: 5000,
          message: err,
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
