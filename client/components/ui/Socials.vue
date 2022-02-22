<template>
  <ul class="Socials">
    <li v-for="link of data.socials" :key="link.to">
      <a :href="link.to" class="Socials_Link">
        <component
          :is="`ui-icons-${link.component}`"
          class="Socials_Icon"
          :class="{ drawer }"
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

  &_Icon {
    margin: 0 5px;
    width: 20px;
    height: 20px;
    fill: #404044;
    transition: all 0.3s;

    &.drawer {
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }

    &:hover {
      fill: #8f8f8e;
    }
  }
}
</style>
