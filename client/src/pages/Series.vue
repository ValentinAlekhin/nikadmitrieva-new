<template>
  <div class="home-page">
    <h2 class="HomeTitle">series</h2>
    <div class="CardsWrapper">
      <ResponsiveImg v-for="img in images" :img="img" :key="img._id" />
    </div>
  </div>
</template>

<script>
import ResponsiveImg from '../components/ResponsiveImg'

export default {
  components: { ResponsiveImg },
  computed: {
    images() {
      return this.$store.getters.allImagesInSeries(this.$route.params.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 2000px;
  .HomeTitle {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  .CardsWrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 400px;
    grid-gap: 1rem;
  }
}
</style>
