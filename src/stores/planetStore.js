import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { createPlanet } from '@/src/composables/planet.js'
import * as planetMash from '@/composables/meshImports.js'



export const usePlanetStore = defineStore('planetStore', () => {
    //   const count = ref(0)
    //   const doubleCount = computed(() => count.value * 2)
    //   function increment() {
    //     count.value++
    //   }

    //   return { count, doubleCount, increment }
    let rotationSpeed = ref(0)

    // let itemOnMod = ref(null)
    // function togglePlanetSettings(item) {
    //     if (item === itemOnMod.value) {
    //         itemOnMod.value = null
    //     }
    //     itemOnMod.value = item
    // }

    let planetListOld = ref([
        {
            size: {
                scale: 1,
            },
            radius: 15,
            rotation: 0,
            mesh: planetMash.mars,
            moons: [
                {
                    size: {
                        scale: 0.2,
                    },
                    radius: 2,
                    rotation: 0,
                    mesh: planetMash.mars,
                },
            ],
            rotationCoef: 2,
        },
        {
            size: {
                scale: 0.5,
            },
            radius: 20,
            rotation: 90,
            mesh: planetMash.venus,
            moons: [],
            rotationCoef: 3,
        }
    ])

    let planetList = ref([
        {
            name: 'Mercury',
            size: {
                scale: 0.4,
            },
            radius: 50,
            rotation: 0,
            mesh: planetMash.mercury,
            moons: [],
            rotationCoef: 4.15,
        },
        {
            name: 'Venus',
            size: {
                scale: 0.94,
            },
            radius: 70,
            rotation: 0,
            mesh: planetMash.venus,
            moons: [],
            rotationCoef: 1.43,
        },
        {
            name: 'Earth',
            size: {
                scale: 1,
            },
            radius: 100,
            rotation: 0,
            mesh: planetMash.earth,
            moons: [
                {   
                    name: 'Moon',
                    size: {
                        scale: 0.2,
                    },
                    radius: 3,
                    rotation: 0,
                    mesh: planetMash.pluto,
                    rotationCoef: 10,
                },
            ],
            rotationCoef: 1,
        },
        {
            name: 'Mars',
            size: {
                scale: 0.53,
            },
            radius: 130,
            rotation: 0,
            mesh: planetMash.mars,
            moons: [
                {
                    name: 'Phobos',
                    size: {
                        scale: 0.1,
                    },
                    radius: 2.5,
                    rotation: 0,
                    mesh: planetMash.pluto,
                    rotationCoef: 20,
                },
                {
                    name: 'Deimos',
                    size: {
                        scale: 0.2,
                    },
                    radius: 3.5,
                    rotation: 45,
                    mesh: planetMash.pluto,
                    rotationCoef: 10,
                },
            ],
            rotationCoef: 0.53,
        },
        {
            name: 'Jupiter',
            size: {
                scale: 11.31,
            },
            radius: 180,
            rotation: 0,
            mesh: planetMash.jupiter,
            moons: [],
            // moons: [
            //     {
            //         size: {
            //             scale: 0.1,
            //         },
            //         radius: 3,
            //         rotation: 0,
            //         mesh: planetMash.pluto,
            //     },
            //     {
            //         size: {
            //             scale: 0.2,
            //         },
            //         radius: 3,
            //         rotation: 45,
            //         mesh: planetMash.pluto,
            //     },
            // ],
            rotationCoef: 0.53,
        },
        {
            name: 'Uranus',
            size: {
                scale: 4,
            },
            radius: 240,
            rotation: 0,
            mesh: planetMash.uranus,
            moons: [
                // {
                //     size: {
                //         scale: 0.1,
                //     },
                //     radius: 3,
                //     rotation: 0,
                //     mesh: planetMash.pluto,
                // },
                // {
                //     size: {
                //         scale: 0.2,
                //     },
                //     radius: 3,
                //     rotation: 45,
                //     mesh: planetMash.pluto,
                // },
            ],
            rotationCoef: 0.1,
        },
        {
            name: 'Neptune',
            size: {
                scale: 3.88,
            },
            radius: 300,
            rotation: 0,
            mesh: planetMash.neptune,
            moons: [
                // {
                //     size: {
                //         scale: 0.1,
                //     },
                //     radius: 3,
                //     rotation: 0,
                //     mesh: planetMash.pluto,
                // },
                // {
                //     size: {
                //         scale: 0.2,
                //     },
                //     radius: 3,
                //     rotation: 45,
                //     mesh: planetMash.pluto,
                // },
            ],
            rotationCoef: 0.006,
        },
    ])

    function addPlanet(radius, mapName) {
        // createPlanet(radius, 25, 25, mapName)
        this.planetList.push({ size: 1, radius: 10, rotation: 0, })

    }

    return { rotationSpeed, itemOnMod, planetList, addPlanet, /*togglePlanetSettings*/ }
})
