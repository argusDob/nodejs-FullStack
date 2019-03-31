import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import FormAlert from './components/Shared/FormAlert'


//Import ApolloClient

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
Vue.component('form-alert', FormAlert);
Vue.use(VueApollo, VueMoment);

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  //include auth token witn request made to back end
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }



    // operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
      //catch graphql and networks errors 
      onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
          console.log("[networkError]", networkError);
        }
    
        if (graphQLErrors) {
          for (let err of graphQLErrors) {
            console.dir(err);
          }
        }
      }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created(){
    //execute getCurrentUser wuiry to get information about the user auth if the user exist
    //This i a later step for the use authorization
    this.$store.dispatch("getCurrentUser");

  }
}).$mount("#app");
