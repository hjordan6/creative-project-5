<template>
<div>
  <div class="image" v-for="post in posts" v-bind:key="post._id">
    <strong><p class="postTitle">{{post.title}}</p></strong>
    <p>{{post.post}}</p>
    <p class="postDate">
      <span v-if="post.user.name">{{post.user.name}}, </span>
      {{formatDate(post.created)}}
    </p>
    <button v-on:click="deletePost(post)">Delete</button>
    <hr>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Tweets',
  props: {
    posts: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async deletePost(post) {
      console.log("Tweets: " + post.title);
      try {
        //const formData = new FormData();
        //formData.append('title', post.title);
        let response = await this.$store.dispatch("delete", post.title);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}

.tweet {
  background-color: aqua;
}
</style>