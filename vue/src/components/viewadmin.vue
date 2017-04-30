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
      </tr>
    </tbody>
  </table>
 <form role="form" class="" @submit.prevent='addAdmin'>
   <div class="form-group">
         <input v-validate ="{rules:{required:true,email:true}}"type="text" name="admin" v-model=adminemail class="form-control efc" id="admin" placeholder="Add Admin"  required="*" style="width:30%">
         <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
   </div>
  <div class="row">
      <div class="col-sm-2">
      </div>
      <div class="col-sm-12">
          <button class="btn btn-primary btn-sm" > Add Admin</button>
      </div>
  </div>
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
      this.$http.get('http://52.210.115.35:3000/api/admins/admins',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.admins=response.body.data.admins
      })
    },
    addAdmin: function () {
          this.$http.post('http://52.210.115.35:3000/api/admins/admin',{email:this.adminemail},{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
            this.msg="Admin has been added"
            alert(this.msg)
            console.log(response.body.data.user)
           this.admins.push(response.body.data.user)
           this.adminemail=''
         }).catch(function(reason){
           console.log(reason.body.err.msg);
         })
        },

  }
}
</script>
