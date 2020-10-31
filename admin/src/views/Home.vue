<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 v-for="el in series" :key="el.id">
        <SeriesCard series="el" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SeriesCard from '../components/SeriesCard'

export default {
  components: {
    SeriesCard,
  },
  data() {
    return {
      series: [],
    }
  },
}
</script>

<style lang="sass" scoped></style>
