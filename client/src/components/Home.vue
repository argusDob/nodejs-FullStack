<template>
  <v-container text-xs-center >
    <v-layout row>
    <v-dialog v-model="loading" persistent fullscreen>
<v-container fill-height>
<v-layout row justify-center align-center> </v-layout>
   <v-progress-circular indeterminate :size="70" :width="7" color="secondary">

   </v-progress-circular>
</v-container>
    </v-dialog>
    </v-layout>
    
  
      
    <v-flex xs12>
      <v-carousel v-if="!loading && posts.length > 0 "  v-bind="{ 'cycle': true }" interval="3000">
        <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";
import{mapGetters} from 'vuex';
import { loadavg } from 'os';
import VueMoment from 'vue-moment'
    import moment from 'moment'

export default {
     name: "home",
  data(){
   return{
     getPosts:""
   }
  },
  created(){
    this.handleGetCarouselPosts();
  },

  computed:{
      ...mapGetters(['loading','posts']),
      

      
  },
  methods:{
     handleGetCarouselPosts(){
       this.$store.dispatch("getPosts");
      //  console.log(this.$store.dispatch("getPosts")

     },

  }

};
</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
