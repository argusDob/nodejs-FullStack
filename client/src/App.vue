<template>
  <v-app style="background: #Ε3Ε3ΕΕ">
    <!-- Side nav bar -->
    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
    >
      <v-toolbar
        color="accent"
        dark
        flat
      >
        <v-toolbar-side-icon @click="toogleSideNav"></v-toolbar-side-icon>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          <h1 class="title pl-3">My project</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>
      <!-- Side Nav Bar Links -->
      <v-list>
        <v-list-tile
          ripple
          v-for="items in sideNavItems"
          :key="items.title"
          :to="items.link"
          class="centered"
        >
          <v-list-tile-action>
            <v-icon>{{items.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{items.title}}
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile
          v-if="user"
          @click="handleSignOutUser"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Sign Out
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <!-- horizontal navbar      -->
    <v-toolbar
      fixed
      color="primary"
      dark
    >
      <v-toolbar-side-icon @click="toogleSideNav"></v-toolbar-side-icon>
      <!-- App title -->
      <v-tool-bar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          My project
        </router-link>

      </v-tool-bar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search Posts "
        single-line
        hide-details
        color="accent"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <!-- Profile Button -->
        <v-btn
          flat
          to="/profile"
          v-if="user"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >account_box</v-icon>
          <v-badge
            right
            color="blue darken-5"
          >
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>

        <!-- SignOut Button -->
        <v-btn
          flat
          v-if="user"
          @click="handleSignOutUser"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >exit_to_app</v-icon>
          Sign Out
        </v-btn>

      </v-toolbar-items>

    </v-toolbar>

    <!-- app content -->
    <main>

      <v-container class="mt-4">
        <!-- Set transition between the pages -->
        <transition name="fade">
          <router-view />
        </transition>
        <!-- Add SnackBar -->
        <v-snackbar v-model="authSnackBar" color="success" :timeout="5000" bottom left> <h3>You have log in  </h3>
          <v-icon clas="mr-3"> check_circle </v-icon>
          <v-btn dark flat @click="authSnackBar = false">Close</v-btn>
        </v-snackbar>

           <v-snackbar v-if="authError" v-model="authErrorSnackBar" color="error" bottom left> <h3>{{authError.message}}  </h3>
          <v-icon clas="mr-3"> cancel </v-icon>
          <v-btn dark flat to="/signin">signIn again</v-btn>
        </v-snackbar>

      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackBar:false,
      authErrorSnackBar:false
    };
  },
  watch:{
  user(newValue,oldValue){
    //if we had no value for user,before ,show snack bar
    console.log(oldValue)
    console.log(newValue)
    if(oldValue === null){
      this.authSnackBar = true
    //  this.$router.push("/");

    }
  },
  authError(value){
    //if authError is not null show auth error snackbar
    if(value !== null){
      this.authErrorSnackBar = true;
    }
  }
  },
  computed: {
    //give acess to the user data from vuex
    ...mapGetters(["user", "authError"]),

    horizontalNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ icon: "chat", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "chat", title: "Posts", link: "/posts" },
          { icon: "star", title: "Create Posts", link: "post/add" },
          { icon: "account_box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSignOutUser() {
      this.$store.dispatch('signOutUser');
    },
    toogleSideNav() {
      this.sideNav = !this.sideNav;
    },

    buttonMessage: function() {
      switch (this.docState) {
        case "saved":
          return "Edit";
        case "edited":
          return "Save";
        case "editing":
          return "Cancel";
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leace-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
