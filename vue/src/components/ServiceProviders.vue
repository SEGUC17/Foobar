<template>
  <div>

<ul>
  <li v-for = "serviceprovider in serviceproviders"><router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}" v-model ="spid"> {{serviceprovider._id}} </router-link></li>
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
      this.$http.get('http://localhost:3000/api/students/sPs').then(response => {

        this.serviceproviders=response.data.data.profiles
      })
    }}

}
</script>
