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
        <td> <a class="active" @click="deleteS(student.user_id.email,student.user_id.name)">✖</a></td>
          <td> <a class="active" @click="blockS(student.user_id.email,student.user_id.name)">B</a></td>
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
        //console.log(response.body.data.students)
        this.students=response.body.data.students
        this.students= this.students.filter(function(student){
          return student.user_id.is_deleted!=true
        })
      })
    },   deleteS: function (key,name) {


          this.$http.post('http://localhost:3000/api/admins/deletes',{email : key},{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

            this.removestudent(key,name)
          })

        },
          removestudent: function(arrayItem,name){

        swal(
          'Success!',
          name +' has been deleted.',
          'success'

        )

this.getAllStudents()
      },
      blockS(email,name){


        this.$http.post('http://localhost:3000/api/admins/blocks/',{email: email} ,{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
          swal(
            'Success!',
            name +' has been blocked.',
            'success'

          )
          this.getAllStudents()

})

      }
  }
}
</script>
<style>
</style>
