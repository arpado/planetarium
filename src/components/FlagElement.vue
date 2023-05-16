<template>
  <div class="line">
    <div
      class="flag-container"
      data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
      style="--aug-border-y: 1px; --aug-border-x: 1px"
    >
      <p v-if="name">{{ name }}</p>
      <!-- <p v-else>Undefinied</p> -->
    </div>
  </div>
</template>

<script>
// v-if="mainStore.showFlags"
// import { useMainStore } from '@/stores/mainStore.js'

export default {
  props: ['name'],
//   setup() {
//     const mainStore = useMainStore()
//     return { mainStore }
//   }
}
</script>

<style >
.flag-container {
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  color: white;
  transform: translateY(-100px);
  --aug-border-all: 1px;
  --aug-border-bg: blue;
  position: relative;
  overflow: visible;
}
.line::after {
  content: '';
  width: 1px;
  height: 74px;
  position: absolute;
  top: calc(-100% + 6px);
  left: 50%;
  /* transform: translate(-50%, 0%); */
  background: white;
}
</style>