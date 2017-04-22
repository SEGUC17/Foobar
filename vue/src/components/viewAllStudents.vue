<template>


<div class="container">
  <br><br>
  <center>
    <h2>Students</h2></center>
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
      <tr v-for="student in students" >
        <td>{{student.user_id.name}}</td>
        <td>{{student.user_id.email}}</td>
        <td> <a class="active" @click="deleteS(student.user_id.email)">✖</a></td>
          <td> <a class="active" @click="blockS(student.user_id.email)">B</a></td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script>
export default {
  name: 'viewstudents',
  data () {
    return {
      students:[],
      temp:"",
      msg: "",
    }
  },
created(){
  this.getAllStudents()
},
methods:{
    getAllStudents: function (key) {
      this.$http.get('http://localhost:3000/api/admins/viewstudents',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        console.log(response.body.data.students)
        this.students=response.body.data.students
        this.students= this.students.filter(function(student){
          return student.user_id.is_deleted!=true
        })
      })
    },   deleteS: function (key) {
      var x = confirm("Are you sure you want to delete this student ?")
      if(x){
          this.$http.post('http://localhost:3000/api/admins/deletes',{email : key},{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            alert("Student deleted")
            this.removestudent(key)
          })
        }
        },
          removestudent: function(arrayItem){
            var x = confirm("Are you sure you want to remove this student ?")
      if(x){
        alert("Student removed")
            let index = this.students.indexOf(arrayItem)
            this.students.splice(index, 1);
          }
      },
      blockS(email){
             var x = confirm("Are you sure you want to block this student ?")
      if(x){
        
        this.$http.post('http://localhost:3000/api/admins/blocks/',{email: email} ,{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
          alert("Student blocked")
})
      }
      }
  }
}
</script>
<style>
</style>
