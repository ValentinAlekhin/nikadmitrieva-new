<template>
  <component :is="tag" class="vHtml" v-html="html" />
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    html: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    links: [],
  }),
  mounted() {
    this.findLinks()
    this.addLinksListener()
  },
  beforeDestroy() {
    this.removeLinksListener()
  },
  methods: {
    findLinks() {
      this.links = [...document.querySelectorAll('.vHtml a')].filter(
        (link) => link.path && link.path[0] === '/'
      )
    },
    addLinksListener() {
      this.links.forEach((link) =>
        link.addEventListener('click', this.linkListener)
      )
    },
    removeLinksListener() {
      this.links.forEach((link) =>
        link.removeEventListener('click', this.linkListener)
      )
    },
    linkListener(e) {
      e.preventDefault()
      this.$router.push(e.target.pathname)
    },
  },
}
</script>

<style lang="scss">
.vHtml {
  color: #404044;

  p {
    margin-bottom: 20px;
    font-size: 16px;
  }

  a {
    text-decoration: underline;
    color: #0081a7;
  }
}
</style>
