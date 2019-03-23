import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "./main";
import {GET_POSTS, SIGNIN, SIGNUP} from "./quires"


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    posts:[],
    loading: false,
  },

  mutations: {
    setPosts:(state, payload)=>{
      state.posts=payload;
    },

    setLoading:(state ,payload) =>{
      state.loading=payload;
    },
  
  },
  actions: {
    //  The getPost method call an ApolloClient query and use the gql syntax to fire the post in a query 
    //print the data and catch an error . It is the same logic like fetch or axios.
    getPosts: ({commit}) => {
      commit("setLoading", true);
      apolloClient.query({
        query: GET_POSTS
      }).then( ({data}) =>{
        //Get data fron action to state via mutation 
        // commit  passes data from actions along to mutations function
        commit('setPosts', data.getPosts); //pass data to the mutation 
        commit("setLoading", false);
        console.log(data.getPosts);
        console.log(data);
      })
      .catch(err => {
        commit("setLoading", false);
        console.log(err);
      })
    },

    signInUser: ({commit}, payload) => {
      apolloClient
      .mutate({
        mutation:SIGNIN,
        variables:payload
      })
      .then(({data}) => {
        console.log(data.signInUser)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  getters:{
    posts:state => state.posts,
    loading:state=>state.loading
  }
});
