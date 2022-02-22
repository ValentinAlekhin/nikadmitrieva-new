<template>
  <header class="Header">
    <div class="Header_Content container">
      <h1 class="Header_Title">
        <nuxt-link class="Header_TitleLink" to="/">{{ data.title }}</nuxt-link>
      </h1>

      <div class="Header_NavSocials">
        <nav class="Header_Nav">
          <ul class="Header_NavList">
            <li
              v-for="link of data.links"
              :key="link.to"
              class="Header_NavItem"
            >
              <nuxt-link
                class="Header_NavLink"
                :to="link.to"
                active-class="active"
                exact
              >
                {{ link.title }}
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <ui-socials />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('header', ['data']),
  },
}
</script>

<style lang="scss" scoped>
.Header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;

  &_Content {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include md {
      justify-content: space-between;
    }
  }

  &_Title {
    padding-bottom: 6px;
  }

  &_TitleLink {
    font-weight: 600;
    font-size: 26px;
    color: #404044;

    &:hover {
      color: #8c8c8e;
    }
  }

  &_NavSocials {
    display: none;
    justify-content: center;
    align-items: center;

    @include md {
      display: flex;
    }
  }

  &_Nav {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  &_NavList {
    display: flex;
    align-items: center;
  }

  &_NavItem {
    margin-left: 1rem;
  }

  &_NavLink {
    font-size: 14px;
    font-weight: 400;
    color: #404044;

    &.active {
      color: #8f8f8e;
    }

    &:hover {
      color: #8f8f8e;
    }
  }
}
</style>
