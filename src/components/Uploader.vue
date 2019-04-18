<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Post</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="post" placeholder="Tweet"></textarea>
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      post: '',
      error: '',
    }
  },
  methods: {
    close() {
        this.$emit('escape');
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('post', this.post);
        console.log(formData);
        this.error = await this.$store.dispatch("upload", formData);
        location.reload();
        if (!this.error) {
          console.log("!this.error");
          this.title = '';
          this.post = '';
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>