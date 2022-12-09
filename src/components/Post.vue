<template>
  <div @dblclick="$emit('toggle-status', post.id)" class="post" :class="completionStatus">
    <h3>
      <b>{{ post.book }}</b>
      <i @click="onDelete(post.id)" class="fas fa-times"></i>
    </h3>
    <h4>by {{ post.author }}</h4>
    <h4>
      <span v-if="post.reviewer">Reviewer: {{ post.reviewer }}</span>
      <span v-if="(post.reviewer && post.date)">, </span>
      <span v-if="post.date">Review Date: {{ post.date }}</span>
    </h4>
    <p>{{ post.review }}</p>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object,
  },
  methods: {
    onDelete(id) {
      this.$emit('delete-post', id)
    }
  },
  computed: {
    completionStatus() {
      return this.post.unfinished ? 'unfinished' : ''
    }
  }
}
</script>

<style scoped>
.fas {
  color: red;
}
.post {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.post.unfinished {
  border-left: 5px solid green;
}
.post h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>