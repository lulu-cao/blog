<template>
  <Slider />
  <div v-if="showAddPost">
    <!-- "AddPost" only occurs when users click on the button to add a post. -->
    <AddPost @add-post="addPost" />
  </div>
  <div>
    <Posts @toggle-status="toggleStatus" @delete-post="deletePost" :posts="posts"/>
  </div>
  <Alerts v-if="isAlertOpen" @closeSuccessAlert="closeSuccessAlert" :isSuccessAlertOpen="isSuccessAlertOpen" />
</template>

<script>
import Posts from '../components/Posts.vue'
import AddPost from './AddPost.vue'
import Slider from '../components/Slider.vue'
import Alerts from '../components/Alerts.vue'

export default {
  name: 'Home',
  components: {
    Posts,
    AddPost,
    Slider,
    Alerts,
  },
  props: {
    showAddPost: Boolean,
  },
  data() {
    return {
      posts: [],
      isSuccessAlertOpen: false,
      isFailureAlertOpen: false,
      isAlertOpen: false
    }
  },
  methods: {
    deletePost(id) {
      if(confirm('Are you sure?')) {
        this.posts = this.posts.filter((post) => post.id !== id)
      }
    },
    addPost(post) {
      this.posts = [...this.posts, post];
      this.isAlertOpen = true;
      this.isSuccessAlertOpen = true;
    },
    closeSuccessAlert() {
      this.isSuccessAlertOpen = false;
      this.isAlertOpen = false;
    },
    toggleStatus(id) { 
      this.posts = this.posts.map((post) => 
        post.id === id ? { ...post, unfinished: !post.unfinished } : post 
      )
    },
    // Example code for fetching data from the backend API
    // async fetchPosts() {
    //   const res = await fetch('https://backend')
    //   const data = await res.json()
    //   return data
    // }
    // async fetchPost(id) {
    //   const res = await fetch(`https://backend/${id}`)
    //   const data = await res.json()
    //   return data
    // }


    // Correspondingly, the front-end will receive data in created()
    // async created() { this.posts = await this.fetchPosts() }
        
    
    // Correspondingly, to add a post, we can change the method to below
    // async addPost(post) {
    // const res = await fetch('https://backend', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(post),
    // })
    // const data = await res.json()
    // this.posts = [...this.posts, data]
    // }
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
        review: "What a wild imagination! The book has a parallel of two stories that turn out to be one. The story is humorous, bizarre, and interesting. A messed-up mind desires for the power of the mind. Will the protagonist find the mind again in that perfect, mind-free world? Since the librarian found her mind back, I think the protagonist also got part of his mind back. Maybe eventually he will get most of his mind back.",
        unfinished: false,
      },
      {
        id: 4,
        book: '1984',
        author: 'George Orwell', 
        date: "2022",
        review: "Everyone desires to be valued by others, by the community, and the society. But they are not valued in a totalitarian state. This book has exhibited extreme totalitarianism, where thoughts can be a crime, memory is the only reliable evidence, people choose to forget the truth and forget that they forget, the powerful seek to alter people's desires, and enemies are not killed until they are tortured and turned into perfect comrades (that they will choose to follow and contribute to the Party out of their free will and rationality). Totalitarianism is the result of winning power. It's still popular today. Even in today's society, individuals are always scrutinized if they are not rational. If one thinks in a very different way, others will fear you or hate you. The dangerously mentally ill are always imprisoned in their facilities. There’s always surveillance. But it’s hard to believe that a totalitarian society as extreme as the Oceania society would really exist. I always believed that the extremity of one thing can easily be its opposite. When one is the happiest, one can easily feel sadness. Just like talks of blind variation and selected survival, there’s doomed to be changes, a strike to the cage. But maybe such a society could really exist. When the group becomes so homogeneous, so distant from remote differences, it’s hard to meet conflicts and become forced to reflect and change. Am I living in an illusion that the class structure is indestructible just as Oceania people believe that Big Brother and the Party are infallible? But then still, nothing lasts. There’s doomed to be changes. One of the most important things that the Oceania society seems to be teaching is that if someone asks you what you want, the best answer is power. The power to not be abused, the power to do what you want, the power to not be afraid. But, while you can use power to do anything, there’s one thing you can’t do, and that is to decrease your power. In today’s world, science and technology mean power. If you stifle them, other inventors will eventually overpower you. If one society stifles them, other societies will eventually overpower it. But here is the dilemma. If the powerful don't give up on science and technology, there's always the possibility that their tools get stolen and misused by their enemies. So, balance and checks are always possible and changes will come eventually and maybe accidentally. On the other hand, however, it's hard to live as an individual in Oceania society. Without ways to find reliable allies, individuals' power is limited and the struggle can be centuries-long. This is why the powerful seek to destroy associations.", 
        unfinished: false,
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