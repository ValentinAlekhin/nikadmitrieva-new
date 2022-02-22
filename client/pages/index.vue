<template>
  <div class="Index">
    <masonry-grid :items="sortedItems">
      <template #item="{ item }">
        <image-card
          :image="item.images[0]"
          :title="item.title"
          :link="`/series/${item.id}`"
        />
      </template>
    </masonry-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import meta from '~/mixins/meta'

export default {
  name: 'IndexPage',
  mixins: [meta],
  computed: {
    ...mapGetters('series', ['sortedItems']),
  },
}
</script>

<style scoped lang="scss">
.Index {
}
</style>
