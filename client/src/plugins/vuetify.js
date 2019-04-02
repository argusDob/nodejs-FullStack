import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  theme: {
    "primary": "#3B125F",
    "secondary": "#8B5FBF",
    "accent": "#BF653F",
    "error": "#722530",
    "info": "#A37513",
    "success": "#38924f",
    "warning": "#4caf50"
  }
})
