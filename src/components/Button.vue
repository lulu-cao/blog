<template>
  <button 
    @click.prevent="onClick" 
    class="rounded mx-2 w-20 bg-gradient-to-r from-green-800 to-green-600 text-white shadow"
    :class="color"
  >
    <slot></slot>
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