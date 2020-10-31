<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="''" height="200px" />

    <v-card-title v-text="series.title" />

    <v-card-subtitle v-text="'Просмотров: ' + series.clicks" />

    <v-card-actions>
      <v-btn color="orange lighten-2" text>
        Редактировать
      </v-btn>

      <v-spacer />

      <v-btn icon @click="show = !show" v-if="series.description">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text>
          {{ series.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ['series'],
  data: () => ({
    show: false,
  }),
}
</script>
