<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="4" v-for="el in series" :key="el._id">
        <SeriesCard :series="el" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SeriesCard from '../components/SeriesCard'

export default {
  components: {
    SeriesCard,
  },
  data() {
    return {}
  },
  computed: {
    series() {
      return this.$store.getters.series
    },
  },
}
</script>

<style lang="sass" scoped></style>
