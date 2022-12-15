<template>
  <div class="w-full min-h-fit fixed bottom-0">
    <button @click="closeAlert" class="text-white mr-1 ml-auto block" >x</button>
    <p class="text-white text-center mb-3">
      <slot>Success!</slot>
    </p>
  </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  emits: ["closeAlert"],
  setup(_, { emit }) {
    const closeAlert = () => {
      emit("closeAlert");
    };

    onMounted(()=>{
      setTimeout(() => {
        emit("closeAlert");
      }, 5000);
    })

    return { closeAlert }
  }
}
</script>