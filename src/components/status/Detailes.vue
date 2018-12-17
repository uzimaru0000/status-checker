<template>
  <div class="box">
    <div class="columns">
      <div class="column is-one-third">
        <p class="image is-fullwidth">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </div>

      <div class="column columns is-multiline is-vcentered">
        <div class="column is-full">
          <b-field label="Name" type="is-danger">
            <b-input v-model="user.name"></b-input>
          </b-field>
        </div>
        <div class="column is-full">
          <b-field label="Motivation">
            <slide-bar size="is-large" type="is-primary" v-model.number="user.motivation"/>
          </b-field>
        </div>
        <div class="column is-full">
          <b-field label="Note">
            <b-input type="textarea"></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="content">
      <b-field label="Comment">
        <b-input maxlength="200" type="textarea" v-model="user.comment"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import SlideBar from "./SlideBar";

export default {
  props: { user: Object },
  components: { SlideBar }
};
</script>

<style lang="scss" scoped>
</style>

