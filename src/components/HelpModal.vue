<template>
  <div class="container" v-if="mainStore.showHelp">
    <ModalLayout>
      help
      <button @click="mainStore.toggleModal">close</button>
    </ModalLayout>
  </div>
</template>

<script setup>
import ModalLayout from '@/components/ModalLayout.vue'
import { useMainStore } from '@/stores/mainStore.js'
const mainStore = useMainStore()
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: fit-content;
  z-index: 999;
  /* background: white; */
}
</style>