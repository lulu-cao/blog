<template>
  <form class="add-form">
    <div class="form-control">
      <label>Book Title</label>
      <input type="text" v-model="book" name="book" class="border" />
    </div>
    <div class="form-control">
      <label>Author(s)</label>
      <input type="text" v-model="author" name="author" class="border"/>
    </div>
    <div class="form-control">
      <label>Review Date</label>
      <input type="text" v-model="date" name="date" class="border" :placeholder="currentDay"/>
    </div>
    <div class="form-control">
      <label>Reviewer</label>
      <input type="text" v-model="reviewer" class="border" name="reviewer" />
    </div>
    <div class="form-control">
      <label>Review</label>
      <input type="text" v-model.lazy="review" class="border" name="review" />
    </div>
    <div class="form-control form-control-check">
      <label>Check the box if you have not finished this book</label>
      <input type="checkbox" v-model="unfinished" name="unfinished" />
    </div>
    <!-- <div v-for="label in labelList" :key="label.model" class="form-control">
      <label v-text="label.title"></label>
      <input type="text" class="border" :name="label.model" v-model="label.model" />
    </div> -->
    <Button type="submit" class="btn btn-block" :color="'green'" v-text="'Save Post'" @btn-click="onSubmit"></Button>
  </form>
  <br /><br />
</template>

<script>
  import Button from '../components/Button.vue';

  export default {
    name: "AddPost",
    components: { Button },
    data() {
      return {
        book: '',
        author: '',
        date: '',
        reviewer: '',
        review: '',
        unfinished: Boolean,
        labelList: [ {title: "Author(s)", model: "author"}, {title:"Book Title", model:"book"}, {title:"Review Date", model:"date"} ]
      }
    },
    emits: ['add-post'], // declare emitted events
    methods: {
      onSubmit(e) {
        if(!this.book || !this.author) {
          alert('Please make sure you have filled in a title and an author for the book.')
          return
        }

        const newPost = {
          id: Math.floor(Math.random() * 100000), // not a reliable way here, just temporary placeholder
          book: this.book,
          author: this.author,
          date: this.date,
          reviewer: this.reviewer,
          review: this.review,
          unfinished: this.unfinished,
        }

        this.$emit('add-post', newPost) 

        this.book = ''
        this.author = ''
        this.date = ''
        this.reviewer = ''
        this.review = ''
        this.unfinished = false
      }
    },
    computed: {
      currentDay() {
        const currentMonth = new Date().toLocaleString("default", {month: "long"});
        const currentDate = new Date().getDate();
        return currentMonth + " " + currentDate
      }
    }
  }
</script>

<style scoped>
.add-form {
  margin-bottom: 5rem;
  max-width: 80%;
  margin: auto;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
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

