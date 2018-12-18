<template>
  <section class="section">
    <div v-if="!isFetching" class="columns">
      <div class="column is-5">
        <status-item :user="user"/>
      </div>
      <div class="column is-7">
        <div class="columns is-multiline">
          <div
            v-for="member in group.members.filter(x => x.email !== user.email)"
            :key="member.email"
            class="column is-full"
          >
            <status-item :user="member"/>
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
    this.group = await firebase.GetGroup(this.id);
    if (!this.group || !this.group.members.some(x => x === this.user.email)) {
      this.$router.push({ path: "/group" });
      this.$toast.open({
        duration: 5000,
        message: !this.group
          ? "グループが存在しません"
          : "グループに所属していません",
        position: "is-top",
        type: "is-danger"
      });
      return;
    }

    this.group.members = await Promise.all(
      this.group.members.map(async key => firebase.GetUser(key))
    );

    this.unsubs = firebase
      .Instence()
      .collection("group")
      .doc(this.id)
      .onSnapshot(
        async x => {
          if (x.metadata.hasPendingWrites) return;
          const g = x.data();
          g.members = await Promise.all(
            g.members.map(async key => firebase.GetUser(key))
          );
          this.group = g;
        },
        err => console.log(err)
      );

    this.isFetching = false;
  },
  methods: {},
  beforeDestroy() {
    this.unsubs();
  }
};
</script>

<style lang="sass" scoped>

</style>
