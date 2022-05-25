<template>
  <div ref="grid" class="MasonryGrid">
    <div v-for="(col, i) of cols" :key="i" class="MasonryGrid_Col">
      <div v-for="(item, i2) of col" :key="i2" class="MasonryGrid_Item">
        <slot name="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { chunk, throttle } from 'lodash'
import { MASONRY_GRID_BREAKPOINTS } from '~/constants/constants'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    width: null,
  }),
  computed: {
    colsNum: (vm) =>
      MASONRY_GRID_BREAKPOINTS.find(({ width }) => vm.width <= width)?.cols ||
      MASONRY_GRID_BREAKPOINTS[MASONRY_GRID_BREAKPOINTS.length - 1].cols,
    itemChunks: (vm) => chunk(vm.items, vm.colsNum),
    cols: (vm) =>
      Array(vm.colsNum)
        .fill('')
        .map((_, col) =>
          vm.itemChunks.map((chunk) => chunk[col]).filter((item) => item)
        ),
  },
  mounted() {
    this.setWidth()

    window.addEventListener('resize', this.setWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
  },
  methods: {
    setWidth: throttle(function () {
      if (!this.$refs?.grid) return

      this.width = this.$refs.grid.offsetWidth
    }, 20),
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
