<template>
  <div class="Drawer" :class="{ open: drawer }">
    <ul class="Drawer_Links">
      <li v-for="link of data.links" :key="link.to" class="Drawer_LinkItem">
        <nuxt-link
          class="Drawer_Link"
          :to="link.to"
          active-class="active"
          exact
          @click.native="toggleDrawer"
        >
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>

    <ui-socials drawer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('header', ['drawer', 'data']),
  },
  methods: {
    ...mapActions('header', ['toggleDrawer']),
  },
}
</script>

<style lang="scss" scoped>
.Drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  transition: all 0.3s;
  transform: translateX(100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @include md {
    display: none;
  }

  &.open {
    transform: translateX(0);
  }

  &_Links {
    margin-bottom: 60px;
  }

  &_LinkItem {
    text-align: center;
    margin-bottom: 20px;
  }

  &_Link {
    font-size: 26px;
    font-weight: 400;
    color: #404044;

    &.active {
      color: #8f8f8e;
    }

    &:hover {
      color: #8f8f8e;
    }
  }
}
</style>
