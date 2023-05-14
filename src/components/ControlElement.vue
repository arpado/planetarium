<template>
  <!-- data-augmented-ui="tl-clip tr-clip br-clip bl-clip both" -->
  <div class="container">
      <div class="rotation-container">
              <div
      data-augmented-ui=" bl-clip br-clip both"
      class="rotate-up"
      @pointerdown="press(emitAction, 'rotateCameraUp')" @pointerup="release"
    ><span>RL</span></div>
<!-- tl-round tr-round -->
    <div
      data-augmented-ui="tl-clip bl-clip both"
      class="rotate-right"
      @pointerdown="press(emitAction, 'rotateCameraRight')" @pointerup="release"
    ><span>RR</span></div>
<!-- tr-round br-round -->
    <div
      data-augmented-ui="tl-clip tr-clip both"
      class="rotate-down"
      @pointerdown="press(emitAction, 'rotateCameraDown')" @pointerup="release"
    ><span>RD</span></div>
    <!-- bl-round br-round -->
    <div
      data-augmented-ui="tr-clip br-clip both"
      class="rotate-left"
      @pointerdown="press(emitAction, 'rotateCameraLeft')" @pointerup="release"
    ><span>RL</span></div>
    <!-- tl-round bl-round -->
      </div>

    <div class="pan-container">
           <div
      data-augmented-ui="bl-clip br-clip both"
      class="pan-up"
      @pointerdown="press(emitAction, 'panCameraUp')" @pointerup="release"
    >PM</div>
    <div
      data-augmented-ui="tl-clip bl-clip both"
      class="pan-right"
      @pointerdown="press(emitAction, 'panCameraRight')" @pointerup="release"
    >PR</div>
        <div
      data-augmented-ui="tl-clip tr-clip both"
      class="pan-down"
      @pointerdown="press(emitAction, 'panCameraDown')" @pointerup="release"
    >PD</div>
    <div
      data-augmented-ui="tr-clip br-clip both"
      class="pan-left"
      @pointerdown="press(emitAction, 'panCameraLeft')" @pointerup="release"
    ><span>Move Left</span></div>
    </div>
 

    <!-- <button >
      
    </button>
    <button >
      Move Right
    </button>
    <button >
      Move Up
    </button>
    <button >
      Move Down
    </button>
    <button >
      Pan Left
    </button>
    <button >
      Pan Right
    </button>
    <button >
      Pan Up
    </button>
    <button >
      Pan Down
    </button>
    <button @pointerdown="press(emitAction, 'zoomIn')" @pointerup="release">
      Zoom In
    </button>    
    <button @pointerdown="press(emitAction, 'zoomOut')" @pointerup="release">
      Zoom Out
    </button>
    <button @pointerdown="press(emitAction, 'restoreDefault')" @pointerup="release">
      Restore Default
    </button> -->
  </div>
</template>

<script setup>
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
  interval = setInterval(cb, 150, ...args)
}
function release() {
  clearInterval(interval)
}
function emitAction(action) {
  emit(action)
}
</script>

<style scoped>
.container {
  width: 100%;
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
  border: 1px solid white;
    display: flex;
    justify-content: space-between;
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

.rotate-up, .rotate-right, .rotate-down, .rotate-left,
.pan-up, .pan-right, .pan-down, .pan-left {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    --aug-tl: 70px;
    --aug-tr: 70px;
    --aug-bl: 70px;
    --aug-br: 70px;
}
/* .pan-left {
  grid-row: 2/6;
  grid-column: 2/3; 
} */
/* .pan-right {
  grid-row: 2/6;
  grid-column: 5/6; 
}
.pan-up {
  grid-row: 2/3;
  grid-column: 2/6; 
}
.pan-down {
  grid-row: 5/6;
  grid-column: 2/6; 
} */
.zoom-in {
}
.zoom-out {
}
.reset {
}
.hide {
}
</style>