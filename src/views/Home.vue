<template>
<div class="home">
  <tweets :posts="posts" />
</div>
</template>

<script>
// @ is an alias to /src
import Tweets from '@/components/Tweets.vue'

export default {
  name: 'home',
  components: {
    Tweets
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPosts");
  },
}
</script>
