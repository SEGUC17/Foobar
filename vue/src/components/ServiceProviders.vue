<template>
<div>

  <ul>
    <li v-for=" serviceprovider in serviceproviders">
    <div align="center" class="thumbnail">
    <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}"><h2>Name: {{serviceprovider.user_id.name}}</h2></router-link>
    Email: {{serviceprovider.user_id.email}} <br/>
    Phone Number: {{serviceprovider.phone_number}}<br/>
    Description: {{serviceprovider.description}}<br/>
    </div>
    </li>
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
        console.log(response.data)
        this.serviceproviders=response.data.data.users;
      })
    }}

}
</script>
