<template>
  <div class="box frame">
    <div class="buttons">
      <button
        v-for="(emoji, i) in emojis"
        :key="i"
        class="button is-medium is-white"
        @click="selectState(emoji)"
      >
        <b-icon class="emoji" pack="far" :icon="emoji" :type="type"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Emoji",
  props: {
    emojis: Array,
    type: String
  },
  methods: {
    selectState(state) {
      this.$emit("click", state);
    }
  }
};
</script>

<style lang="scss" scoped>
.emoji:hover {
  animation: anim 0.5s ease;
}

@keyframes anim {
  to {
    transform: scale(1);
  }
  from {
    transform: scale(1.25);
  }
}
</style>

