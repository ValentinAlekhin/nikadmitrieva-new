<template>
  <div class="ResponsiveImg">
    <picture>
      <source :srcSet="webpSrcset" type="image/webp" />
      <source :srcSet="jpegSrcset" type="image/jpeg" />
      <img :src="img.jpeg[0].src" :alt="alt" class="ResponsiveImg__Image" />
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: Object,
      reuqire: true,
    },
    alt: {
      type: String,
      reuqire: true,
    },
  },
  computed: {
    jpegSrcset() {
      return this.img.jpeg
        .map(({ src, width }) => `${src} ${width}w`)
        .join(',\n')
    },
    webpSrcset() {
      return this.img.webp
        .map(({ src, width }) => `${src} ${width}w`)
        .join(',\n')
    },
  },
}
</script>

<style lang="scss" scoped>
.ResponsiveImg {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__Image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
