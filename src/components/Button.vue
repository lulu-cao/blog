<template>
  <v-btn @click="onClick">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'Button',
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
}
</script>

<style>
</style>
