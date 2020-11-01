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
      <v-btn color="orange lighten-2" @click="remove" text>
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
            @input="onDescChange"
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
      show: !!this.description,
      src: '',
      order: this.index + 1,
      description: '',
    }
  },

  props: ['img', 'items', 'index'],

  methods: {
    remove() {
      this.$emit('remove-img', this.index)
    },

    onOrderChange() {
      this.$emit('change-order', { order: this.order, index: this.index })
    },

    onDescChange() {
      this.$emit('change-desc', {
        description: this.description,
        index: this.index,
      })
    },

    getImageUrl() {
      const reader = new FileReader()
      reader.onload = e => (this.src = reader.result)
      reader.readAsDataURL(this.img)
    },
  },

  validations: {
    description: { minLen: minLength(10) },
  },

  computed: {
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.minLen &&
        errors.push('Минимальная длинна описания 10 символов')
      return errors
    },
  },

  created() {
    this.getImageUrl()
  },

  updated() {
    this.getImageUrl()
    this.order = this.index + 1
    this.description = this.img.description
  },
}
</script>
