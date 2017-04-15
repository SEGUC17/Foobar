<template>
  <div>

<ul>
  <li> {{student}}</li>
</ul>


  </div>
</template>
<script>
export default {
  name: 'StudentProfile',
  data () {
    return {
      student:{}
    }
  },
created(){
  this.getAllAnnouncements()
},
methods:{
    getAllAnnouncements: function () {
      this.$http.get('http://localhost:3000/student/profile').then(response => {

        this.student=response.data.data.student
      })
    }}

}
</script>
