<template>
  <div :key="post.id" v-for="post in posts">
    <Post @toggle-status="$emit('toggle-status', post.id)" @delete-post="$emit('delete-post', post.id)" :post="post" />
  </div>
</template>

<script>
import Post from './Post'

  export default {
    name: 'Posts',
    props: {
      posts: Array,
    },
    components: {
      Post
    },
    emits: ['delete-post', 'toggle-status'],
  }
</script>