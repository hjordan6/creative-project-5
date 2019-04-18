import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async register(context, data) {
      console.log("store register");
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        console.log("store register error: " + error.response.data.message);
        return error.response.data.message;
      }
    },
    async login(context, data) {
      console.log("store login");
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      console.log("store logout");
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      console.log("store get user");
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async upload(context, data) {
      try {
        await axios.post('/api/posts', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyPosts(context) {
      try {
        let response = await axios.get("/api/posts");
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllPosts(context) {
      try {
        let response = await axios.get("/api/posts/all");
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async delete(context, data) {
      console.log("Store: " + data);
      let response = await axios.delete("/api/posts/delete/" + data);
    }
  },
  
});
