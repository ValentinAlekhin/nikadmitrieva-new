<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="src" height="200px" />

    <v-card-text>
      <v-select
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

      <v-btn icon @click="show = !show">
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
            @blur="$v.description.$touch()"
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
      src: '',
      show: false,
    }
  },

  props: ['index'],

  validations: {
    description: { minLen: minLength(10) },
  },

  methods: {
    setImgUrl() {
      const reader = new FileReader()
      reader.onload = () => (this.src = reader.result)
      reader.readAsDataURL(this.$store.state.series.files[this.index])
    },

    setShow() {
      this.show = this.$store.state.series.files[this.index].show
    },

    onRemove() {
      this.$store.commit('removeSeriesFile', this.index)
    },

    onOrderChange() {
      this.$store.commit('changeSeriesFileOrder', {
        index: this.index,
        order: this.order,
      })
    },

    onShow() {
      this.$store.commit('setSeriesFileShow', {
        index: this.index,
        show: !this.show,
      })
    },
  },

  computed: {
    description: {
      get() {
        return this.$store.state.series.files[this.index].description || ''
      },
      set(value) {
        this.$store.commit('setSeriesFileDescription', {
          index: this.index,
          description: value,
        })
      },
    },

    items() {
      return this.$store.getters.seriesSelectItems
    },

    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.minLen &&
        errors.push('Минимальная длинна описания 10 символов')
      return errors
    },
  },

  watch: {
    show() {
      console.log('show')
      this.$store.commit('setSeriesFileShow', {
        index: this.index,
        show: this.show,
      })
    },
  },

  created() {
    this.setImgUrl()
    this.setShow()
  },
  updated() {
    this.setImgUrl()
    this.setShow()
    this.order = this.index + 1
    this.description =
      this.$store.state.series.files[this.index].description || ''
    this.show = this.$store.state.series.files[this.index].show
  },
}
</script>
