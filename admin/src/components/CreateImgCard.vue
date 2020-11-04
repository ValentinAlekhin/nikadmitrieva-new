<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="src" height="200px" />

    <v-card-text>
      <v-select
        v-if="items.length !== 1"
        :items="items"
        label="Order"
        v-model="order"
        outlined
        hide-details
        @change="onOrderChange"
      />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn color="orange lighten-2" @click="onRemove" text>
        Удалить
      </v-btn>

      <v-spacer />

      <v-btn icon @click="onShow">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text>
          <v-textarea
            v-model="description"
            type="text"
            :error-messages="descriptionErrors"
            label="Description"
            required
            :counter="200"
            multi-line
            outlined
            @input="onInput()"
          />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      order: this.index + 1,
    }
  },

  props: ['index'],

  validations: {
    description: { minLen: minLength(10) },
  },

  methods: {
    onRemove() {
      this.$store.commit('removeSeriesImage', this.index)
    },

    onOrderChange() {
      this.$store.commit('changeSeriesImageOrder', {
        index: this.index,
        order: this.order,
      })
    },

    onShow() {
      this.$store.commit('setSeriesImageShow', {
        index: this.index,
        show: !this.show,
      })
    },

    onInput() {
      this.$v.description.$touch()

      this.$store.commit('setSeriesImageValid', {
        index: this.index,
        valid: !this.$v.$invalid,
      })
    },
  },

  computed: {
    src() {
      return this.$store.getters.seriesImagesSrc(this.index)
    },

    items() {
      return this.$store.getters.seriesSelectItems
    },

    description: {
      get() {
        return this.$store.getters.seriesImageDescription(this.index)
      },
      set(value) {
        this.$store.commit('setSeriesImageDescription', {
          index: this.index,
          description: value,
        })
      },
    },

    show() {
      return this.$store.getters.seriesImageShow(this.index)
    },

    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.minLen &&
        errors.push('Минимальная длинна описания 10 символов')
      return errors
    },
  },

  updated() {
    this.order = this.index + 1
  },
}
</script>
