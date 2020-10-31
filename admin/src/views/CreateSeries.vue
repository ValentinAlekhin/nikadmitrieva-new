<template>
  <v-container>
    <v-layout class="justify-center">
      <v-flex xs12 md10 lg8>
        <h2 class="text--secondary mb-3 text-center">Создание новой серии</h2>
        <form>
          <v-container fluid>
            <v-row>
              <v-col cols="12" xs="12" lg="6">
                <v-text-field
                  v-model="title"
                  type="text"
                  :error-messages="titleErrors"
                  label="Title"
                  required
                  @blur="$v.title.$touch()"
                />
              </v-col>
              <v-col cols="12" xs="12" lg="6">
                <v-text-field
                  v-model="url"
                  type="text"
                  :error-messages="urlErrors"
                  label="Url"
                  required
                  @blur="$v.url.$touch()"
                />
              </v-col>
              <v-col cols="12" xs="12">
                <v-textarea
                  v-model="description"
                  type="text"
                  :error-messages="descriptionErrors"
                  label="Description"
                  required
                  :counter="200"
                  multi-line
                  @blur="$v.description.$touch()"
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
import { require } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      title: '',
      url: 'nikadmitrieva/series/',
      description: '',
    }
  },
}
</script>
