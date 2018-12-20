<template>
  <section class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-full has-text-centered">
        <span class="title is-1">Join Group</span>
      </div>
      <div class="column is-6">
        <b-field
          label="GroupID"
          :type="{ 'is-danger': errors.id }"
          :message="{ '入力してください': errors.id }"
        >
          <b-input v-model="id"/>
        </b-field>
        <b-field grouped position="is-right">
          <div class="control">
            <button class="button is-primary" @click="joinGroup" :class="{'is-loading' : join}">Join</button>
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
  name: "Join",
  props: {
    user: Object
  },
  data() {
    return {
      id: "",
      errors: {},
      join: false
    };
  },
  methods: {
    async joinGroup() {
      if (this.id === "") {
        this.$set(this.errors, "id", true);
        return;
      }
      this.$set(this.errors, "id", false);

      try {
        this.join = true;
        await fetch(
          `http://localhost:5000/status-a7b18/us-central1/group/${this.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: this.user.id })
          }
        );
        this.join = false;
      } catch (err) {
        this.join = false;
        this.$toast.open({
          duration: 5000,
          message: errorHandling(err),
          position: "is-top",
          type: "is-danger"
        });
      }
    }
  }
};

const errorHandling = err => {
  switch (err.code) {
    case "not-found":
      return "グループが存在しません";
  }
  return err;
};
</script>

<style scoped>
</style>
