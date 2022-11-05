<template>
  <div class="container">
    <Header title="Lulu and Ian's Blog" @toggle-add-post="toggleAddPost" :showAddPost="showAddPost" />
    <div v-if="showAddPost">
      <AddPost @add-post="addPost" />
    </div>
    <Posts @toggle-status="toggleStatus" @delete-post="deletePost" :posts="posts"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Posts from './components/Posts.vue'
import AddPost from './components/AddPost.vue'

export default {
  name: 'App',
  components: {
    Header,
    Posts,
    AddPost,
  },
  data() {
    return {
      posts: [],
      showAddPost: false
    }
  },
  methods: {
    deletePost(id) {
      if(confirm('Are you sure?')) {
        this.posts = this.posts.filter((post) => post.id !== id)
      }
    },
    addPost(post) {
      this.posts = [...this.posts, post]
    },
    toggleAddPost() {
      this.showAddPost = !this.showAddPost
    },
    toggleStatus(id) { // this part doesn't work yet
      console.log("toggling")
      // this.posts = this.posts.map((post) => { 
      //   post.id === id ? post.unfinished = !post.unfinished : post })
      this.posts = this.posts.map((post) => { 
        post.id === id ? { ...post, unfinished: !post.unfinished } : post }
      )
    }
  },
  created() {
    this.posts = [
      {
        id: 1,
        book: 'Private Government: How Employers Rule Our Lives',
        author: 'Elizabeth S. Anderson', 
        date: "June 23, 2021",
        reviewer: "Lulu",
        review: "Private Government is an influential book in philosophy, especially among advocates of workplace democracy. In this book, Anderson provides a convincing argument that employers are private governments, having arbitrary power over their employees. The government is private because it intervenes with people's private matters, e.g. health habits, personal finance, and family members. In the past, many companies have intervened with employees' private matters, asking them to have good health habits and personal finance, and dismissing them for marrying certain persons. She also provides many modern examples, especially in her response to Cowen. For example, some companies restrict the time that employees can use bathrooms. Others fired employees because they are too beautiful. All these are due to employers' arbitrary and unaccountable power. This makes me think that instructors in the classroom also have this power. For example, some instructors will answer students' phone calls if their phones ring in the classroom. Anderson's response to Cowen is particularly useful for people in the middle and upper class because many of them have less knowledge of the situation of lower-paid unskilled workers. For those managers and employers who sincerely care about basic human rights, they need to seriously consider how the efficiency of the market and companies should balance with basic human rights. Anderson's argument can be understood both a priori and a posteriori. On the one hand, companies do have this arbitrary power that puts employees in an unequal social relation. Contracts are always incomplete so that employers can assign employees more tasks. Employers have the right to fire employees and make them not able to cover basic living expenses (usually unskilled workers). Freedom of exits is largely void because there are many practical barriers that prevent employees from leaving the job. These grant employers the power to do whatever they like on employees. On the other hand, many modern companies do wield this power, hurting employees' autonomy, standing, and esteem. In this book, Anderson has a modest intention to merely pose 'private government' as a framework of discussion and put workplace governance on the political agenda (p. 133). This framework echoes Foucault's famous framework of governmentality. State regulation, as she says, can increase employees' republican freedom, the freedom to not be subject to the arbitrary will, by putting restrictions on employers. In this case, even if employees' negative freedom, the freedom to not have intervention, decreases, their total freedom increases. Anderson also has four specific suggestions if readers want to learn more about potential solutions (see pp. 65-71). This is my first time reading a work on workplace democracy and I am curious to learn more about this issue.",
        unfinished: false,
      },
      {
        id: 2,
        book: 'The Invisible Life of Addie LaRue',
        author: 'V.E. Schwab', 
        date: "October 14, 2021",
        reviewer: "Lulu",
        review: "This book has truly beautiful descriptions, imaginations, and philosophical questions and sentiments. The story alternates between the present (2013-2014) and the past (mainly 18c and 19c), and thus between the troubles Adeline met before and how she handles reality now. Adeline's (Addie's) desire might be similar to many people's desires. When I am a child, I dreamt of being someone with wings so I can fly wherever I want. The strong desire for freedom, independence, and time is my desire as well. Her deal with the darkness and the following experience, however, is like a wild thought experiment philosophers like to make. One thing I'm concerned about is that the story is a bit 'good-natured'. While Adeline often lives life as the poorest class who does not have a home, she seems to suffer only from hunger, heat, and sexism, etc. I don't think I've seen her suffer from rape, abuse, violence, and strong sexist discrimination, which a person like her very likely has suffered. Addie can live on the street and deserted places. But no one seems to harm her during her sleep.",
        unfinished: false,
      },
      {
        id: 3,
        book: 'Hard-Boiled Wonderland and the End of the World',
        author: 'Haruki Murakami, Alfred Birnbaum (Translator)', 
        date: "March 17, 2022",
        reviewer: "Lulu",
        review: "	What a wild imagination! The book has a parallel of two stories that turn out to be one. The story is humorous, bizarre, and interesting. A messed-up mind desires for the power of the mind. Will the protagonist find the mind again in that perfect, mind-free world? Since the librarian found her mind back, I think the protagonist also got part of his mind back. Maybe eventually he will get most of his mind back.",
        unfinished: false,
      },
      {
        id: 4,
        book: '1984',
        author: 'George Orwell', 
        date: "2022",
        unfinished: true,
      },
      {
        id: 5,
        book: 'The Odyssey',
        author: 'Homer', 
        date: "2022",
        unfinished: true,
      }
    ]
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  padding: 30px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
