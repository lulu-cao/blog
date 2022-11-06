<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Book Title</label>
      <input type="text" v-model="book" name="book" />
    </div>
    <div class="form-control">
      <label>Author(s)</label>
      <input type="text" v-model="author" name="author" />
    </div>
    <div class="form-control">
      <label>Review Date</label>
      <input type="text" v-model="date" name="date" />
    </div>
    <div class="form-control">
      <label>Reviewer</label>
      <input type="text" v-model="reviewer" name="reviewer" />
    </div>
    <div class="form-control">
      <label>Review</label>
      <input type="text" v-model="review" name="review" />
    </div>
    <div class="form-control form-control-check">
      <label>Check the box if you have not finished this book</label>
      <input type="checkbox" v-model="unfinished" name="unfinished" />
    </div>

    <input type="submit" value="Save Post" class="btn btn-block" />
  </form>
  <br /><br />
</template>

<script>
  export default {
    name: "AddPost",
    data() {
      return {
        book: '',
        author: '',
        date: '',
        reviewer: '',
        review: '',
        unfinished: Boolean,
      }
    },
    emits: ['add-post'], // declare emitted events
    methods: {
      onSubmit(e) {
        e.preventDefault()

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

