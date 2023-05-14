<template>
  <canvas ref="canvasElement" />
  <ControlElement
    @rotateCameraLeft="rotateCamera(-0.5, 0, 0)"
    @rotateCameraRight="rotateCamera(0.5, 0, 0)"
    @rotateCameraUp="rotateCamera(0, 0.5, 0)"
    @rotateCameraDown="rotateCamera(0, -0.5, 0)"
    @panCameraLeft="panCamera('ArrowLeft')"
    @panCameraRight="panCamera('ArrowRight')"
    @panCameraUp="panCamera('ArrowUp')"
    @panCameraDown="panCamera('ArrowDown')"
    @zoomIn="rotateCamera(0, 0, -0.5)"
    @zoomOut="rotateCamera(0, 0, 0.5)"
    @restoreDefault="orbitControl.reset()"
  />
</template>

<script setup>
import ControlElement from '@/components/ControlElement.vue'

import { ref, computed, onMounted, watch, toRefs } from 'vue'
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

const { width, height } = useWindowSize()
const aspectRatio = computed(() => {
  return width.value / height.value
})

// const textureLoader = new THREE.TextureLoader()
const canvasElement = ref(null)
const scene = new THREE.Scene()

let renderer = null
let orbitControl = null

const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(10, 10, 10)
scene.add(camera)
// scene.background = new THREE.Color(0x000000)
scene.background = textureCube

// const grid = new THREE.GridHelper(100)
// scene.add(grid)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01)
scene.add(ambientLight)

// ADD SUN
const sun = createSun(5, 30, 30, sunTexture)
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

    if (item.moons.length > 0) {
      item.moons.forEach((item) => {
        const moon = createPlanet(1, 30, 30, item)
        const orbitTrack = createOrbitTrack(item)

        planet.mesh.add(moon.center)
        moon.center.add(moon.mesh)
        moon.center.add(orbitTrack)

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
      moons: moonList
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
  }
  return { canvasElement }
}

onMounted(() => {
  setRenderer()
  addPlanets()
  animate()
})

const animate = () => {
  if (animationData.length > 0) {
    animationData.forEach((elem, index) => {
      // elem.mesh.rotation.y += 0.02 * elem.rotationCoef
      // elem.center.rotation.y += 0.02 * elem.rotationCoef
      // const rotation = THREE.MathUtils.radToDeg(elem.center.rotation.y)
      // if(rotation > planetStore.planetList[index].rotation + 1) {
      //   planetStore.planetList[index].rotation = rotation
      // }
      // if (elem.moons.length > 0) {
      //   elem.moons.forEach((moon) => {
      //     moon.moonMesh.rotation.y += 0.02 * moon.rotationCoef
      //     moon.moonCenter.rotation.y += 0.02 * moon.rotationCoef
      //   })
      // }
    })
  }

  // sun.mesh.rotation.y += 0.02

  renderer.render(scene, camera)
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
</script>

<style>
</style>