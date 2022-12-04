<template>
  <button 
    @click.prevent="onClick" 
    :style="{ background: color }" 
    class="rounded mx-2 w-20 bg-gradient-to-r from-green-800 to-green-600 text-white shadow hover:bg-green-800 active:bg-green-800">
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: String,
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
}
</script>

<style>
</style>