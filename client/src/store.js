import Vue from "vue";
import Vuex from "vuex";
import Router from "./router"

import { defaultClient as apolloClient } from "./main";
import {GET_POSTS, SIGNIN, SIGNUP, GET_CURRENT_USER} from "./quires"
import router from "./router";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    posts:[],
    user : null,
    loading: false,
    error:null,
  },

  mutations: {
    setPosts:(state, payload)=>{
      state.posts=payload;
    },
     setUser(state, payload){
        state.user=payload;
     },
    setLoading:(state ,payload) =>{
      state.loading=payload;
    },
    setError:(state,payload) => {
      state.error=payload
    },
    clearUser: state => (state.user =null),
    clearError: state => (state.error =null)

  
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          // Add user data to state
          commit("setUser", data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
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
        // console.log(data.getPosts);
        // console.log(data);
      })
      .catch(err => {
        commit("setLoading", false);
        console.log(err);
      })
    },

    signInUser: ({commit}, payload) => {
      commit('clearError')
      commit('setLoading', true)
     // if the token change or expire set a new one Thanks local storage :) :)
      localStorage.setItem('token', '');
      apolloClient
      .mutate({
        mutation:SIGNIN,
        variables:payload
      })
      .then(({data}) => {
        commit('setLoading', false)
        console.log(data.signInUser)
        //we sent the token to appollo Client so the brpwser can validate the user
        //set the token key and the data sign in user token obj
        //you can see the token on the browser if you click in app slector
        localStorage.setItem('token', data.signInUser.token);
        //to make sure created method is run in main.js (we run get CurrentlyUse)
        //reload the page When the user click on the sign in button the page reload
        router.go();
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError',err)
        console.log(err)
      })
    },
       //clear user in state 
       //remove the token from the localStorage so the user cannot authendicate again
       //end the session
     signOutUser: async ({commit}) => {
       //trigger the clear user mutation and set the value to null
        commit('clearUser');
        localStorage.removeItem('token', '');
         //end session and redirect to Home
        //from Apollo Docs client.resetStore() after your login or logout process has completed. 
        //This will cause the store to be cleared and all active queries to be refetched.
        await apolloClient.resetStore();
        router.push('/')
      }
  }, 
  getters:{
    posts:state => state.posts,
    user:state => state.user,
    loading:state=>state.loading,
    error:state=>state.error
  }
});
