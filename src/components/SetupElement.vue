<template>
  <div>
    <div class="flex justify-between items-center">
      <label :for="`item-scale-${index}`">Size</label>
      <input
        class="w-10 h-fit"
        :id="`item-scale-${index}`"
        type="number"
        step=".1"
        v-model="item.size.scale"
      />
    </div>
    <div class="flex justify-between items-center">
      <label :for="`item-distance-${index}`">Distance from star</label>
      <input
        class="w-10 h-fit"
        :id="`item-distance-${index}`"
        type="number"
        v-model="item.radius"
      />
    </div>
    <div class="flex justify-between items-center">
      <label :for="`item-rotation-offset-${index}`">Orbital rotation offset</label>
      <input
        class="w-10 h-fit"
        :id="`item-rotation-offset-${index}`"
        type="number"
        v-model="item.rotation"
        min="0"
        max="360"
      />
    </div>
  </div>
</template>

<script >
export default {
  props: ['item', 'index']
}
</script>

<style scoped>
input {
  color: black;
}
</style>