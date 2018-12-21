<template>
  <section class="section">
    <div v-if="!isFetching" class="columns">
      <div class="column is-5">
        <router-link to="/edit">
          <status-item :user="user"/>
        </router-link>
      </div>
      <div class="column is-7">
        <div class="columns is-multiline">
          <div
            v-for="member in group.members.filter(x => x.email !== user.email)"
            :key="member.email"
            class="column is-full"
          >
            <router-link :to="`/chat/${member.id}`">
              <status-item :user="member"/>
            </router-link>
          </div>
          <div class="column is-full">
            <div class="box has-text-centered">
              <div class="columns">
                <div class="column is-3">
                  <span class="title">GroupID</span>
                </div>
                <b-input class="column" :value="id" readonly/>
              </div>
              <div class="subtitle has-text-left">招待したい人にIDを教えてください</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-loading v-else :is-full-page="true" :active="true"/>
  </section>
</template>

<script>
import firebase from "../../firebase";
import StatusItem from "./StatusItem";

export default {
  name: "Status",
  props: {
    id: String,
    user: Object
  },
  data() {
    return {
      group: null,
      isFetching: true,
      unsubs: null
    };
  },
  components: { StatusItem },
  async created() {
    this.group = await fetch(
      `https://us-central1-status-a7b18.cloudfunctions.net/group/${this.id}`
    ).then(x => x.json());

    if (
      this.group.message ||
      !this.group.members.some(x => x.id === this.user.id)
    ) {
      this.$router.push({ path: "/group" });
      this.$toast.open({
        duration: 5000,
        message: this.group.message
          ? "グループが存在しません"
          : "グループに所属していません",
        position: "is-top",
        type: "is-danger"
      });
      return;
    }

    this.unsubs = firebase
      .Instence()
      .collection("group")
      .doc(this.id)
      .onSnapshot(
        async x => {
          if (x.metadata.hasPendingWrites) return;
          const g = x.data();
          g.members = await Promise.all(
            g.members.map(
              async key =>
                await fetch(
                  `https://us-central1-status-a7b18.cloudfunctions.net/user/${key}`
                ).then(x => x.json())
            )
          );
          this.group = g;
        },
        err => console.log(err)
      );

    this.isFetching = false;
  },
  methods: {},
  beforeDestroy() {
    if (this.unsubs) this.unsubs();
  }
};
</script>

<style lang="sass" scoped>

</style>
