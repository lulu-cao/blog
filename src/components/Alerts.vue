<template>
  <Alert v-if="isSuccessAlertOpen" class="bg-green-800" @closeAlert="closeSuccessAlert">
    Post is added successfully!
  </Alert>
  <Alert v-if="isFailureAlertOpen" class="bg-red-700" @closeAlert="closeFailureAlert">Something went wrong.</Alert>
</template>

<script>
import Alert from './Alert.vue';

export default {
  name: "Alerts",
  components: { Alert },
  emits: ["closeSuccessAlert", "closeFailureAlert"],
  props: ["isSuccessAlertOpen", "isFailureAlertOpen"], 
  setup(props, { emit }) {
    function closeSuccessAlert() {
      emit("closeSuccessAlert");
    };

    function closeFailureAlert() {
      emit("closeFailureAlert");
    };

    return { closeSuccessAlert, closeFailureAlert }
  }
}
</script>