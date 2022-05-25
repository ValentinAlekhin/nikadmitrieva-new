<template>
  <ul class="Socials">
    <li v-for="link of data.socials" :key="link.url">
      <a
        :href="link.url"
        class="Socials_Link"
        :class="{ drawer }"
        :target="link.target"
        v-html="link.svg"
      />
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
  &_Link {
    svg {
      margin: 0 5px;
      width: 20px;
      height: 20px;
      fill: #404044;
      transition: all 0.3s;

      &:hover {
        fill: #8f8f8e;
      }
    }

    &.drawer svg {
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }
  }
}
</style>
