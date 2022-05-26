<template>
  <div class="Series">
    <div class="Series_Header">
      <span class="Series_Title">
        {{ series.title }}
      </span>
    </div>

    <masonry-grid :items="series.images">
      <template #item="{ item }">
        <image-card :image="item" />
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
  &_Header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-bottom: 10px;

    @include md {
      height: 80px;
      margin-bottom: 20px;
    }
  }

  &_Title {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    color: #404044;

    @include md {
      font-size: 30px;
    }
  }

  &_Images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
