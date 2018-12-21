<template>
  <div class="box">
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="user.imageURL">
        </figure>
      </div>
      <div class="media-content columns is-multiline">
        <div class="column is-full">
          <span class="title is-5">{{user.name}}</span>
          <span class="subtitle is-6">{{time}}</span>
        </div>
        <div class="column is-full is-size-5 msg">{{message.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: Object,
    user: Object
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
</style>
