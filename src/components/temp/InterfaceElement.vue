    <!-- 
    // core version + navigation, pagination modules:
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Mousewheel } from 'swiper'
// import { useElementSize } from '@vueuse/core'

// Navigation, Pagination
// import Swiper and modules styles
// import 'swiper/css'
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// init Swiper:
// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   modules: [Mousewheel],
// });
// const modules = [Mousewheel]
    
    
    <Swiper
    :direction="'vertical'"
    :slides-per-view="5"
    :pagination="{
      clickable: true,
    }"
    class="swiper-container swiper"
    :modules="modules"
    :mousewheel="true"
  >
    <SwiperSlide
      v-for="(planet, index) in planetStore.planetList"
      :key="index"
      data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
      class="planet-container"
    >
      <span>{{ planet.name }}</span>
      // <button @click="planet.value = !planet.value">{{ planet.value? 'close' : 'open' }}</button>
      <button @click="planet.value = !planet.value">open</button>
      // <div :class="[{ invisible: !planet.value }, {visible: planet.value }]"> 
      <div v-if="planet.value">
        <div class="flex justify-between items-center">
          <label :for="`planet-scale-${index}`">Size</label>
          <input
            class="w-10 h-fit"
            :id="`planet-scale-${index}`"
            type="number"
            step=".1"
            v-model="planet.size.scale"
          />
        </div>
        <div class="flex justify-between items-center">
          <label :for="`planet-distance-${index}`">Distance from star</label>
          <input
            class="w-10 h-fit"
            :id="`planet-distance-${index}`"
            type="number"
            v-model="planet.radius"
          />
        </div>
        <div class="flex justify-between items-center">
          <label :for="`planet-rotation-offset-${index}`">Orbital rotation offset</label>
          <input
            class="w-10 h-fit"
            :id="`planet-rotation-offset-${index}`"
            type="number"
            v-model="planet.rotation"
            min="0"
            max="360"
          />
        </div>
      </div>
    </SwiperSlide>
    <button @click="planetStore.addPlanet">new planet</button>
  </Swiper> -->

    <!-- <div
      class="star-container"
      data-augmented-ui="  tl-clip tr-clip r-rect-xy br-clip bl-clip both"
      :style="{ height: getSunContainerHeight, '--aug-r-extend1': getPlanetContainerHeight }"
    ></div>
    <div class="planet-main-container">
      <div
        v-for="(planet, index) in planetStore.planetList"
        :key="index"
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        class="planet-container"
      ></div> -->