import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Announcements from '@/components/Announcements'
import ServiceProviders from '@/components/ServiceProviders.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import SPEditProfile from '@/components/SPEditProfile.vue'
import vueResource from 'vue-resource'
import viewadmin from '@/components/viewadmin.vue'
import SPPostAnnouncement from '@/components/SPPostAnnouncement.vue'
import SPPostOffer from '@/components/SPPostOffer.vue'
import SPAssess from '@/components/SPAssess.vue'
import ApplySP from '@/components/ApplySP.vue'
import AdminSP from '@/components/AdminSP.vue'
import viewAllStudents from '@/components/viewAllStudents.vue'
import SPViewMyProfile from '@/components/SPViewMyProfile.vue'
import SPReservations from '@/components/SPReservations.vue'
import SPReviews from '@/components/SPReviews.vue'
import EditStudentProfile from '@/components/EditStudentProfile.vue'
import Offers from '@/components/Offers.vue'
import ReservationStudent from '@/components/ReservationStudent.vue'
import ReviewInterest from '@/components/ReviewInterest.vue'
import ServiceProviderProfile from '@/components/ServiceProviderProfile.vue'
import Interests from '@/components/Interests.vue'
import pendingSP from '@/components/pendingSP.vue'
import test from '@/components/test.vue'
import Adminpostannouncement from '@/components/Adminpostannouncement.vue'
import VeeValidate from 'vee-validate'
import AppNav from '../AppNav.vue'
import Quiz from '@/components/TheTest'
import AllOffers from '@/components/AllOffers'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import VueCarousel from 'vue-carousel';


Vue.use(VueChartkick, {
  Chartkick
})

Vue.use(Router)
Vue.use(vueResource)
Vue.use(VeeValidate);
Vue.use(VueCarousel);
export default new Router({
  routes: [{
    path: '/',
    component: Hello
  }, {
    path: '/test',
    component: test,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 2) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/quiz',
    component: Quiz,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 2) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }

  }, {
    path: '/announcements',
    component: Announcements,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }


  }, {
    path: '/Adminpostannouncement',
    component: Adminpostannouncement,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPPostAnnouncement',
    component: SPPostAnnouncement,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPPostOffer',
    component: SPPostOffer,
    beforeEnter: (to, from, next) => {
      console.log(localStorage.getItem('usertype'));
      if (localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPAssess',
    component: SPAssess,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPEditProfile',
    component: SPEditProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/applySP',
    component: ApplySP
  }, {
    path: '/adminSP',
    component: AdminSP,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPReservations',
    component: SPReservations,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 3 && localStorage.getItem(
          'usertype') != 2) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPReviews',
    component: SPReviews,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/sPs',
    component: ServiceProviders,

    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/viewAdmins',
    component: viewadmin,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {


        next()
      }
    }
  }, {
    path: '/viewOffers',
    component: Offers,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/AllOffers',
    component: AllOffers,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/viewReservations',
    component: ReservationStudent,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 2 && localStorage.getItem(
          'usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/reviewData',
    component: Interests,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/viewAllStudents',
    component: viewAllStudents,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/sps/:id',
    name: 'service provider',
    component: ServiceProviderProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/EditStudent/:EditStudid',
    name: 'EditStudent',
    component: EditStudentProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 2) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/student/:Studid',
    name: 'StudentProfile',
    component: StudentProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1 && localStorage.getItem(
          'usertype') != 2 && localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/viewInterests',
    component: Interests,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/SPViewMyProfile',
    component: SPViewMyProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 3) {
        next('/');
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }, {
    path: '/pendingSP',
    component: pendingSP,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usertype') != 1) {
        next('/')
        swal(
          'Oops...',
          'You shall not pass!!',
          'error'
        )
      } else {
        next()
      }
    }
  }],
  mode: 'history'
})
