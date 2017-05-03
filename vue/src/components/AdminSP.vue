
<template>
<!-- <div>
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
</div> -->

<div class="container">
  <br><br>
  <center>
    <h2>Service Providers</h2></center>
  <table class="table table-inverse">
    <thead class="thead-inverse">
      <tr>
        <th scope="row">Name</th>
        <th scope="row">Email</th>
        <th scope="row">Delete</th>
        <th scope="row">Block</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="serviceprovider in serviceproviders">
        <td><router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}"> {{serviceprovider.user_id.name}}</router-link></td>
        <td>{{serviceprovider.user_id.email}}</td>
        <td> <a class="active" @click="removesp(serviceprovider)">✖</a></td>
        <td> <a @click="blocksp(serviceprovider)"><strong>B</strong></a></td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
export default {
  name: 'serviceprovider',
  data () {
    return {
      serviceproviders:[],
    }
  },
created(){
  this.getAllServiceProviders()
},
methods:{
    getAllServiceProviders: function () {
      this.$http.get('http://54.77.11.251:3000/api/admins/sPs').then(response => {
        this.serviceproviders = response.body.data.users
        this.serviceproviders = this.serviceproviders.filter(function(serviceprovider){
            return serviceprovider.user_id.is_deleted != true
        })
      })
    },
    removesp: function(serviceprovider){

      this.$http.delete('http://54.77.11.251:3000/api/admins/admin/sp/'.concat(serviceprovider._id),{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
      swal("Success","Service Provider deleted",'success')
           this.getAllServiceProviders();
      })



    },
    blocksp:function(serviceprovider){

      this.$http.post('http://54.77.11.251:3000/api/admins/block/',{email:serviceprovider.user_id.email} ,{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        swal("Success","Service Provider blocked",'success')
    })

  }
}
}
</script>
