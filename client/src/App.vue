<template>
  <v-app style="background: #Ε3Ε3ΕΕ">
    <!-- Side nav bar -->
<v-navigation-drawer app temporary fixed v-model="sideNav"  >
 <v-toolbar color="accent" dark flat>
   <v-toolbar-side-icon @click="toogleSideNav" ></v-toolbar-side-icon>
       <router-link to="/" tag="span" style="cursor: pointer">
    <h1 class="title pl-3">My project</h1>
    </router-link>
 </v-toolbar>

 <v-divider></v-divider>
 <!-- Side Nav Bar Links -->
 <v-list>
<v-list-tile ripple v-for="items in sideNavItems" :key="items.title" :to="items.link" class="centered">
  <v-list-tile-action>
    <v-icon>{{items.icon}}</v-icon>
  </v-list-tile-action>
  <v-list-tile-content>
    {{items.title}}
  </v-list-tile-content>


</v-list-tile>
 </v-list>


</v-navigation-drawer>


<!-- horizontal navbar      -->
<v-toolbar fixed color="primary" dark>
  <v-toolbar-side-icon @click="toogleSideNav"></v-toolbar-side-icon>
  <!-- App title -->
  <v-tool-bar-title class="hidden-xs-only">
    <router-link to="/" tag="span" style="cursor: pointer">
    My project
    </router-link>
  
  </v-tool-bar-title>
<v-spacer></v-spacer>
<v-text-field flex prepend-icon="search" placeholder="Search Posts " single-line hide-details color="accent"></v-text-field>
<v-spacer></v-spacer>
<v-toolbar-items class="hidden-xs-only">
  <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
    <v-icon  class="hidden-sm-only" left>{{item.icon}}</v-icon>
    {{item.title}}
    </v-btn>
</v-toolbar-items>

</v-toolbar>

<!-- app content -->
     <main>

       <v-container class="mt-4">
         <transition name="fade">
    <router-view/>
         </transition>
       </v-container>
     </main>
  </v-app>
</template>

<script>
export default{
  name:"App", 
  data(){
    return{
      sideNav:false
    }


  },
  computed:{
    horizontalNavItems() {
      return [
      {icon:'chat', title:'Posts', link:'/posts'},
      {icon:'lock_open', title:'Sign In', link:'/signin'},
      {icon:'create', title:'Sign Up', link:'/signup'},

  ]
 },
    sideNavItems() {
      return [
      {icon:'chat', title:'Posts', link:'/posts'},
      {icon:'lock_open', title:'Sign In', link:'/signin'},
      {icon:'create', title:'Sign Up', link:'/signup'},

  ]
 }

  },
  methods:{
    toogleSideNav(){
    this.sideNav = !this.sideNav
    },

     buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }

  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active{
transition-property: opacity;;
transition-duration: 0.25s;
}
.fade-enter-active{
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leace-active{
  opacity: 0;
  transform:translateY(-25px);
}
</style>
