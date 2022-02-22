<template>
  <div class="Default">
    <Header />
    <main class="container">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.Default {
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
}
</style>
