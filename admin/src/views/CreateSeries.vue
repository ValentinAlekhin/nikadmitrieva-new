<template>
  <v-container>
    <v-layout class="justify-center">
      <v-flex xs12 lg10>
        <h2 class="text--secondary mb-3 text-center">Создание новой серии</h2>
        <form>
          <v-container fluid>
            <v-row>
              <v-col cols="12" xs="12" lg="6">
                <v-text-field
                  prepend-icon="mdi-format-title"
                  v-model="title"
                  type="text"
                  :error-messages="titleErrors"
                  label="Title"
                  required
                  outlined
                  @blur="$v.title.$touch()"
                />
              </v-col>
              <v-col cols="12" xs="12" lg="6">
                <v-text-field
                  prepend-icon="mdi-link"
                  placeholder="nikadmitrieva.ru/series/"
                  v-model="url"
                  type="text"
                  :error-messages="urlErrors"
                  label="Url"
                  required
                  outlined
                  @blur="$v.url.$touch()"
                />
              </v-col>
              <v-col cols="12" xs="12">
                <v-textarea
                  prepend-icon="mdi-text"
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
              </v-col>
              <v-col cols="12" xs="12">
                <v-file-input
                  v-model="files"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  chips
                  counter
                  multiple
                  show-size
                  outlined
                  truncate-length="50"
                  @change="onFileInput"
                />
              </v-col>
              <v-col
                cols="12"
                xs="12"
                sm="6"
                md="4"
                v-for="(file, i) in files"
                :key="i"
              >
                <CreateImgCard :index="i" @card-input="onCardInput" />
              </v-col>
              <v-col cols="12" xs="12">
                <v-btn
                  block
                  :disabled="invalid || $v.$invalid"
                  @click="onFormSubmit"
                >
                  Добавить серию
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import CreateImgCard from '../components/CreateImgCard'

export default {
  components: {
    CreateImgCard,
  },

  data() {
    return {
      invalid: true,
    }
  },

  validations: {
    title: { required, minLen: minLength(4) },
    url: { minLen: minLength(4) },
    description: { minLen: minLength(10) },
  },

  methods: {
    onCardInput() {
      this.validateFiles()
    },

    onFileInput() {
      this.validateFiles()
    },

    validateFiles() {
      const files = this.$store.state.series.files
      if (files.length) {
        for (const file of files) {
          if (!file.valid) {
            return (this.invalid = true)
          }
        }
        return (this.invalid = false)
      } else return (this.invalid = true)
    },

    onFormSubmit() {
      this.validateFiles()
      if (!this.invalid) {
        console.log('click')
      } else this.$store.commit('setError', 'Форма невалидна')
    },
  },

  computed: {
    title: {
      get() {
        return this.$store.state.series.title
      },
      set(value) {
        this.$store.commit('setSeriesTitle', value)
      },
    },

    url: {
      get() {
        return this.$store.state.series.url
      },
      set(value) {
        this.$store.commit('setSeriesUrl', value)
      },
    },

    description: {
      get() {
        return this.$store.state.series.description
      },
      set(value) {
        this.$store.commit('setSeriesDescription', value)
      },
    },

    files: {
      get() {
        return this.$store.state.series.files
      },
      set(value) {
        this.$store.commit('setSeriesFiles', value)
      },
    },

    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('Поле не может быть пустым')
      !this.$v.title.minLen &&
        errors.push('Минимальная длинна заголовка 4 символа')
      return errors
    },

    urlErrors() {
      const errors = []
      if (!this.$v.url.$dirty) return errors
      !this.$v.url.minLen && errors.push('Минимальная длинна ссылки 4 символа')
      return errors
    },

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
