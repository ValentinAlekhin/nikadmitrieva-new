<template>
  <div ref="grid" class="MasonryGrid">
    <div class="MasonryGrid_Col" v-for="(col, i) of cols" :key="i">
      <div class="MasonryGrid_Item" v-for="(item, i2) of col" :key="i2">
        <slot name="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { chunk, throttle } from 'lodash'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },
  data: () => ({
    width: null,
  }),
  computed: {
    colsNum: (vm) => {
      const breakpoints = [
        { width: 576, cols: 1 },
        { width: 768, cols: 2 },
        { width: 1400, cols: 3 },
      ]

      return breakpoints.find(({ width }) => vm.width <= width)?.cols || breakpoints[breakpoints.length - 1].cols
    },
    itemChunks: (vm) => chunk(vm.items, vm.colsNum),
    cols: (vm) => Array(vm.colsNum)
      .fill('')
      .map((_, col) => vm.itemChunks.map((chunk) => chunk[col]).filter(item => item)),
  },
  mounted() {
    this.setWidth()

    window.addEventListener('resize', throttle(this.setWidth, 200))
  },
  beforeDestroy() {
    window.removeEventListener('resize', throttle(this.setWidth, 200))
  },
  methods: {
    setWidth() {
      if (!this.$refs.grid) return

      this.width = this.$refs.grid.offsetWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.MasonryGrid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @include md {
    grid-template-columns: repeat(2, 1fr);
  }

  @include xxl {
    grid-template-columns: repeat(3, 1fr);
  }

  &_Item {
    margin-bottom: 20px;
  }
}
</style>
