<template>

  <div class="container">
    <br><br>
    <center>
      <h2>Pending service providers</h2></center>
    <table class="table table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th scope="row">Email</th>
          <th scope="row">Approve</th>
          <th scope="row">disapprove</th>


        </tr>
      </thead>
      <tbody>
        <tr v-for="pending in pendings" >
          <td>{{pending.email}}</td>
                    <td> <a class="glyphicon glyphicon-ok" @click="approve(pending)" ></a></td>
          <td v-if="pending.is_declined==false"> <a class="glyphicon glyphicon-remove" @click="reject(pending)"></a></td>
        <td v-else>Dispparoved</td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
export default {
  name: 'viewPendingSP',
  data () {
    return {
      pendings:[],
    }
  },
created(){
  this.getAllPendingSP()
},
methods:{
    getAllPendingSP: function () {
      this.$http.get('http://localhost:3000/api/admins/pendingSPRequests/',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.pendings=response.body.data.pendingSP
      })
    },
    approve: function(pending){
      // var x = confirm("Are you sure you want to reject this Service Provider ?")
      // if(x){
        this.$http.post('http://localhost:3000/api/admins/pendingSPRequests',{"id":pending._id,"approve":true,"name":pending.name,"email":pending.email,"phone_number":pending.phone_number,"description":pending.description},{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
          swal(
            'Success!',
            pending.name+' has been approved!',
            'success'
          )
        this.getAllPendingSP()
        })
      // }
    },
    reject: function(pending){


      this.$http.post('http://localhost:3000/api/admins/pendingSPRequests',{"id":pending._id,"disapprove":true,"name":pending.name,"email":pending.email,"phone_number":pending.phone_number,"description":pending.description},{headers : { 'jwt-token' : localStorage.getItem('id_token')}},{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
        swal(
    'Success',
     pending.name +' has been rejected',
    'error'
  )
        this.getAllPendingSP()

      })

    }
  }
}
</script>
