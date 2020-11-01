<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    />

    <v-card-text>
      <v-select
        :items="items"
        label="Order"
        v-model="order"
        outlined
        hide-details
      />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn color="orange lighten-2" text>
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
      description: '',
      order: 1,
      items: [1, 2, 3, 4],
      show: false,
    }
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
}
</script>
