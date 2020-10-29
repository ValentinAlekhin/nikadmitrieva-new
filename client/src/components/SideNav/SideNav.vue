<template>
  <div>
    <div class="side-nav" :class="{ 'side-nav__open': isOpen }">
      <div class="side-nav__close">
        <div class="close__area" @click="$store.commit('closeSideNav')" />
        <svg
          height="329pt"
          viewBox="0 0 329.26933 329"
          width="329pt"
          xmlns="http://www.w3.org/2000/svg"
          class="close__icon"
        >
          <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
          />
        </svg>
      </div>
      <nav class="side-nav__nav">
        <ul class="nav__list">
          <router-link
            tag="li"
            class="nav__item"
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            exact
            active-class="nav__item__active"
          >
            <a
              :href="link.url"
              class="nav__link"
              @click="$store.commit('closeSideNav')"
            >
              {{ link.title }}
            </a>
          </router-link>
        </ul>
      </nav>
    </div>
    <Backdrop v-if="isOpen" @click="$store.commit('closeSideNav')" />
  </div>
</template>

<script>
import Backdrop from '../Backdrop'
import Close from './close.svg'

export default {
  components: {
    Backdrop,
    Close,
  },
  computed: {
    links() {
      return this.$store.state.static.links
    },
    isOpen() {
      return this.$store.state.sideNav.isOpen
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log('leave')
  },
  beforeRouteUpdate(to, from, next) {
    console.log('update')
  },
}
</script>
<style lang="scss" scoped>
@import '../../scss/style.scss';

.side-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -80%;
  width: 80%;
  background-color: rgba(48, 48, 48, 0.97);
  transition: all 0.4s ease-in-out;
  z-index: 100;
  padding: 40px;
  text-align: right;

  @include sm {
    display: none;
  }

  &__close {
    margin-bottom: 30px;
    position: relative;

    .close__area {
      position: absolute;
      top: -9px;
      right: -9px;
      height: 40px;
      width: 40px;
      z-index: 110;
    }

    .close__icon {
      height: 20px;
      width: 20px;
      fill: rgba(255, 255, 255, 0.6);
    }
  }

  &__nav {
    .nav__list {
      .nav__item {
        margin-bottom: 20px;

        .nav__link {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          font-size: 20px;
        }
      }

      .nav__item__active {
        .nav__link {
          color: #fff;
        }
      }
    }
  }
}

.side-nav__open {
  right: 0;
}
</style>
