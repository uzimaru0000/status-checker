<template>
  <div ref="bar">
    <input
      type="range"
      class="custom has-background-light"
      step="1"
      :min="min"
      :max="max"
      v-model="value"
    >
    <div class="bright-bar has-background-primary" :style="{ width: barWidth + 'px' }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 40,
      max: 100,
      min: 0,
      clientWidth: 0
    };
  },
  computed: {
    barWidth() {
      const range_x = this.clientWidth;
      const b_r = range_x / this.max;
      return b_r * this.value;
    }
  },
  mounted() {
    this.clientWidth = this.$refs.bar.clientWidth;
  }
};
</script>

<style lang="scss" scoped>
div {
  position: relative;
}

$SLIDER_HEIGHT: 10px;

.bright-bar {
  -webkit-appearance: none;
  border: 0;
  height: 100%;
  width: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: $SLIDER_HEIGHT;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: red;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 2px;
  }
}
</style>

