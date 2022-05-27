<template>
  <div class="About">
    <div class="About_Content">
      <image-card v-if="data.image" class="About_Image" :image="data.image" />
      <div class="About_Text" v-html="data.textHtml" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import meta from '~/mixins/meta'

export default {
  mixins: [meta],
  computed: {
    ...mapState('about', ['data']),
    pageTitle: () => 'About',
  },
}
</script>

<style lang="scss" scoped>
.About {
  height: 100%;

  @include md {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_Content {
    @include md {
      width: 80%;
    }

    @include xl {
      width: 70%;
    }

    @include xxl {
      width: 50%;
    }
  }

  &_Image {
    margin-top: 5px;
    margin-right: 30px;
    margin-bottom: 30px !important;
    float: left;
    width: 100%;

    @include md {
      margin-bottom: 0;
    }

    @include xl {
      width: 50%;
    }

    @include xl {
      width: 40%;
    }
  }
}
</style>

<style lang="scss">
.About {
  &_Text {
    color: #404044;

    p {
      margin-bottom: 20px;
      font-size: 16px;
    }

    a {
      text-decoration: underline;
    }
  }
}
</style>
