<template>
  <ul class="Socials">
    <li v-for="link of data.socials" :key="link.to">
      <a :href="link.to" class="Socials_Link">
        <component :is="`ui-icons-${link.component}`" class="Socials_Icon" />
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('navbar', ['data']),
  },
}
</script>

<style scoped lang="scss">
.Socials {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;

  &_Link {
    display: flex;
    align-items: center;
  }

  &_Icon {
    width: 20px;
    height: 20px;
    fill: #404044;
    transition: all 0.3s;
    &:hover {
      fill: #8f8f8e;
    }
  }
}
</style>
