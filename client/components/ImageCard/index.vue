<template>
  <nuxt-link :to="link" class="ImageCard">
    <picture class="ImageCard_Picture">
      <source v-for="set of srcSets" :key='set.ext' :srcset="set.urls" :type="set.type" />
      <img
        class="ImageCard_Image"
        :src="image.url"
        :alt="image.alternateText"
      />
    </picture>

    <div class="ImageCard_Overlay">
      <h4 class="ImageCard_Title">{{ title }}</h4>
      <span class="ImageCard_IconContainer">
        <ui-icons-plus class="ImageCard_Icon" />
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import { getSrcSetsById } from '~/helpers/helpers'

export default {
  props: {
    type: {
      type: String,
      default: 'series',
    },
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    srcSets: (vm) => getSrcSetsById(vm.image.id)
  },
  mounted() {
    console.log(this.srcSets)
  }
}
</script>

<style lang="scss" scoped>
.ImageCard {
  display: block;
  position: relative;
  overflow: hidden;

  * {
    transition: all ease 0.3s;
  }

  &_Picture {
    display: block;
  }

  &_Image {
    object-fit: cover;
    width: 100%;
  }

  &_Overlay {
    position: absolute;
    top: -15%;
    left: -15%;
    right: -15%;
    bottom: -15%;
    background: rgba(64, 64, 68, 0.7);
    opacity: 0;
    transform: scale(0.9);

    &:hover {
      opacity: 1;
      transform: scale(1);
    }
  }

  &_Title {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    bottom: calc(15% + 10px);
    left: calc(15% + 10px);
  }

  &_IconContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: #404044;
    width: 55px;
    height: 55px;
  }

  &_Icon {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
}
</style>
