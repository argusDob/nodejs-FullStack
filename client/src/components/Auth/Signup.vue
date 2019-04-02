<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form
              @submit.prevent="handleSignUpUser"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="face"
                    :rules="usernameRules"
                    v-model="username"
                    type="text"
                    required
                    label="Username"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="email"
                    :rules="emailRules"
                    v-model="email"
                    type="text"
                    required
                    label="Email"
                  ></v-text-field>
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
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="lock"
                    :rules="passwordRules"
                    v-model="passwordConfirmation"
                    type="password"
                    required
                    label="Confirm Password"
                  ></v-text-field>
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
                  <h3>
                    Already have an account?Already
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
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      // loading: true,
      username: "",
      password: "",
      email:"",
      passwordConfirmation: "",
      usernameRules: [
        username => !!username || "Username Required",
        username =>
          username.length < 10 || "Username should be less than 10 chars"
      ],
      emailRules: [
        email => !!email || "Email Required",
        email => /.@+./.test(email) || "Email must be valid"
      ],
      passwordRules: [
        password => !!password || "Password Required",
        password =>
          password.length >= 4 || "Password must be at least 4 chars",
          confirmation => confirmation === this.password || 'Password must be the same'
      ]
    };
  },

    computed: {
    ...mapGetters(["error", "loading"])
  },

    watch: {
    user(value) {
      //if the user value changes from null to obj ,redirect to Home page
      if (value) {
        console.log(value);
        this.$router.push("/home");
      }
    }
    },
  methods: {
    handleSignUpUser() {
      // fire the action baby and give me a new user in the mongoDB
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signUpUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
    
};
</script>
