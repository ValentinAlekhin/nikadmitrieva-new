<template>
  <div class="About">
    <div class="About_Text" v-html="data.textHtml" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('about', ['data']),
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
