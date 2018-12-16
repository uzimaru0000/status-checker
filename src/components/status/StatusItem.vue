<template>
  <div class="box">
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img class="is-rounded" :src="user.imageURL" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <span class="title is-3">{{ user.name }}</span>
          <b-icon pack="far" icon="smile" size="is-medium"/>
        </div>
        <progress
          class="progress is-primary is-small"
          :value="user.motivation"
          max="100"
        >{{ user.motivation }}%</progress>
        <p>{{ user.comment }}</p>
      </div>
      <!-- <div class="media-right">
        emoji
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusItem",
  props: {
    user: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style lang="scss" scoped>
</style>