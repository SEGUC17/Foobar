<template>
  <div>

<ul>
  <li v-for =" student in students"> 
  <form role="form" class="">
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Student name: {{student.name}}</label>
        </div>
        
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Student mail: {{student.email}}</label><br/>
            <label for="rating" class="col-sm-2 control-label">Rating</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="rating" placeholder="Rating" v-model="rating" />
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm" v-on:click="assess(student._id)">Assess</button>
            </div>
        </div>
    </form>
  </li>
</ul>

  </div>
</template>
<script>
export default {
  name: 'SPAssess',
  data () {
    return {
      students:[],
      rating:''
    }
  },
created(){
  this.getStudents()
},
methods:{
    getStudents: function () {
      this.$http.get('http://localhost:3000/api/sPs/students/offer',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.students=response.data.data.students
      })
    },
    assess: function(user_id){
      this.$http.post('http://localhost:3000/api/sPs/students/assess/'.concat(user_id), {"rating":this.rating},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    })
    },
  }

}
</script>