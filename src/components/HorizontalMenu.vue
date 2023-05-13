<template>
  <div class="container">
    <transition-group @enter="enter" @afterEnter="afterEnter" @leave="onLeave" appear>
      <MenuItem
        v-show="menuVisible"
        v-for="(button, index) in buttons"
        :key="button.name"
        :button="button"
        :index="index"
        :data-index="index"
        :btnArrayLength="buttons.length"
        :icon="button.icon"
      />

    </transition-group>
    <div
      class="btn-toggle-menu nav-btn"
      data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
      @click="toggleMenu"
    >
      <span class="wrap">
        <div
          class="triangle"
          data-augmented-ui="all-triangle-right border"
          :class="{ 'arrow-rotated': menuVisible }"
        ></div>
      </span>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem.vue'
import gsap from 'gsap'

export default {
  components: { MenuItem },
  data() {
    return {
      buttons: [
        {
          name: 'Planets',
          icon: 'solar:planet-4-bold-duotone',
          href: '#hero'
        },
        {
          name: 'Search',
          icon: 'tabler:world-search',
          href: '#projects'
        },
        {
          name: 'Settings',
          icon: 'ic:round-settings',
          href: '#contacts'
        },
        {
          name: 'Help',
          icon: 'solar:question-circle-broken',
          href: '#contacts'
        },

      ],
      menuVisible: true
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible
      this.arrowRotated = !this.arrowRotated
    },
    enter(el) {
      el.style.transform = `translateX(${this.buttons.length - el.dataset.index * 100 + 600 }px)`
    },
    afterEnter(el, done) {
      gsap.to(el, {
        transform: 'translateX(0px)',
        delay: (this.buttons.length - el.dataset.index) * 0.5,
        onComplete: () => {
          el.style.transform = ''
        }
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        transform: `translateX(${this.buttons.length - el.dataset.index * 100 + 600}px)`,
        delay: el.dataset.index * 0.5 + 0.5,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: fit-content;
  width: fit-content;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 995;
  font-size: 1.5rem;
  font-weight: 900;
}
.btn-toggle-menu {
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  /* padding-left: 15px; */
  /* --aug-bl: 20px; */
}
.btn-toggle-menu > .wrap > :only-child {
  transition: all 1s cubic-bezier(0.54, 0.54, 0.54, 0.54);
}
.btn-toggle-menu:hover {
  cursor: pointer;
}
.arrow-rotated {
  transform: rotateY(180deg);
}
.nav-btn {
  --aug-inlay-opacity: 0.9;
  --aug-inlay-bg: black;
  --aug-inlay-all: 0px;
}
.wrap {
  filter: drop-shadow(0 0 10px white);
}
</style>