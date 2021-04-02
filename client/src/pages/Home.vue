<template>
  <div class="home-page">
    <h2 class="HomeTitle">
      All series
    </h2>
    <div class="CardsWrapper">
      <router-link
        v-for="card of seriesCards"
        :key="card._id"
        :to="`/series/${card._id}`"
      >
        <div class="Card">
          <ResponsiveImg :img="card.titleImage" :alt="card.title" />
          <h4 class="CardTitle" v-text="card.title" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ResponsiveImg from '../components/ResponsiveImg'

export default {
  components: { ResponsiveImg },
  computed: {
    seriesCards() {
      return this.$store.getters.seriesCards
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

    .Card {
      .CardTitle {
        text-align: center;
        margin-top: 1rem;
        font-size: 2rem;
      }
    }
  }
}
</style>
