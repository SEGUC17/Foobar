<template>
  <div>
<div class="container">
      <div class="row">
      <div class="col-md-5  toppad  pull-right col-md-offset-3 ">
             <br>
    
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
                        <td>Name: </td>
                        <td>
                      <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control" id="name"  v-model="name">
                     <span v-show="errors.has('name')">{{ errors.first('name') }}</span>
                        <!-- <input type="text"  v-model="name"> -->
                        </td>
                      </tr>
                      <tr>
                        <td>University: </td>
                        <td>
                       <input type="text"  v-model="university">
                        </td>
                      </tr>
                     
                      <tr>
                        <td>Date of Birth</td>
                        <td>{{student.birthdate}}</td>
                      </tr>
                   
                         <tr>
                             <tr>
                        <td>Description</td> 
                        <td><textarea v-model="description"></textarea> </td>
                      </tr>
                        <tr>
                        <td>Home Address</td>
                        <td><input type="text" v-model="address"></td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{user.email}}</td>
                    
                     <tr align="right">
                       
                     <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                      <center>  <button class="btn btn-primary btn-sm" v-on:click="EditStudent()">
                                            Submit</button></center>
                                            <br>
                                        
                                    </div>
                                </div>
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
  data () {
    return {
      student:{},
      user:{},
      name : "",
      university : "Ahm",
      address : "",
      birthdate : "",
      description : "",
     
    }
  },
created(){
  this.getStudent()
},
methods:{
    getStudent: function () {
     
      let route ='http://localhost:3000/api/students/student/'.concat(this.$route.params.EditStudid);
      
   
      this.$http.get(route, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
       
        this.student=response.data.data.student;
        this.user =response.data.data.user;
        this.name = this.user.name;
        this.university = this.student.university;
        this.address = this.student.address;
        //this.birthdate = response.student.birthdate;
        this.description = this.student.description;
        
        console.log(this.user);
        
      })
    },
    EditStudent: function() {
      var x = confirm("Are you sure you want to edit your profile ?");
      if(x){
        let route ='http://localhost:3000/api/students/student/';
            console.log(this.name);
      this.$http.post(route, {"name":this.name,"university":this.university, "address":this.address, "birthdate":this.birthdate, "description":this.description,"phone_number":this.phone_number}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.$router.push({ name : 'StudentProfile' , params: { Studid : this.$route.params.EditStudid }});
        alert("Your profile was editted")
        console.log(this.user);
      })
        
      }
    }
   
  }
}
</script>