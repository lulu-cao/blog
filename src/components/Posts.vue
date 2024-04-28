<template>
  <div class="mx-5">
    <h3>{{ totalBlog }}</h3>
    <h3>
      Contributors: <span v-for="contributor, index in contributors" :key="index">{{ contributor + " " }}</span>
    </h3>
    <Post
      :key="post.id"
      v-for="post in posts"
      @toggle-status="$emit('toggle-status', post.id)"
      @delete-post="$emit('delete-post', post.id)"
      :post="post"
    />
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  name: 'Posts',
  props: {
    posts: Array,
  },
  components: {
    Post
  },
  data() {
    return {
      reviewers: []
    }
  },
  emits: ['delete-post', 'toggle-status'],
  computed: {
    totalBlog() {
      return "Total number of blogs: " + this.posts.length
    },

    contributors() {
      this.posts.forEach(post => {
        if (post.reviewer) {
          this.reviewers.push(post.reviewer)
        }}
      )

      this.reviewers = [...new Set(this.reviewers)];
      return this.reviewers
    }
  }
}
</script>
