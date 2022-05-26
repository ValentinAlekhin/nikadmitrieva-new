<template>
  <ul class="Socials">
    <li v-for="link of data.socials" :key="link.url">
      <a :href="link.url" class="Socials_Link" :target="link.target">
        <api-svg
          class="Socials_Icon"
          :class="{ drawer }"
          :svg="link.svg"
          :scale="link.scale"
        />
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    drawer: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState('header', ['data']),
  },
}
</script>

<style scoped lang="scss">
.Socials {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_Link {
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="scss">
.Socials {
  &_Icon {
    margin: 0 5px;
    width: 20px;
    height: 20px;

    svg {
      fill: #404044;
      transition: all 0.3s;

      &:hover {
        fill: #8f8f8e;
      }
    }

    &.drawer {
      margin: 0 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
