import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Announcements from '@/components/Announcements'
import ServiceProviders from '@/components/ServiceProviders.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import vueResource from 'vue-resource'
Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/announcements',
    component: Announcements
  }, {
    path: '/sPs',
    component: ServiceProviders
  }, {
    path: '/StudentProfile',
    component: StudentProfile
  }],
  mode: 'history'
})
