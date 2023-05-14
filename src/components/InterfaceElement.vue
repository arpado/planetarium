<template>
  <!-- data-augmented-ui="tl-clip tr-clip br-clip bl-clip both" -->
  <div class="container" v-if="mainStore.showPlanetCards">
    <!-- <div data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"> -->
    <div
      v-for="(planet, index) in planetStore.planetList"
      :key="index"
      data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
      class="planet-container"
    >
      <span>{{ planet.name }}</span>
      <!-- <button @click="planet.value = !planet.value">{{ planet.value? 'close' : 'open' }}</button> -->
      <button @click="planet.value = !planet.value">open</button>
      <!-- <div :class="[{ invisible: !planet.value }, {visible: planet.value }]"> -->
      <div v-if="planet.value">
        <div class="flex justify-between items-center">
          <label :for="`planet-scale-${index}`">Size</label>
          <input
            class="w-10 h-fit"
            :id="`planet-scale-${index}`"
            type="number"
            step=".1"
            v-model="planet.size.scale"
          />
        </div>
        <div class="flex justify-between items-center">
          <label :for="`planet-distance-${index}`">Distance from star</label>
          <input
            class="w-10 h-fit"
            :id="`planet-distance-${index}`"
            type="number"
            v-model="planet.radius"
          />
        </div>
        <div class="flex justify-between items-center">
          <label :for="`planet-rotation-offset-${index}`">Orbital rotation offset</label>
          <input
            class="w-10 h-fit"
            :id="`planet-rotation-offset-${index}`"
            type="number"
            v-model="planet.rotation"
          />
        </div>
      </div>
    </div>
    <!-- </div> -->
    <button @click="planetStore.addPlanet">new planet</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { usePlanetStore } from '@/stores/planetStore.js'
import { useMainStore } from '@/stores/mainStore.js'

// access the `store` variable anywhere in the component ✨
const planetStore = usePlanetStore()
const mainStore = useMainStore()

const elements = ref([])
const addElement = () => {
  elements.value.push(ref(false))
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 110px;
  right: 10px;
  width: 200px;
  height: calc(100vh - 350px);
  overflow-y: scroll;
  /* background: rgb(221, 217, 213); */
  /* padding: 1rem; */
}
.planet-container {
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  color: white;
}
input {
  color: black;
}
button {
  margin: 10px auto;
}
.invisible {
    height: 0;
}
.visible {
    height: fit-content;
}
</style>