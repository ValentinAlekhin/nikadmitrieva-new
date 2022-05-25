<template>
  <div class="About">
    <div class="About_Text" v-html="data.textHtml" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  computed: {
    ...mapState('about', ['data']),
    pageTitle: () => 'About',
  },
}
</script>

<style lang="scss" scoped>
.About {
  width: 50%;
  margin: 0 auto;
}
</style>

<style lang="scss">
.About {
  &_Text {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
