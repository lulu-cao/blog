<template>
  <form class="add-form m-auto">
    <div class="form-control">
      <label>Book Title</label>
      <input type="text" v-model="book" name="book" class="border w-full mx-2 my-2" ref="bookTitleRef" />
    </div>
    <div v-for="label in labelList" :key="label.title" class="form-control">
      <label v-text="label.title"></label>
      <input type="text" class="border w-full mx-2 my-2" :name="label.name" v-model="label.model" />
    </div>
    <div class="form-control">
      <label>Review</label>
      <textarea class="border w-full mx-2 my-2" name="review" v-model.lazy="review"></textarea>
    </div>
    <div class="form-control form-control-check">
      <label>Check the box if you have not finished this book</label>
      <input type="checkbox" v-model="unfinished" name="unfinished" />
    </div>
    <!-- need to add ".prevent" for @click for buttons; otherwise, the page will auto refresh -->
    <button type="submit" class="btn rounded w-full py-2 bg-gradient-to-r from-green-800 to-green-600 text-white" @click.prevent="onSubmit">Save Post</button>
  </form>
  <Alert v-if="isPostAlertOpen" class="bg-red-700" @closeAlert="closePostAlert">Please make sure you have filled in a title and an author for the book.</Alert>
  <br /><br />
</template>

<script>
  import Alert from '../components/Alert.vue';
  import { ref, computed, onMounted } from 'vue';

  export default {
    name: "AddPost",
    components: { Alert },
    props: ['showAddPost'],
    emits: ['add-post'], // declare emitted events
    setup(props, { emit }) {
      const getCurrentDay = computed(() => {
        const currentMonth = new Date().toLocaleString("default", {month: "long"});
        const currentDate = new Date().getDate();
        return currentMonth + " " + currentDate
      });

      const bookTitleRef = ref("");
      const book = ref("");
      const author = ref("");
      const date = ref(getCurrentDay.value);
      const reviewer = ref("");
      const review = ref("");
      const unfinished = ref(false);
      const labelList = ref([ 
        { title: "Author(s)", model: author, name: "author" }, 
        { title: "Review Date", model: date, name: "date" }, 
        { title: "Reviewer", model: reviewer, name: "reviewer" }, 
      ]);

      function onSubmit(e) {
        if(!book.value || !author.value) {
          isPostAlertOpen.value = true;
          return
        };

        const newPost = {
          id: Math.floor(Math.random() * 100000), // not a reliable way here, just temporary placeholder
          book: book.value,
          author: author.value,
          date: date.value,
          reviewer: reviewer.value,
          review: review.value,
          unfinished: unfinished.value,
        };

        emit('add-post', newPost);

        book.value = '';
        author.value = '';
        date.value = '';
        reviewer.value = '';
        review.value = '';
        unfinished.value = false;
      };

      onMounted(() => { bookTitleRef.value.focus() });

      const isPostAlertOpen = ref(false);

      const closePostAlert = () => {
        isPostAlertOpen.value = false
      };

      return { bookTitleRef, book, author, date, reviewer, review, unfinished, labelList, onSubmit, getCurrentDay, isPostAlertOpen, closePostAlert }
    }
  }
</script>

<style scoped>
.add-form {
  max-width: 80%;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  height: 40px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 4;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>

