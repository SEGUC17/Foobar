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
        <td> <a class="active" @click="removeadmin(key)">✖</a></td>
      </tr>
    </tbody>
  </table>
 <form role="form" class="" v-on:submit='addAdmin'>
  <input type="email" placeholder="Add Admin? Enter his email" v-model="adminemail" required="*"></input>
  <button class="btn-primary" >Add</button>
  </form>
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
            alert(this.msg)
            console.log(response.body.data.user)
           this.admins.push(response.body.data.user)
           this.adminemail=''
          })
        },
        removeadmin: function(index){
          var x = confirm("Are you sure you want to delete this Admin ?")
         if(x){
            this.$delete(this.admins,index)
            alert("Admin Deleted")
            console.log(this.admins)
        }
      }
  }
}
</script>
<style>
</style>
