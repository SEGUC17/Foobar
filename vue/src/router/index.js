import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Announcements from '@/components/Announcements'
import ServiceProviders from '@/components/ServiceProviders.vue'
import ServiceProviderProfile from '@/components/ServiceProviderProfile.vue'
import pendingSp from '@/components/pendingSp.vue'
import Offers from '@/components/Offers.vue'
import Reservations from '@/components/ReservationStudent.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import ReviewData from '@/components/ReviewInterest.vue'
import EditStudent from '@/components/EditStudentProfile.vue'
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
    path: '/pendingSp',
    component: pendingSp
  }
  , {
    path: '/viewOffers',
    component: Offers
  }, {
    path: '/viewReservations',
    component: Reservations
  }, {
    path: '/reviewData',
    component: ReviewData
  }

  , {
        path: '/sps/:id',
        name:'service provider',
        component: ServiceProviderProfile
      }
       , {
        path: '/EditStudent/:EditStudid',
        name:'EditStudent',
        component: EditStudent
      }
       , {
        path: '/student/:Studid',
        name:'StudentProfile',
        component: StudentProfile
      }

      ],
  mode: 'history'
})
