<template>
  <div>
<div class="container">
      <div class="row">
      <div class="col-md-5  toppad  pull-right col-md-offset-3 ">
             <br>
    <router-link  :to ="{ name : 'EditStudent' , params: { EditStudid : studid }}" v-if = 'this.user.authenticated && this.user._id === this.student.user_id'> Edit Profile</router-link>
      </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
   
   
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title">{{user.name}}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" class="img-circle img-responsive"> </div>
                
               
                <div class=" col-md-9 col-lg-9 "> 
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>University: </td>
                        <td>{{student.university}}</td>
                      </tr>
                     
                      <tr>
                        <td>Date of Birth</td>
                        <td>{{student._id}}</td>
                      </tr>
                   
                         <tr>
                             <tr>
                        <td>Description</td>
                        <td>{{student.description}}</td>
                      </tr>
                        <tr>
                        <td>Home Address</td>
                        <td>{{student.address}}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{user.email}}</td>
                      </tr>
                        <td>Phone Number</td>
                        <td>123-4567-890(Landline)<br><br>555-4567-890(Mobile)
                        </td>
                           
                      </tr>
                     
                    </tbody>
                  </table>
            
                </div>
              </div>
            </div>
                 <!--  -->
            
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
export default {
  name: 'StudentProfile',
  // components: {
  //  ServiceProvider
  // }
  data () {
    return {
      student:{},
      user:{},
      studid: "",
    }
  },
created(){
  this.getServiceProvider()
},
methods:{
    getServiceProvider: function () {
      console.log("ahmed");
      let route ='http://localhost:3000/api/students/student/'.concat(this.$route.params.Studid);
      this.studid = this.$route.params.Studid ;
      this.$http.get(route, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        
        this.student=response.data.data.student;
        this.user =response.data.data.user;
        
      })
    },
   
  }
}
</script>