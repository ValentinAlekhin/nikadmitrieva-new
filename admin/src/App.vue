<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in links" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="onLogout" v-if="isUserLoggedIn">
            <v-list-item-icon>
              <v-icon v-text="'mdi-exit-to-app'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up" />
      <v-toolbar-title>
        <router-link tag="span" class="pointer" to="/">AddApp</router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="(item, i) of links" :to="item.url" :key="i">
          <v-icon left v-text="item.icon" />
          {{ item.title }}
        </v-btn>
        <v-btn text @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left v-text="'mdi-exit-to-app'" />
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <template v-if="error">
      <v-snackbar
        absolute
        bottom
        right
        :multi-line="true"
        :timeout="10000"
        :value="true"
        @input="closeError"
      >
        {{ error }}
        <v-btn color="indigo" text @click="closeError">
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      selectedItem: 1,
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note-plus', url: '/new' },
          {
            title: 'My ads',
            icon: 'mdi-format-list-bulleted-square',
            url: '/list',
          },
        ]
      }
      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        {
          title: 'Registration',
          icon: 'mdi-account-plus',
          url: '/registration',
        },
      ]
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
    onLogout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
