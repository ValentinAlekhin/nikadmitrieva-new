<template>
  <div class="error">
    <div class="error_content">
      <span class="error_code">{{ error.statusCode }}</span>
      <span class="error_message">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    message: (vm) =>
      vm.error.statusCode === 404 ? 'Page not found' : 'Server error',
  },
}
</script>

<style scoped lang="scss">
.error {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &_code {
    font-size: 40px;
    font-weight: bold;
  }

  &_message {
    font-weight: 400;
    color: #404044;
  }
}
</style>
