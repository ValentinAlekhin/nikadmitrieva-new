<template>
  <div class="Default">
    <Header />
    <main class="container">
      <Nuxt />

      <drawer />

      <div class="Default_Buttons">
        <button class="Default_DrawerBtn" @click="toggleDrawer">
          <ui-icons-burger-menu class="Default_DrawerIcon" :open="drawer" />
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('header', ['drawer']),
  },
  methods: {
    ...mapActions('header', ['toggleDrawer']),
  },
}
</script>

<style scoped lang="scss">
.Default {
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr max-content;

  &_Buttons {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  &_DrawerBtn {
    background: #fff;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    box-shadow: -3px 2px 8px 0px rgba(0, 0, 0, 0.07);

    @include md {
      display: none;
    }
  }

  &_DrawerIcon {
    width: 50%;
    height: 50%;

    &.rotate {
      transform: rotate(45deg);
    }
  }
}
</style>
