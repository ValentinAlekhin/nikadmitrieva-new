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
        <span class="Contact_Icon" v-html="link.svg" />
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
  mounted() {
    console.log(this.data)
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
    flex-wrap: wrap;
  }

  &_Link {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
    margin: 20px;
  }

  &_Icon {
    display: block;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }

  &_Desc {
    font-size: 16px;
    font-weight: 400;
    color: #404044;
    text-align: center;
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
