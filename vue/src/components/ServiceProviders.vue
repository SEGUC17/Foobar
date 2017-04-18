<template>
<div>

  <ul>
    <li v-for=" serviceprovider in serviceproviders">{{serviceprovider.email}}</li>
  </ul>


</div>
</template>
<script>
export default {
  name: 'serviceprovider',
  data () {
    return {
      serviceproviders:[]
    }
  },
created(){
  this.getAllServiceProviders()
},
methods:{
    getAllServiceProviders: function () {
      this.$http.get('http://localhost:3000/api/admins/sPs').then(response => {
        this.serviceproviders=response.body.data.users;
      })
    }}
    
}
</script>
