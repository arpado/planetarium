<template>
  <div class="container" v-show="showNavigation">
    <div class="rotation-container">
      <div
        data-augmented-ui=" bl-clip br-clip both"
        class="rotate-up"
        @pointerdown="press(emitAction, 'rotateCameraUp')"
        @pointerup="release"
      >
        <span>RL</span>
      </div>
      <!-- tl-round tr-round -->
      <div
        data-augmented-ui="tl-clip bl-clip both"
        class="rotate-right"
        @pointerdown="press(emitAction, 'rotateCameraRight')"
        @pointerup="release"
      >
        <span>RR</span>
      </div>
      <!-- tr-round br-round -->
      <div
        data-augmented-ui="tl-clip tr-clip both"
        class="rotate-down"
        @pointerdown="press(emitAction, 'rotateCameraDown')"
        @pointerup="release"
      >
        <span>RD</span>
      </div>
      <!-- bl-round br-round -->
      <div
        data-augmented-ui="tr-clip br-clip both"
        class="rotate-left"
        @pointerdown="press(emitAction, 'rotateCameraLeft')"
        @pointerup="release"
      >
        <span>RL</span>
      </div>
      <!-- tl-round bl-round -->
      <div
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        class="rotate-reset"
        @pointerdown="press(emitAction, 'restoreDefault')"
        @pointerup="release"
      >
        <span>Reset</span>
      </div>
    </div>
    <div class="center-container">
      <div class="speed-container">
        <div
          class="speed-slower"
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          @pointerdown="planetStore.rotationSpeed -= 1"
          @pointerup="release"
        >
          -
        </div>
        <div class="speed-actual" data-augmented-ui="tl-clip tr-clip br-clip bl-clip both">
          <input type="number" name="" id="" v-model="planetStore.rotationSpeed" inputmode="numeric"/>
        </div>
        <div
          class="speed-faster"
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          @pointerdown="planetStore.rotationSpeed += 1"
          @pointerup="release"
        >
          +
        </div>
      </div>

      <div class="zoom-container">
        <div
          class="zoom-in"
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          @pointerdown="press(emitAction, 'zoomIn')"
          @pointerup="release"
        >
          ZI
        </div>
        <div
          class="zoom-reset"
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          @pointerdown="press(emitAction, 'restoreDefault')"
          @pointerup="release"
        >
          reset
        </div>
        <div
          class="zoom-out"
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          @pointerdown="press(emitAction, 'zoomOut')"
          @pointerup="release"
        >
          ZO
        </div>
      </div>
    </div>

    <div class="pan-container">
      <div
        data-augmented-ui="bl-clip br-clip both"
        class="pan-up"
        @pointerdown="press(emitAction, 'panCameraUp')"
        @pointerup="release"
      >
        PU
      </div>
      <div
        data-augmented-ui="tl-clip bl-clip both"
        class="pan-right"
        @pointerdown="press(emitAction, 'panCameraRight')"
        @pointerup="release"
      >
        PR
      </div>
      <div
        data-augmented-ui="tl-clip tr-clip both"
        class="pan-down"
        @pointerdown="press(emitAction, 'panCameraDown')"
        @pointerup="release"
      >
        PD
      </div>
      <div
        data-augmented-ui="tr-clip br-clip both"
        class="pan-left"
        @pointerdown="press(emitAction, 'panCameraLeft')"
        @pointerup="release"
      >
        <span>PL</span>
      </div>
      <div
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        class="rotate-reset"
        @pointerdown="press(emitAction, 'restoreDefault')"
        @pointerup="release"
      >
        <span>Reset</span>
      </div>
    </div>
  </div>
  <div
    class="panel-toggler"
    data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
    @click="toggleNavigation"
  >
    toggle panel
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlanetStore } from '@/stores/planetStore.js'
const planetStore = usePlanetStore()

const emit = defineEmits([
  'rotateCameraLeft',
  'rotateCameraRight',
  'rotateCameraUp',
  'rotateCameraDown',
  'panCameraLeft',
  'panCameraRight',
  'panCameraUp',
  'panCameraDown',
  'zoomIn',
  'zoomOut',
  'restoreDefault'
])
let interval = null

function press(cb, ...args) {
  cb(...args)
  interval = setInterval(cb, 100, ...args)
}
function release() {
  clearInterval(interval)
}
function emitAction(action) {
  emit(action)
}
let showNavigation = ref(true)
function toggleNavigation() {
  showNavigation.value = !showNavigation.value
}
</script>

<style scoped>
.container {
  width: 90vw;
  height: 200px;
  /* border-radius: 50%; */
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  /* background: wheat; */
  color: white;
  /* --aug-tl: 50%;
  --aug-bl: 50%; */
  /* border: 1px solid white; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container,
.container::after,
.container::before {
  /* box-shadow: 0 0 10px 10px white; */
}

.rotation-container,
.pan-container {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  width: 200px;
  height: 200px;
}

.rotate-up,
.pan-up {
  grid-column: 1/7;
  grid-row: 1/2;
  /* --aug-tl: 50%;
  --aug-tr: 50%; */
  /* --aug-bl: 50px;
    --aug-br: 50px; */
}
.rotate-right,
.pan-right {
  grid-row: 1/4;
  grid-column: 3/4;
}
.rotate-down,
.pan-down {
  grid-column: 1/4;
  grid-row: 3/4;
}
.rotate-left,
.pan-left {
  grid-row: 1/4;
  grid-column: 1/2;
}
.rotate-reset {
  grid-row: 2/3;
  grid-column: 2/3;
}

.rotate-up,
.rotate-right,
.rotate-down,
.rotate-left,
.pan-up,
.pan-right,
.pan-down,
.pan-left {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  --aug-tl: 70px;
  --aug-tr: 70px;
  --aug-bl: 70px;
  --aug-br: 70px;
}
.rotate-reset {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.zoom-container,
.speed-container {
  display: flex;
  width: fit-content;
  height: fit-content;
}
.speed-actual > input {
  width: 50px;
  color: black;
  text-align: center;
}
.speed-slower,
.speed-actual,
.speed-faster,
.zoom-in,
.zoom-out,
.zoom-reset {
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  --aug-tl: 15px;
  --aug-tr: 15px;
  --aug-bl: 15px;
  --aug-br: 15px;
}
.panel-toggler {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  --aug-tl: 15px;
  --aug-tr: 15px;
  --aug-bl: 15px;
  --aug-br: 15px;
  color: wheat;
}
</style>