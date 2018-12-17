<template>
  <div>
    <input
      type="range"
      class="custom"
      step="1"
      :min="min"
      :max="max"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <progress ref="bar" :class="['progress', size, type]" :value="value" :max="max">{{ value }}%</progress>
  </div>
</template>

<script>
export default {
  props: {
    size: String,
    type: String,
    value: Number
  },
  data() {
    return {
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

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 100%;
  width: 100%;
  height: 100%;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  &:focus,
  &::-webkit-slider-thumb {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
  }
}
</style>

