<template>


<div class="container">
  <br><br>
  <center>
    <h2>Admins</h2></center>
  <table class="table table-inverse">
    <thead class="thead-inverse">
      <tr>
        <th scope="row">Email</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="admin in admins" :key="admin.email">
        <td>{{admin.email}}</td>
        <td> <a class="active" @click="removeadmin({admin})">✖</a></td>
      </tr>
    </tbody>
  </table>
  <input type="text" placeholder="Add Admin? Enter his email" v-model="adminemail"></input>
  <button class="btn-primary" @click="addAdmin()">Add</button>
</div>
</template>

<script>

export default {
  name: 'viewadmins',
  data () {
    return {
      admins:[],
      adminname : "",
      adminemail: "",
      msg: "",
      key:''

    }
  },
created(){
  this.getAlladmins()
},
methods:{
    getAlladmins: function () {
      this.$http.get('http://localhost:3000/api/admins/admins',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.admins=response.body.data.admins

      })
    },
    addAdmin: function () {
          this.$http.post('http://localhost:3000/api/admins/admin',{email:this.adminemail},{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
            this.msg="Admin has been added"
           this.admins.push(this.adminemail)
           this.adminemail=''

          })
        },
        removeadmin: function(admin){
        this.admins.$splice(2,1)
        }
  }

}
</script>
<style>

</style>
