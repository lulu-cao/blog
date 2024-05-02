<script setup>
import { onMounted } from 'vue';

const emit = defineEmits(["closeAlert"]);
const props = defineProps(["title", "text", "icon", "type"]);

onMounted(()=>{
  setTimeout(() => {
    emit("closeAlert");
  }, 5000);
})
</script>

<template>
  <v-alert
    :text="props.text"
    :icon="props.icon"
    :title="props.title"
    :type="props.type"
    close-icon="$close"
  />
</template>

