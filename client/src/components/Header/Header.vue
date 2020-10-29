<template>
  <div>
    <div class="box" />
    <div class="header-container">
      <header class="header container box">
        <h1 class="header__logo-title">
          <router-link to="/" class="logo__link">
            {{ title }}
          </router-link>
        </h1>

        <nav class="header__nav">
          <ul class="nav__list">
            <router-link
              tag="li"
              v-for="link in links"
              :key="link.url"
              class="nav__item"
              :to="link.url"
              active-class="active"
              exact
            >
              <a
                :href="link.url"
                class="nav__link"
                @click="setPointer($event.target)"
                >{{ link.title }}</a
              >
            </router-link>
            <div class="nav__pointer" :style="pointerStyle" />
          </ul>
        </nav>

        <div class="header__menu" @click="$store.commit('openSideNav')">
          <img class="menu__icon" src="./menu.svg" alt="Menu" />
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    width: 0,
    left: 0,
  }),

  methods: {
    setPointer(el) {
      const { offsetWidth, offsetLeft } = el
      this.width = offsetWidth
      this.left = offsetLeft
    },
    openSideNav() {
      this.open
    },
  },

  computed: {
    links() {
      return this.$store.state.static.links
    },
    title() {
      return this.$store.state.static.title
    },
    pointerStyle() {
      return {
        width: this.width + 'px',
        left: this.left + 'px',
      }
    },
  },
  mounted() {
    const el = document.querySelectorAll('.nav__item.active .nav__link')[0]
    this.setPointer(el)
  },
}
</script>

<style scoped lang="scss">
@import '../../scss/style.scss';

.box {
  height: 60px;
}

.header-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;

  .header {
    display: flex;
    justify-content: center;
    position: relative;

    @include sm {
      justify-content: space-between;
    }

    &__logo-title {
      display: flex;
      align-items: center;
      line-height: 0;

      .logo__link {
        font-weight: 600;
        font-size: 26px;
        color: #404044;
        transition: color 0.2s ease-in-out;

        &:hover {
          color: #c6c6c7;
        }
      }
    }

    &__nav {
      display: none;

      @include sm {
        display: flex;
        align-items: center;
        position: relative;
      }

      .nav__list {
        display: flex;

        .nav__item {
          .nav__link {
            margin: 0 20px;
            font-size: 15px;
            font-weight: 400;
            color: #404044;
            transition: color 0.2s ease-in-out;

            &:hover {
              color: #c6c6c7;
            }
          }
        }
      }

      .nav__pointer {
        height: 1px;
        position: absolute;
        bottom: -1px;
        background: #000;
        transition: all 0.2s ease-in-out;
      }
    }

    &__menu {
      position: absolute;
      right: 0;
      top: 30%;

      @include sm {
        display: none;
      }

      .menu__icon {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
