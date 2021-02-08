<template>
  <v-card>
    <v-img :src="src" class="white--text align-end" height="200px">
      <v-card-title v-text="series.title"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-icon class="mr-1">
        mdi-eye
      </v-icon>
      <span class="subheading mr-2" v-text="series.clicks"></span>
      <v-icon class="mr-1">
        mdi-image
      </v-icon>
      <span class="subheading" v-text="imageCount"></span>
      <v-spacer></v-spacer>
      <DeletePopup :id="series._id" />
      <v-btn color="orange lighten-1" text>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DeletePopup from './DeletePopup.vue'

export default {
  components: { DeletePopup },
  props: ['series'],
  data: () => ({
    baseUrl: process.env.VUE_APP_BASE_URL,
  }),
  computed: {
    src() {
      return this.baseUrl + this.$store.getters.titleImage(this.series._id)
    },
    imageCount() {
      return this.$store.getters.allImagesInSeries(this.series._id).length
    },
  },
}
</script>
