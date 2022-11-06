<template>
  <router-link id="title" to="./about">About</router-link>
  <img src="../assets/lulu.jpg" />
  <img src="../assets/ian.jpg" />
  <p>Lulu and Ian were married in 2021. They are both full-stack software engineers. Lulu is learning Vue recently and Ian is learning Java recently. So, they decided to make a site together. Lulu will use Vue to create the front-end and Ian will use Java to create the back-end.</p>
  <br />
  <router-link to="/">Go Back</router-link>
</template>

<script>
export default {
  props: {
    showAddPost: Boolean,
  }
}

</script>
<style scoped>
  #title {
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    display: block;
  }

  img {
    height: 20rem;
    width: 16rem;
    margin-top: 1.5rem;
    margin-right: 1rem;
  }
</style>