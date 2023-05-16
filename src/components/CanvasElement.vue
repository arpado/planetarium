<template>
  <canvas ref="canvasElement" />
  <ControlElement
    @rotateCameraLeft="rotateCamera(-2, 0, 0)"
    @rotateCameraRight="rotateCamera(2, 0, 0)"
    @rotateCameraUp="rotateCamera(0, 2, 0)"
    @rotateCameraDown="rotateCamera(0, -2, 0)"
    @panCameraLeft="panCamera('ArrowLeft')"
    @panCameraRight="panCamera('ArrowRight')"
    @panCameraUp="panCamera('ArrowUp')"
    @panCameraDown="panCamera('ArrowDown')"
    @zoomIn="rotateCamera(0, 0, -2)"
    @zoomOut="rotateCamera(0, 0, 2)"
    @restoreDefault="orbitControl.reset()"
  />
  <button @click="addFlags">add flags</button>
  <button @click="removeFlags">remove flags</button>
</template>

<script setup>
import ControlElement from '@/components/ControlElement.vue'
import FlagElement from '@/components/FlagElement.vue'

import { ref, computed, onMounted, watch, toRefs, createApp } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// console.log(OrbitControls)
// import { dat } from 'dat.gui'
import { useWindowSize } from '@vueuse/core'

import { textureCube } from '../composables/background'
import { createPlanet } from '../composables/planet'
import { createSun } from '../composables/star'
import { createOrbitTrack } from '../composables/orbitTrack'

// import starsTexture from '@/assets/images/stars-map.png'
// import milkyWay from '@/assets/images/ESO_-_Milky_Way.jpg'
import sunTexture from '@/assets/images/sun-map.jpg'
// import earthTexture from '@/assets/images/earth-map.jpg'

import { usePlanetStore } from '@/stores/planetStore.js'
// import * as planetMash from '@/composables/meshImports.js'

// access the `store` variable anywhere in the component ✨
const planetStore = usePlanetStore()

import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const { width, height } = useWindowSize()
const aspectRatio = computed(() => {
  return width.value / height.value
})

// const textureLoader = new THREE.TextureLoader()
const canvasElement = ref(null)
const scene = new THREE.Scene()

let renderer = null
let orbitControl = null

const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 2000)
camera.position.set(150, 150, 150)
scene.add(camera)
// scene.background = new THREE.Color(0x000000)
scene.background = textureCube

// const grid = new THREE.GridHelper(100)
// scene.add(grid)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01)
scene.add(ambientLight)

const labelrenderer = new CSS2DRenderer()
labelrenderer.setSize(width.value, height.value)
labelrenderer.domElement.style.position = 'absolute'
labelrenderer.domElement.style.top = '0px'
labelrenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelrenderer.domElement)

// const p = document.createElement('p')
// p.innerText = 'PLANET'
// const flag = new CSS2DObject(p)
// scene.add(flag)
// flag.position.set(0, 40, 0)

// ADD SUN
const sun = createSun(30, 30, 30, sunTexture)
scene.add(sun.mesh)
sun.pointLightArray.forEach((pointLight) => {
  scene.add(pointLight)
})

// ADD PLANETS
const { planetList } = toRefs(planetStore)
let animationData = []

function addPlanets() {
  planetList.value.forEach((item) => {
    const planet = createPlanet(1, 30, 30, item)
    const orbitTrack = createOrbitTrack(item)
    let moonList = []

    scene.add(planet.center)
    planet.center.add(planet.mesh)
    planet.center.add(orbitTrack)
    // let flag = createFlag(item.name)
    // planet.mesh.add(flag)
    // flag.position.set(0, 0, 0)

    if (item.moons.length > 0) {
      item.moons.forEach((item) => {
        const moon = createPlanet(1, 30, 30, item)
        const orbitTrack = createOrbitTrack(item)

        planet.mesh.add(moon.center)
        moon.center.add(moon.mesh)
        moon.center.add(orbitTrack)
        // let flag = createFlag(item.name)
        // moon.mesh.add(flag)
        //     flag.position.set(0, 0, 0)

        moonList.push({
          moonMesh: moon.mesh,
          moonCenter: moon.center,
          rotationCoef: item.rotationCoef
        })
      })
    }

    watch(item, () => {
      planet.mesh.position.x = item.radius
      planet.center.rotation.y = THREE.MathUtils.degToRad(item.rotation)
      renderer.render(scene, camera)
    })

    watch(item.size, () => {
      planet.mesh.scale.set(item.size.scale, item.size.scale, item.size.scale)
      renderer.render(scene, camera)
    })

    animationData.push({
      mesh: planet.mesh,
      center: planet.center,
      rotationCoef: item.rotationCoef,
      moons: moonList,
      name: item.name,
    })
    // return { mesh, center }
  })
}

// RENDERING FUNCTIONS //

function updateRenderer() {
  renderer.setSize(width.value, height.value)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.render(scene, camera)
}

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

function setRenderer() {
  if (canvasElement.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: canvasElement.value,
      alpha: true,
      antialias: true
    })
    // renderer.shadowMap.enabled = true

    updateRenderer()

    orbitControl = new OrbitControls(camera, canvasElement.value)
    orbitControl.minDistance = 1
    orbitControl.maxDistance = 500
    // orbitControl.screenSpacePanning = false;
    // orbitControl.enableDamping = true
    // orbitControl.dampingFactor = 0.05
    orbitControl.listenToKeyEvents(window)

    orbitControl.update()
    console.log(orbitControl)
  }
  // return { canvasElement }


}

function createFlag(nameInput) {
  const vm =  createApp(FlagElement,  { name: nameInput } ).mount(document.createElement('div'))
  const html = vm.$el.outerHTML

  // Create a new CSS2DObject and set its HTML content
  const flag = new CSS2DObject()
  flag.element.innerHTML = html
  return flag
  // scene.add(flag)
  // flag.position.set(posX, posY, 0)

  //   const div = document.createElement('div')
  // div.setAttribute('data-augmented-ui', "tl-clip tr-clip br-clip bl-clip both")
  // div.style.width = '100px'
  // div.style.height = '50px'
  // div.innerText = 'PLANET'
  // div.style.color = 'white'
  // const flag = new CSS2DObject(div)
  // scene.add(flag)
  // flag.position.set(0, 40, 0)
  // console.log(FlagElement)
}
function addFlags() {
  animationData.forEach(item => {
    if (item.mesh.children.filter(e => e.isCSS2DObject === true).length === 0) {
      let flag = createFlag(item.name)
      item.mesh.add(flag)
      flag.position.set(0, 0, 0)
    }
  })
}
function removeFlags() {
  animationData.forEach(item => {
    let flag = item.mesh.children.filter(e => e.isCSS2DObject === true)
    item.mesh.remove(flag[0])
    // animate()
  })
}

onMounted(() => {
  setRenderer()
  addPlanets()
  animate()
})

const animate = () => {
  if (animationData.length > 0) {
    animationData.forEach((elem, index) => {
      elem.mesh.rotation.y += (planetStore.rotationSpeed * elem.rotationCoef) / 100
      elem.center.rotation.y += (planetStore.rotationSpeed * elem.rotationCoef) / 100
      const rotation = THREE.MathUtils.radToDeg(elem.center.rotation.y).toFixed(0)
      if (rotation > planetStore.planetList[index].rotation + 1) {
        planetStore.planetList[index].rotation = rotation % 360
      }
      if (elem.moons.length > 0) {
        elem.moons.forEach((moon) => {
          moon.moonMesh.rotation.y += (planetStore.rotationSpeed * moon.rotationCoef) / 100
          moon.moonCenter.rotation.y += (planetStore.rotationSpeed * moon.rotationCoef) / 100
        })
      }
    })
  }

  sun.mesh.rotation.y += planetStore.rotationSpeed / 100

  renderer.render(scene, camera)
  labelrenderer.render(scene, camera)
  requestAnimationFrame(animate)
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

function rotateCamera(x, y, z) {
  const panOffset = new THREE.Vector3(x, y, z)
  panOffset.applyQuaternion(camera.quaternion)
  camera.position.add(panOffset)
  orbitControl.update()
}

function panCamera(key) {
  const event = new KeyboardEvent('keydown', { key: key, code: key, bubbles: true })
  document.dispatchEvent(event)
  orbitControl.update()
}

/*// other try to implement css3d
https://discourse.threejs.org/t/css3drednerer-object/36464/4
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

  let rendererCSS = null
  let container = document.querySelector('#app')

  rendererCSS = new CSS3DRenderer()
  rendererCSS.setSize(innerWidth, innerHeight)
  container.appendChild(rendererCSS.domElement)
  // rendererCSS.domElement.style.pointerEvents = 'none'

  // put the mainRenderer on top
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = 0
  renderer.domElement.style.zIndex = 1
  renderer.setSize(innerWidth, innerHeight)

  rendererCSS.domElement.appendChild(renderer.domElement)
  rendererCSS.render(scene, camera)
  orbitControl = new OrbitControls(camera, rendererCSS.domElement)


  // a css elem
  var holder = new THREE.Group()
  let div = document.createElement('div')
  const obj = new CSS3DObject(div)
  div.innerHTML = '<p>it works</p>'
  div.style.fontSize = '1rem'

  holder.add(obj)
  let wf = 10
  let hf = 10
  //add transparant plane
  var geometry = new THREE.PlaneGeometry(50, 50)
  var material = new THREE.MeshBasicMaterial()
  material.color.set('black')
  material.opacity = 0
  material.blending = THREE.NoBlending
  material.side = THREE.DoubleSide
  var p = new THREE.Mesh(geometry, material)

  holder.add(p)
  scene.add(holder)
  holder.position.set(0, 40, 0)*/
</script>

<style scoped>
/* #container {
  position: absolute;
  width: 100vw;
  height: 100vh;
} */
button {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
}
button:nth-of-type(2){
  position: absolute;
  top: 20px;
  left: 100px;
}
</style>