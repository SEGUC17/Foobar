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
import SPReservations from '@/components/SPReservations.vue'
import SPReviews from '@/components/SPReviews.vue'
import EditStudentProfile from '@/components/EditStudentProfile.vue'
import Offers from '@/components/Offers.vue'
import ReservationStudent from '@/components/ReservationStudent.vue'
import ReviewInterest from '@/components/ReviewInterest.vue'
import ServiceProviderProfile from '@/components/ServiceProviderProfile.vue'
import Interests from '@/components/Interests.vue'
import pendingSP from '@/components/pendingSP.vue'


Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [
    {
    path: '/',
    component: Hello
    }, 
    {
    path: '/announcements',
    component: Announcements
    },
    {
      path: '/SPPostAnnouncement',
      component: SPPostAnnouncement
    },
    {
      path: '/SPPostOffer',
      component: SPPostOffer
    },
    {
      path: '/SPAssess',
      component: SPAssess
    },
    {
      path: '/SPEditProfile',
      component: SPEditProfile
    },
    {
      path: '/applySP',
      component: ApplySP
    },
    {
      path: '/SPReservations',
      component: SPReservations
    },
    {
      path: '/SPReviews',
      component: SPReviews
    },
    {
      path: '/sPs',
      component: ServiceProviders
    },
    {
      path: '/viewAdmins',
      component: viewadmin
    },
    {
      path: '/viewOffers',
      component: Offers
    }, 
    {
      path: '/viewReservations',
      component: ReservationStudent
    }, 
    {
      path: '/reviewData',
      component: ReviewInterest
    }, {
          path: '/sps/:id',
          name:'service provider',
        component: ServiceProviderProfile
       }
    , {
         path: '/EditStudent/:EditStudid',
        name:'EditStudent',
         component: EditStudentProfile
      }
    , {
         path: '/student/:Studid',
         name:'StudentProfile',
          component: StudentProfile
     },  {
         path: '/viewInterests',
         component: Interests
     },
         {
         path: '/pendingSP',
         component: pendingSP
        }]
})
