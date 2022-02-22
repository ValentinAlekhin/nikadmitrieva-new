<template>
  <div class="Series">
    <div class="Series_Header">
      <span class="Series_Title">
        {{ series.title }}
      </span>
    </div>

    <masonry-grid :items="series.images">
      <template #item="{ item }">
        <image-card
          :image="item"
          :title="''"
          :link="`/series/${id}/${item.id}`"
        />
      </template>
    </masonry-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  computed: {
    ...mapGetters('series', ['getSeriesById']),
    id: (vm) => Number(vm.$route.params.id),
    series: (vm) => vm.getSeriesById(vm.id),
    pageTitle: (vm) => vm.series.title,
    pageImage: (vm) => vm.series?.images[0]?.url || '',
  },
}
</script>

<style lang="scss" scoped>
.Series {
  &_Images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
