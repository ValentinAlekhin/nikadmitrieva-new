<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          text
          :disabled="loading"
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Удаление серии
        </v-card-title>
        <v-card-text
          >Серия и все входящие в нее фото будут удалены навсегда</v-card-text
        >
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteSeries">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async deleteSeries() {
      try {
        await this.$store.dispatch('deleteSeries', this.id)
        this.dialog = false
      } catch (e) {
        throw new Error(e)
      }
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>
