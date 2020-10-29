<template>
  <div class="res-img">
    <picture>
      <source :srcSet="webp" type="image/webp" />
      <source :srcSet="jpeg" type="image/jpeg" />
      <img :src="base" :alt="alt" />
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
  computed: {},
}
</script>
