<template>

<div>

  <ul>
    <li v-for=" student in students">
    <div align="center" class="thumbnail">
    <h2>Name: {{student.user_id.name}}</h2>
    Email: {{student.user_id.email}} <br/>
    </div>
    </li>
  </ul>

</div>
</template>


<script>
export default {
  name: 'students',
  data () {
    return {
      students:[]
    }
  },
created(){
  this.getAllStudents()


},
methods:{
    getAllStudents: function () {
      this.$http.get('http://localhost:3000/api/admins/viewstudents',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.students=response;
        console.log(response.body.data.students)

      })
    }}

}
</script>
