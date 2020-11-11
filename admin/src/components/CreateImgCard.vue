<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="src" height="200px" class="image">
      <div class="progress_container" v-if="loading">
        <v-progress-circular
          v-if="progress !== 100 && progress !== true"
          class="progress"
          :rotate="360"
          :size="150"
          :width="15"
          :value="progress"
        >
          {{ progress }}
        </v-progress-circular>

        <v-progress-circular
          v-else-if="progress === 100"
          class="progress"
          :size="150"
          :width="15"
          indeterminate
        />

        <v-alert
          v-else-if="progress === true"
          color="green"
          type="success"
          class="progress"
        >
          Изображение загружено
        </v-alert>
      </div>
    </v-img>

    <v-card-text>
      <v-select
        v-if="items.length !== 1"
        :items="items"
        :disabled="loading"
        label="Order"
        v-model="order"
        outlined
        hide-details
        @change="onOrderChange"
      />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        @click="onRemove"
        text
        :disabled="loading"
      >
        Удалить
      </v-btn>

      <v-spacer />

      <v-btn icon @click="onShow" :disabled="loading">
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
            :disabled="loading"
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

    loading() {
      return this.$store.getters.loading
    },

    progress() {
      return this.$store.getters.seriesImageProgress(this.index)
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

<style lang="scss" scoped>
.progress_container {
  position: relative;
  height: 100%;

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
