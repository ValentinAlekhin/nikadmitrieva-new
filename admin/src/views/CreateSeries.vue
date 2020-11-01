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
                  @blur="onFileChange"
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
                <CreateImgCard
                  :items="items"
                  :img="file"
                  :index="i"
                  @remove-img="removeImg"
                  @change-order="changeOrder"
                  @change-desc="changeDesc"
                />
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
      title: '',
      url: '',
      description: '',
      files: [],
    }
  },

  methods: {
    onFileChange(event) {
      this.files = this.files.map((file, i) => {
        file.description = ''
        return file
      })
    },

    removeImg(index) {
      this.files.splice(index, 1)
    },

    changeOrder({ order, index }) {
      const img = this.files.splice(index, 1)
      this.files.splice(order - 1, 0, ...img)
    },

    changeDesc({ description, index }) {
      this.files[index].description = description
    },
  },

  validations: {
    title: { required, minLen: minLength(4) },
    url: { minLen: minLength(4) },
    description: { minLen: minLength(10) },
  },

  computed: {
    items() {
      return this.files.map((el, i) => i + 1)
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
