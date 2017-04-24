<style scoped>
body {
    font-family: Helvetica Neue, Arial, sans-serif;
}

polygon {
    fill: #42b983;
    opacity: .75;
}

circle {
    fill: transparent;
    stroke: #999;
}

text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
}

label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}

#raw {
    position: absolute;
    top: 0;
    left: 300px;
}



</style>

<template>

  <div>
<div class="container">
      <div class="row">
      <div class="col-md-5  toppad  pull-right col-md-offset-3 ">
             <br>
    <router-link  :to ="{ name : 'EditStudent' , params: { EditStudid : studid }}" v-if = 'this.user._id === this.student.user_id'> Edit Profile</router-link>
      </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


          <div class="panel panel-info">
            <div class="panel-heading">
            </div>
            <div class="panel-body">
              <div class="row">

                <div class="col-md-3 col-lg-3 " align="left"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" class="img-circle img-responsive"> </div>
                <div align="right">
                  <svg width="100" height="100"><polygraph></polygraph>
</svg>
                </div>
<br />
                <h3 class="panel-title">{{user.name}}</h3>

                <div class=" col-md-9 col-lg-9 ">
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>University: </td>
                        <td>{{student.university}}</td>
                      </tr>

                      <tr>
                        <td>Date of Birth</td>
                        <td>{{student.birthdate}}</td>
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

export default  {
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
  this.getStudent()
},
methods:{
    getStudent: function () {

      let route ='http://52.210.115.35:3000/api/students/student/'.concat(this.$route.params.Studid);
      this.studid = this.$route.params.Studid ;
      this.$http.get(route, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.student=response.data.data.student;
        this.user =response.data.data.user;

      })
    },

  }
}
</script>
