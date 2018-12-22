<template>
  <div class="box" @click="emojiShow = emojiShow ? false : emojiShow">
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
              <b-field>
                <b-input v-model="user.name"></b-input>
                <div class="collapse-parent">
                  <button class="button" @click.stop="emojiShow = !emojiShow">
                    <b-icon pack="far" :icon="user.status"></b-icon>
                  </button>
                  <transition name="show">
                    <emoji
                      v-show="emojiShow"
                      :emojis="emojis"
                      type="is-emoji"
                      @click="changeState"
                      class="selecter"
                    />
                  </transition>
                </div>
              </b-field>
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
                  type="is-info"
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
    <div class="column">
      <b-field label="Comment">
        <b-input maxlength="140" type="text" v-model="user.comment"></b-input>
      </b-field>
    </div>
    <div class="column">
      <button class="button is-success" @click="update">更新する</button>
    </div>
  </div>
</template>

<script>
import SlideBar from "./SlideBar";
import Emoji from "./Emoji";

export default {
  props: { user: Object },
  components: { SlideBar, Emoji },
  data() {
    return {
      inputSkill: "",
      emojis: [
        "smile",
        "meh",
        "tired",
        "angry",
        "frown",
        "laugh-beam",
        "grin-beam-sweat",
        "surprise",
        "sad-cry"
      ],
      status: "meh",
      emojiShow: false
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
    },
    changeState(s) {
      this.user.status = s;
    },
    async update() {
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

        this.$toast.open({
          duration: 2000,
          message: "更新が完了しました",
          position: "is-top",
          type: "is-success"
        });
      } catch (err) {
        this.$toast.open({
          duration: 2000,
          message: "更新が失敗しました",
          position: "is-top",
          type: "is-danger"
        });
        console.log(err);
      }
    }
  },
  async beforeDestroy() {
    this.update();
  }
};
</script>

<style lang="scss" scoped>
.collapse-parent {
  position: relative;
}
.selecter {
  position: absolute;
  width: 320px;
  top: 100%;
  left: calc(-160px + 100%);
  z-index: 100;
}

.show-enter-active,
.show-leave-active {
  transition: all 0.1s ease-in-out;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>

