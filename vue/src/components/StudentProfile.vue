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

        <center>
        <img v-if="user.profileimg && user.profileimg.path" :src="'http://localhost:3000/'+user.profileimg.path.replace('public','')" class="img-circle profile_img" style="height:150px; width:150px">
        <img v-else src="~assets/img/missing.png" class="img-circle profile_img" style="height:150px; width:150px">
        <h2 class="panel-title"></h2>
        </center>

                <div class=" col-md-9 col-lg-9 ">
                  <table class="table table-user-information">
                    <tbody>
                       <tr>
                        <td>Name: </td>
                        <td>{{user.name}}</td>
                      </tr>
                      <tr>
                        <td>University: </td>
                        <td>{{student.university}}</td>
                      </tr>

                      <tr>
                        <td>Date of Birth</td>
                        <td ><p v-if="student.birthdate!=undefined">{{student.birthdate.substring(0, 10)}} </p></td>
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

<radar-example></radar-example>

  </div>
</template>

<script>

import RadarExample from '../examples/RadarExample'

export default  {
  name: 'StudentProfile',
  components: {
   RadarExample
  },
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
