<template>
  <span class="apiSvg" v-html="svg" :style="style" />
</template>

<script>
export default {
  props: {
    svg: {
      type: String,
      required: true,
    },
    scale: {
      type: String,
      default: '1',
    },
  },
  computed: {
    computedScale: (vm) => parseFloat(vm.scale) || 1,
    style: (vm) => ({
      transform: `scale(${vm.computedScale})`,
    }),
  },
}
</script>

<style lang="scss">
.apiSvg {
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
