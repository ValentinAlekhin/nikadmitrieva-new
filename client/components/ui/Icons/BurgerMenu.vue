<template>
  <div class="BurgerMenu">
    <span class="BurgerMenu_Top" :class="{ open }" />
    <span class="BurgerMenu_Center" :class="{ open }" />
    <span class="BurgerMenu_Bottom" :class="{ open }" />
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.BurgerMenu {
  position: relative;
  transition: all ease 0.2s;

  &_Top,
  &_Center,
  &_Bottom {
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    height: 15%;
    border-radius: 2px;
    transition: all ease 0.2s;
  }

  &_Top,
  &_Bottom {
    &.open {
      width: 100%;
    }
  }

  &_Top {
    top: 0;

    &.open {
      transform: rotate(45deg) translate(28%, 206%);
    }
  }

  &_Center {
    top: 50%;
    transform: translateY(-50%);

    &.open {
      opacity: 0;
    }
  }

  &_Bottom {
    bottom: 0;

    &.open {
      transform: rotate(-45deg) translate(29%, -200%);
    }
  }
}
</style>
