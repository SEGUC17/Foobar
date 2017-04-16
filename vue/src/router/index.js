import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Announcements from '@/components/Announcements'
import ServiceProviders from '@/components/ServiceProviders.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import vueResource from 'vue-resource'
Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [{
    path: '/',
    component: Hello
  }, {
    path: '/announcements',
    component: Announcements
  }, {
    path: '/sPs',
    component: ServiceProviders
  }, {
    path: '/StudentProfile',
    component: StudentProfile
  }]
})
