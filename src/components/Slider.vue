<template>
  <div class="flex flex-wrap w-full relative">
    <div class="w-full justify-center flex my-2">
      <p class="absolute z-10 text-2xl text-center">Coming soon...</p>
    </div>
    <Transition name="fade">
      <div class="flex absolute justify-evenly w-full bg-teal-600" style="height: 450px" v-if="(currentSlider === 0)">
        <img src="../assets/odyssey.jpg" class="my-12" />
        <img src="../assets/iliad.jpeg" class="my-12" />
        <img src="../assets/socially-undocumented.jpg" class="my-12" />
      </div>
    </Transition>
    <Transition name="fade">
      <div class="flex absolute justify-evenly w-full bg-yellow-600" style="height: 450px" v-if="(currentSlider === 1)">
        <img src="../assets/game-of-thrones.jpg" class="my-12" />
        <img src="../assets/clash-of-kings.jpg" class="my-12" />
        <img src="../assets/storm-of-swords.jpeg" class="my-12" />
      </div>
    </Transition>
    <Transition name="fade">
      <div class="flex absolute justify-evenly w-full bg-blue-600" style="height: 450px" v-if="(currentSlider === 2)">
        <img src="../assets/feast-for-crows.jpg" class="my-12" />
        <img src="../assets/dance-with-dragons.jpg" class="my-12" />
        <img src="../assets/house-of-leaves.jpeg" class="my-12" />
      </div>
    </Transition>

    <div class="w-full" style="height:420px">
      <div class="justify-center absolute bottom-0 flex w-full" >
        <div 
          class="w-3 h-3 mx-2 rounded-full cursor-pointer shadow-md" 
          v-for="color, index in colorList" 
          :key="color" 
          :class="currentSlider === index ? 'bg-gray-800' : 'bg-gray-400'"
          @click="getActive(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      colorList: [ "bg-teal-600", "bg-yellow-600", "bg-blue-600" ],
      currentSlider: 0,
      interval: "",
      }
    }, 
    methods: {
      getActive(index) {
        this.currentSlider = index
      }
    }, 
    mounted() {
      this.interval = setInterval(() => {
        this.currentSlider === 2 ? this.currentSlider = 0 : this.currentSlider ++
      }, 5000)
    },
    beforeUnmount() {
      clearInterval(this.interval)
    }
  }
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0.7;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0.7;
  transform: translateX(-100%);
}
</style>