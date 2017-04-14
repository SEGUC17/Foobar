import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import vueResource from 'vue-resource'
Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  }]
})
