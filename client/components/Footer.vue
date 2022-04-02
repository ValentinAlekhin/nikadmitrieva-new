<template>
  <footer class="Footer">
    <span class="Footer_Developer">
      Developed by
      <a class="Footer_DeveloperLink" target="_blank" :href="data.developer">
        valentin alekhin
      </a>
    </span>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('footer', ['data']),
  },
}
</script>

<style lang="scss" scoped>
.Footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  &_Developer {
    color: #404044;
    font-size: 14px;
  }

  &_DeveloperLink {
    text-transform: uppercase;
    color: #404044;
    text-decoration: underline;

    &:hover {
      color: #8f8f8e;
    }
  }
}
</style>
