<template>
  <div id="app">
    <app-nav></app-nav>
    <!--<div class="app-content">
      <router-view></router-view>
    </div>-->
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNav from './AppNav.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'app',
  components: { AppNav, AppFooter },
  data () {
    return {
      
    }
  },
}
</script>

