<template>
  <div class="Contact">
    <div class="Contact_Content">
      <a
        v-for="link of data.socials"
        :key="link.url"
        :href="link.url"
        :target="link.target"
        class="Contact_Link"
      >
        <api-svg class="Contact_Icon" :svg="link.svg" :scale="link.scale" />
        <span class="Contact_Desc">{{ link.description }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  computed: {
    ...mapState('header', ['data']),
    pageTitle: () => 'Contact',
  },
}
</script>

<style lang="scss" scoped>
.Contact {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  * {
    transition: all ease 0.2s;
  }

  &_Content {
    justify-content: center;
    display: flex;
    flex-direction: column;

    @include md {
      flex-wrap: wrap;
      flex-direction: row;
    }
  }

  &_Link {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
    margin: 20px 20px 100px;

    @include md {
      margin: 100px 70px;
    }

    &:hover .Contact_Desc {
      opacity: 1;
    }
  }

  &_Icon {
    display: block;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;

    @include md {
      margin-bottom: 0;
    }
  }

  &_Desc {
    min-width: 200px;
    position: static;
    font-size: 16px;
    font-weight: 400;
    color: #404044;
    text-align: center;
    opacity: 1;
    transition: all ease 0.3s;

    @include md {
      top: 80px;
      position: absolute;
      opacity: 0;
    }
  }
}
</style>

<style lang="scss">
.Contact {
  &_Link {
    &:hover svg {
      fill: #000 !important;
      transform: scale(1.1);
    }
  }

  &_Icon {
    svg {
      transition: all ease 0.2s;
      width: 100%;
      height: 100%;
      fill: #404044;
    }
  }
}
</style>
