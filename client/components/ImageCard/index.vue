<template>
  <component
    :is="component"
    ref="card"
    :to="link"
    class="ImageCard"
    :style="style"
  >
    <picture class="ImageCard_Picture">
      <source :srcset="srcSet" type="image/jpeg" />

      <img
        class="ImageCard_Image"
        :src="image.url"
        :alt="image.alternateText"
        @load="loaded = true"
      />
    </picture>

    <img
      class="ImageCard_Preview"
      :class="{ hide: loaded }"
      :src="image.placeholder"
      :alt="`${image.alternateText} placeholder`"
    />

    <div v-if="link" class="ImageCard_Overlay">
      <h4 class="ImageCard_Title">{{ title }}</h4>

      <ui-icons-arrow class="ImageCard_ArrowIcon" />

      <span class="ImageCard_IconContainer">
        <ui-icons-plus class="ImageCard_Icon" />
      </span>
    </div>
  </component>
</template>

<script>
import { getSrcSetByFormats } from '~/helpers/helpers'

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
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    loaded: false,
    width: null,
  }),
  computed: {
    component: (vm) => (vm.link ? 'nuxt-link' : 'div'),
    srcSet: (vm) => getSrcSetByFormats(vm.image.formats),
    aspectRatio: (vm) => vm.image.width / vm.image.height,
    style: (vm) => ({
      height: vm.width ? `${vm.width / vm.aspectRatio}px` : 'auto',
    }),
  },
  mounted() {
    this.setHeight()

    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      if (!this.$refs) return

      const { card } = this.$refs
      if (!card) return

      const element = card?.$el ?? card
      if (!element) return

      this.width = element.offsetWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.ImageCard {
  display: block;
  position: relative;
  overflow: hidden;

  &:hover {
    .ImageCard_Image {
      transform: scale(1.05);
    }
  }

  * {
    transition: all ease 0.3s;
  }

  &_Picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &_Image {
    position: absolute;
  }

  &_Image,
  &_Preview {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &_Preview {
    position: relative;
    transition: all 0.3s;

    &.hide {
      opacity: 0;
    }
  }

  &_Overlay {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    @include md {
      display: block;
      height: auto;
      top: -15%;
      left: -15%;
      right: -15%;
      bottom: -15%;
      background: rgba(64, 64, 68, 0.7);
      opacity: 0;
      transform: scale(0.9);
      padding: 0;

      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &_Title {
    color: #fff;
    font-size: 20px;
    font-weight: 600;

    @include md {
      position: absolute;
      bottom: calc(15% + 10px);
      left: calc(15% + 10px);
    }
  }

  &_ArrowIcon {
    fill: #fff;
    height: 20px;
    width: 20px;
    transform: rotate(90deg);

    @include md {
      display: none;
    }
  }

  &_IconContainer {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: #404044;
    width: 55px;
    height: 55px;

    @include md {
      display: flex;
    }
  }

  &_Icon {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
}
</style>
