<template>
  <a
    class="wrapper nav-btn"
    :href="button.href"
    data-augmented-ui="
  tl-clip tr-clip br-clip bl-clip both"
    :style="{ right: `${btnArrayLength - index * 110 + 405}px` }"
  >
    <!-- <p>{{ button.name }}</p> -->
    <Icon :icon="button.icon" />
  </a>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: "MenuItem",
  props: ["button", "index", "btnArrayLength"],
  components: { Icon },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
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
</style>