<template>
<div>
<div>

  <div class="form-group">
      <label  class="col-sm-2 control-label">
          Add a new admin here</label>
      <div class="col-sm-10">
          <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Admin's Name" v-model ="adminname" />
          <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Admin's Email" v-model="adminemail" />
          <button @click ="addAdmin()" >add</button>
          <h5>{{msg}}</h5>
      </div>
  </div>

</div>
<ul>
    <li v-for =" admin in admins"><input type="radio" name="list" value="volvo">{{admin.email}} <button class="btn btn-danger">Delete</button> </li>

  </ul>
</div></template>

<script>

export default {
  name: 'viewadmins',
  data () {
    return {
      admins:[],
      adminname : "",
      adminemail: "",
      msg: ""

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
          this.$http.post('http://localhost:3000/api/admins/admin',{name: this.adminname , email: this.adminemail  } ).then(response => {
      this.msg="Admin has been added"
          })
        }

  }

}
</script>
