import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
    let showPlanetCards = ref(true)
    let showSearchBar = ref(false)
    return { showPlanetCards, showSearchBar }
})