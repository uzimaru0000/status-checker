<template>
  <div class="box">
    <div class="columns">
      <div class="column is-one-third">
        <figure class="image is-fullwidth">
          <img class="is-rounded" :src="user.imageURL">
        </figure>
      </div>

      <div class="column">
        <div class="columns is-multiline">
          <div class="column is-full">
            <b-field
              label="Name"
              :type="user.name.length === 0 ? 'is-danger' : 'is-primary'"
              :message="user.name.length === 0 ? '入力してください' : ''"
            >
              <b-input v-model="user.name"></b-input>
            </b-field>
          </div>
          <div class="column is-full">
            <b-field label="Motivation">
              <slide-bar
                size="is-large"
                :type="motivationColor(user.motivation)"
                v-model.number="user.motivation"
              />
            </b-field>
          </div>
          <div class="column is-full">
            <b-field label="Skill">
              <div class="control">
                <input type="text" class="input" v-model="inputSkill" @keydown.enter="enter">
              </div>
            </b-field>
          </div>
          <div class="column is-full">
            <div class="box" style="height:120px">
              <b-taglist>
                <b-tag
                  v-for="(skill, i) in user.skill"
                  :key="i"
                  type="is-primary"
                  size="is-medium"
                  closable
                  @close="delTag(i)"
                >{{ skill }}</b-tag>
              </b-taglist>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <b-field label="Comment">
        <b-input maxlength="140" type="text" v-model="user.comment"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import SlideBar from "./SlideBar";

export default {
  props: { user: Object },
  components: { SlideBar },
  data() {
    return {
      inputSkill: ""
    };
  },
  methods: {
    motivationColor(motivation) {
      if (motivation >= 30) return "is-primary";
      else if (motivation >= 10) return "is-warning";
      else return "is-danger";
    },
    enter() {
      if (/\S+/.test(this.inputSkill)) {
        this.user.skill = (this.user.skill || []).concat(this.inputSkill);
        this.inputSkill = "";
      }
    },
    delTag(i) {
      this.user.skill.splice(i, 1);
    }
  },
  async beforeDestroy() {
    try {
      await fetch(
        `https://us-central1-status-a7b18.cloudfunctions.net/user/${
          this.user.id
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.user)
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

