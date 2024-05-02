<template>
  <v-btn @click="onClick" variant="elevated">
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
