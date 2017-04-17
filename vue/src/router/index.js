import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Announcements from '@/components/Announcements'
import ServiceProviders from '@/components/ServiceProviders.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import vueResource from 'vue-resource'
import viewadmin from '@/components/viewadmin.vue'
import SPPostAnnouncement from '@/components/SPPostAnnouncement.vue'

Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [{
    path: '/',
    component: Hello
  }, {
    path: '/announcements',
    component: Announcements
  },{
    path: '/SPPostAnnouncement',
    component: SPPostAnnouncement
  },{
    path: '/sPs',
    component: ServiceProviders
  }, {
    path: '/StudentProfile',
    component: StudentProfile
  }, {
    path: '/viewAdmins',
    component: viewadmin
  }, ]
})
