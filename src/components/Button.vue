<template>
  <button @click.prevent="onClick" :style="{ background: color }" class="btn custom-btn">
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
  .custom-btn {
    margin: 0!important;
  }
</style>