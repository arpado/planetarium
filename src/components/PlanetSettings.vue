<template>
  <div
    class="container"
    data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
    v-if="planetStore.itemOnMod"
  >
    <span>{{ planetStore.itemOnMod.name }}</span>
    <!-- <button @click="planet.value = !planet.value">open</button> 
      <div v-if="planet.value"> -->
    <div class="flex justify-between items-center">
      <label :for="`planet-scale`">Size</label>
      <input
        class="w-10 h-fit"
        :id="`planet-scale`"
        type="number"
        step=".1"
        v-model="planetStore.itemOnMod.size.scale"
      />
    </div>
    <div class="flex justify-between items-center">
      <label :for="`planet-distance-`">Distance from star</label>
      <input
        class="w-10 h-fit"
        :id="`planet-distance`"
        type="number"
        v-model="planetStore.itemOnMod.radius"
      />
    </div>
    <div class="flex justify-between items-center">
      <label :for="`planet-rotation-offset`">Orbital rotation offset</label>
      <input
        class="w-10 h-fit"
        :id="`planet-rotation-offset`"
        type="number"
        v-model="planetStore.itemOnMod.rotation"
        min="0"
        max="360"
      />
    </div>

    <button @click="planetStore.addPlanet">new planet</button>

    <div @click="planetStore.togglePlanetSettings(planetStore.itemOnMod)">close</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { usePlanetStore } from '@/stores/planetStore.js'
import { useMainStore } from '@/stores/mainStore.js'

const planetStore = usePlanetStore()
const mainStore = useMainStore()
</script>

<style scoped>
.container {
  width: 300px;
  height: 500px;
  position: absolute;
  top: 100px;
  left: 15px;
  color: white;
}
</style>