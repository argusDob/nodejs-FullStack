<template>
  <v-container
    text-xs-center
    mt-5
    pt-5
  >

    <v-layout
      row
      wrap=""
    >

      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>
    <v-layout
      v-if="error"
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <form-alert :message="error.message"> </form-alert>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-card
          color="secondary"
          dark
        >
          <v-container>
            <v-form @submit.prevent="handleSignInUser" v-model= "isFormValid" lazy-validation ref="form">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="face"
                    :rules="usernameRules"
                    v-model="username"
                    type="text"
                    required=""
                    label="Username"
                  > </v-text-field>
                </v-flex>

              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="lock"
                    :rules="passwordRules"
                    v-model="password"
                    type="password"
                    required
                    label="PassWord"
                  > </v-text-field>
                </v-flex>

              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :loading="loading"
                    color="accent"
                    type="submit"
                    :disabled="!isFormValid"
                  >Sign In
                    <span
                      slot="loader"
                      class="custom-loader"
                    >
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                  <h3>Already have an account?Already
                    <router-link to="/signup">Sign Up</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      isFormValid:"true",
      usernameRules:[
      username => !!username || "Username Required",
      username => username.length < 10 || "Username should be less than 10 chars",

      ],
      passwordRules:[
        password => !!password || "Password required",
        // password => password.length >= 7 || "Password should be at least 7 chsrs",

      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "user", "error"])
  },
  watch: {
    user(value) {
      //if the user value changes from null to obj ,redirect to Home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSignInUser() {
      if(this.$refs.form.validate()){
      this.$store.dispatch("signInUser", {
        username: this.username,
        password: this.password
      });
      }
    }
    
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>