<template>
  <VueDragResize class="drag-wrap" :x="getX" :y="110" v-if="mainStore.showPlanetCards">
      <div
        class="star-container flex flex-col items-end"
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip border"
      >
        <div class="star" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both">
          <span>Sun</span>
        </div>

        <div class="planet-container">
          <div
            v-for="(planet, index) in planetStore.planetList"
            :key="index"
            @click="planet.value = !planet.value"
            class="planet-container-item flex flex-col items-end"
            data-augmented-ui="tl-clip tr-clip br-clip bl-clip border"
          >
            <div class="planet" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both">
              <span>{{ planet.name }}</span>
              <SetupElement :item="planet" :index="index" v-if="planet.value" />
            </div>

            <div
              v-for="(moon, index) in planet.moons"
              :key="index"
              class="moon"
              data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
              @click="moon.value = !moon.value"
            >
              <span>{{ moon.name }}</span>
              <SetupElement :item="moon" :index="index" v-if="moon.value" />
            </div>
          </div>
        </div>
      </div>
  </VueDragResize>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import VueDragResize from 'vue-drag-resize/src/component/vue-drag-resize.vue'

import SetupElement from './SetupElement.vue'

import { usePlanetStore } from '@/stores/planetStore.js'
import { useMainStore } from '@/stores/mainStore.js'
// access the `store` variable anywhere in the component ✨
const planetStore = usePlanetStore()
const mainStore = useMainStore()

const elements = ref([])
const addElement = () => {
  elements.value.push(ref(false))
}
const { width, height } = useWindowSize()
const getX = computed(() => {
  return width.value - 250
})
</script>

<style scoped>
.star-container-item,
.planet-container-item {
  --aug-inlay-all: 0px;
  margin-bottom: 0.5rem;
  width: fit-content;
}
.planet-container {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: flex-end;
}
.drag-wrap{
  color: white;
  overflow-y: scroll;
}
.star {
  width: 100%;
  height: 50px;
  color: white;
  margin-bottom: 0.5rem;
  padding: 1rem;
}
.planet {
  padding: 1rem;
  /* margin: 0.5rem 0; */
  display: flex;
  flex-direction: column;
  color: white;
  /* width: 100px;
  height: 100px; */
  height: fit-content;
  width: 165px;
  min-height: 50px;
  /* display: flex;
  flex-direction: column;
  align-items: flex-end; */
}
.moon {
  padding: 1rem;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  color: white;
  /* width: 100px;
  height: 100px; */
  height: fit-content;
  width: 105px;
  min-height: 50px;
  /* display: flex;
  flex-direction: column;
  align-items: flex-end; */
}

.invisible {
  height: 0;
}
.visible {
  height: fit-content;
}
</style>