<template>
  <div class="wrapper">
    <div class="container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both">
      <div class="close-container">x</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.container {
  position: relative;
  width: 80vw;
  height: 80vh;
  padding: 1rem;
}
.close-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>