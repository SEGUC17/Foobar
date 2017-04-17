<template>
<div>


<ul>
    <li v-for =" pending in pendings"><input type="radio" name="list" value="volvo">{{pending.name}} <button class="btn btn-danger">Delete</button> </li>

  </ul>
</div></template>

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


  }

}
</script>
