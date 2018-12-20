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
          <span class="title is-3">{{ user.name || "Anonymous" }}</span>
          <b-icon pack="far" icon="smile" size="is-medium"/>
        </div>
        <progress
          class="progress is-small"
          :class="[motivationColor(user.motivation)]"
          :value="user.motivation"
          max="100"
        >{{ user.motivation }}%</progress>
        <b-taglist>
          <b-tag v-for="(skill, i) in user.skill" :key="i" type="is-info">{{skill}}</b-tag>
        </b-taglist>
        <p>{{ user.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusItem",
  props: {
    user: Object
  },
  methods: {
    motivationColor(motivation) {
      if (motivation >= 30) {
        return "is-primary";
      } else if (motivation >= 10) {
        return "is-warning";
      } else {
        return "is-danger";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style lang="scss" scoped>
</style>