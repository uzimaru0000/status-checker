<template>
  <div class="box is-shadowless">
    <div class="media">
      <div v-if="direction === 'left'" class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="user.imageURL">
        </figure>
      </div>
      <div class="media-content columns is-multiline">
        <div class="column is-full" :class="{'has-text-right': direction === 'right'}">
          <span class="title is-5">{{user.name}}</span>
          <span class="subtitle is-6">{{time}}</span>
        </div>
        <div
          class="column is-size-5 is-4 msg box"
          :class="{'has-text-right': direction === 'right', 'right': direction === 'right'}"
        >{{message.message}}</div>
      </div>
      <div v-if="direction === 'right'" class="media-right">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="user.imageURL">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: Object,
    user: Object,
    direction: {
      type: String,
      default: "left"
    }
  },
  computed: {
    time() {
      const dateObj = new Date(this.message.date.seconds * 1000);
      return [
        dateObj.getHours(),
        ":",
        ("0" + dateObj.getMinutes()).slice(-2)
      ].join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
.msg {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.right {
  margin-left: auto;
}
</style>
