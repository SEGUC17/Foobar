// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import './assets/css/bootstrap.css'
import './assets/css/responsive.css'
import './assets/css/style.css'
import './assets/css/touchTouch.css'
import './assets/css/kwicks-slider.css'
import './assets/js/jquery.js'
import './assets/js/superfish.js'
import './assets/js/jquery.flexslider-min.js'
import './assets/js/jquery.kwicks-1.5.1.js'
import './assets/js/jquery.easing.1.3.js'
import './assets/js/jquery.cookie.js'
import './assets/js/touchTouch.jquery.js'
import './assets/js/bootstrap.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


