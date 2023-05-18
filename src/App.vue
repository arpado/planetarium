<script setup>
// import  from './components/.vue'
import HorizontalMenu from '@/components/HorizontalMenu.vue'
import CanvasElement from '../src/components/CanvasElement.vue'
import InterfaceElement from '../src/components/InterfaceElement.vue'
import PlanetSettings from '../src/components/PlanetSettings.vue'
import SettingsModal from '../src/components/SettingsModal.vue'
import HelpModal from '../src/components/HelpModal.vue'
// import ControlElement from '../src/components/ControlElement.vue'

</script>

<template>
    <CanvasElement />
    <InterfaceElement />
    <HorizontalMenu />
    <!-- <ControlElement /> -->
    <PlanetSettings />
    <SettingsModal />
    <HelpModal />
</template>

<style scoped>

</style>
