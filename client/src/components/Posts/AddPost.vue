<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary-text">Add Post!</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form @submit.prevent="handleAddPost" v-model="isFormValid" lazy-validation ref="form">
          <!-- Post Title -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                :rules="titleRules"
                v-model="title"
                type="text"
                required
                label="Post Title"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                :rules="imageRules"
                v-model="imageUrl"
                type="text"
                required
                label="Image Url"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="300px">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-select
                v-model="categories"
                :items="['Art','Animals', 'Travel', 'Photography']"
                multiple
                label="Categories"
                :rules="categoriesRules"
              ></v-select>
            </v-flex>
          </v-layout>



          <v-layout row>
            <v-flex xs12>
              <v-textarea
                :rules="descRules"
                v-model="description"
                type="text"
                required
                label="Post Description"
              ></v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-btn :loading="loading" color="accent" type="submit" :disabled="!isFormValid">
                Sign In
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
              
                <router-link to="/">Submit</router-link>
              
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "AddPost",
  data() {
    return {
      isFormValid: true,
      title:"",
      imageUrl:"",
      categories:[],
      description:"",
      titleRules:[
          title => !!title || 'Title is required',
          title => title.length< 20 || 'Title should be have less than 20 chars '
      ],
       imageRules:[
          imageUrl => !!imageUrl || 'Title is required'
      ],
        categoriesRules:[
          categories => categories.length >=1 || 'At least one category is required'
      ],

         descRules:[
          description => !!description || 'Description is required',
          description => description.length < 200  || 'Title should be have less than 20 chars '

      ],

    };
  },
    computed:{
        ...mapGetters(['loading', 'user'])
    },
  methods:{
    handleAddPost(){
        if(this.$refs.form.validate()){
            this.$store.dispatch('addPost', {
                title: this.title,
                imageUrl: this.imageUrl,
                categories:this.description,
                creatorId: this.user._id,
                description:this.description
            }
            );
            this.$router.push('/')
        }
        }
    }
  
};
</script>
