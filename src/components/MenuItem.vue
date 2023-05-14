<template>
<div class="flex gap-4 items-center">
  <div v-if="button.id === 'search-btn' && mainStore.showSearchBar">
    <input type="text" name="" id="" placeholder="Find..."> 
  </div>
  <a
    class="wrapper nav-btn"
    @click="$emit(button.func)"
    data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
    >
    <!-- :style="{ right: `${btnArrayLength - index * 110 + 405}px` }" -->
    <!-- <p>{{ button.name }}</p> -->
    <Icon :icon="button.icon" />
  </a>
</div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { useMainStore } from '@/stores/mainStore.js'


export default {
  name: "MenuItem",
  props: ["button", "index", "btnArrayLength"],
  components: { Icon },
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },
};
</script>

<style scoped>
.wrapper {
  /* position: absolute; */
  top: 0;
  text-decoration: none;
  color: white;
  height: 70px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* --aug-tr: 20px;
  --aug-bl: 20px; */
}
a {
  font-size: 3rem;
}
.nav-btn {
  --aug-inlay-opacity: 0.9;
  --aug-inlay-bg: black;
  --aug-inlay-all: 0px;
}
</style>