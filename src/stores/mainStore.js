import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
    let showPlanetCards = ref(true)
    let showSearchBar = ref(false)
    let showSettings = ref(false)
    let showHelp = ref(false)

    function toggleModal(modal) {
        switch (modal) {
            case 'settings':
                showHelp.value = false
                showSettings.value = true
                break;

            case 'help':
                showHelp.value = true
                showSettings.value = false
                break;

            default:
                showSettings.value = false
                showHelp.value = false
                break;
        }
    }

    return { showPlanetCards, showSearchBar, showSettings, showHelp, toggleModal }
})