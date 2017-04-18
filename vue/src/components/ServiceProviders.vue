<template>
  <div>

<ul> 
 <!--  <li v-for = "n in users.length"> {{users[n-1]}} </li>
 <li v-for = "user in users , serviceprovider in serviceproviders"> {{users[n-1]}} </li> -->

  <div v-for = "serviceprovider in serviceproviders">


 <!--  <div v-if ="serviceprovider._id = user._id"> -->
    <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}" v-model ="spid"> 
  {{serviceprovider.user_id}} </router-link>
  <!-- </div>  -->
 
    
  </div>
  <!-- </div> -->
  
</ul>


  </div>
</template>
<script>
export default {
  name: 'serviceprovider',
  data () {
    return {
      serviceproviders:[],
      users:[],
      spid:""
    }
  },
created(){
  this.getAllServiceProviders()
},
methods:{
    getAllServiceProviders: function () {
      this.$http.get('http://localhost:3000/api/students/sPs').then(response => {
        console.log(response.data.data.users)
        this.users=response.data.data.users
        
        this.serviceproviders=response.data.data.profiles
      })
    }}

}
</script>
