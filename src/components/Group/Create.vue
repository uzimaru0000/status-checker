<template>
  <section class="section">
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
        const ref = await firebase.CreateGroup(this.groupName, this.user);
        const data = await ref.get();
        this.user.joinedGroups = this.user.joinedGroups
          ? this.user.joinedGroups.concat(data.id)
          : [data.id];
        await firebase.UpdateUser(this.user);
        this.creating = false;

        this.$router.push({ path: `/status/${data.id}` });
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
