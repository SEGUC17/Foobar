// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

//User Interface
import './assets/css/animate.css'
import './assets/css/icomoon.css'
import './assets/css/simple-line-icons.css'
import './assets/css/magnific-popup.css'
import './assets/css/bootstrap.css'
import './assets/css/style.css'

import './assets/js/jquery.js'
import './assets/js/jquery.easing.1.3.js'
import './assets/js/magnific-popup-options.js'
import './assets/js/jquery.waypoints.min.js'
import './assets/js/jquery.stellar.min.js'
import './assets/js/jquery.countTo.js'
import './assets/js/jquery.magnific-popup.min.js'
import './assets/js/bootstrap.js'
import './assets/js/main.js'

// NOT ESSENTIAL
// import './assets/js/google_map.js'
// import './assets/js/modernizr-2.6.2.min.js'

// Admin Panel
import './assets/css/custom.css'
import './assets/css/nprogress.css'

import './assets/js/custom.js'
import './assets/js/nprogress.js'
import './assets/js/fastclick.js'


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDq7HrM5ZibvpbrgXmPjGw5HJKQp3mbc2U',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


