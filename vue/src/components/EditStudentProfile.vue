<style scoped>
#content10 {
    width: 400px;
    margin: 0 auto;
    background-color: #f7f7f7;

}
</style>


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
              <div class="row" >

                <div class=" col-md-9 col-lg-9 " >
                 <table class="table table-user-information">

                 <center> <div class="col-md-3 col-lg-3 " align="center">         <img v-if="user.profileimg && user.profileimg.path" :src="'http://localhost:3000/'+user.profileimg.path.replace('public','')" class="img-circle profile_img" style="height:150px; width:150px">        <img v-else src="~assets/img/missing.png" class="img-circle profile_img" style="height:150px; width:150px">
                </div></center>

                    <tbody>
                    <br>
                     <tr>
                        <td>Name: </td>
                        <td>
                        <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control" id="name"  v-model="name">
                        <span v-show="errors.has('name')">{{ errors.first('name') }}</span>
                        <!-- <input type="text"  v-model="name"> -->
                        </td>
                    </tr>
                    <tr>
                          <td>Upload Profile pic: </td>
                          <td><input ref="avatar2" type="file" name="avatar2" id="avatar2" v-on:change="changedp($event.target.name, $event.target.files)"></td>
                    </tr>
                      <tr>
                        <td>University: </td>
                        <td>
                       <input type="text"  v-model="university">
                        </td>
                      </tr>

                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          <input type="date"  v-model="birthdate" :value="this.birthdate">
                        </td>
                      </tr>

                         <tr>
                             <tr>
                        <td>Description</td>
                        <td><textarea v-model="description" :value="this.description"></textarea> </td>
                      </tr>
                        <tr>
                        <td>Home Address</td>
                        <td><input type="text" v-model="address"></td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{user.email}}</td>

                     <tr align="center">
                       <div class="form-group" >
                         <label class="col-md-4 control-label" for="Fields">Fields</label>
                         <br>
                         <div class="form-group">
                               <span v-for =" field in interests" style="font-size:14px; margin-right:5px;">
<br>
                              <input type="checkbox" id="field.name" :value="field" v-model="fields">
  <label for="field.name" style="font-weight: normal;">{{field.name}}</label>
</span>
                         </div>
                       </div>
                     <div class="row" >
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10" >
                                      <center>  <button class="btn btn-primary btn-sm" v-on:click="EditStudent()">
                                            Submit</button></center>
                                            <br>

                                    </div>
                                </div>
                     </tr>

                    </tbody>
                  </table>
                  <div class="" >


                  <button class="col-md-5 btn btn-primary btn-sm " href="#StudentEditPassword" data-toggle="modal">Edit Password</button>
  </div>
                </div>
              </div>
            </div>
                 <!--  -->

          </div>
        </div>
      </div>
    </div>

<form role="form" class="" v-on:submit.prevent="editPassword()">
    <div class="modal fade" id="StudentEditPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div v-for =" message in successmessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
    </div>
    <div v-for =" message in failuremessages">
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
    </div>
           <br><br>
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header modal-header-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>

            <div class="modal-body">
            <center>
                <div class="row">
                Enter Old Password:<input require="required"type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput1" placeholder="Old Password" v-model="oldPassword" required="*"></input><br/>
                Enter New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput2" placeholder="New Password" v-model="newPassword" required="*"></input><br/>
                Confirm New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput3" placeholder="Confirm New Password" v-model="confirmNewPassword" required="*"></input>
                </div>
                </center>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary add_field_button" style="margin-bottom:20px;">Update Password</button>
            </div>
          </div>
        </div>
    </div>
    </form>


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
      confirmNewPassword:"",
      oldPassword:"",
      newPassword:"",
      successmessages:[{msg:''}],
      interests:[],
fields:'',
      failuremessages:[{msg:''}]

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
        this.birthdate = this.student.birthdate.substring(0,10);
        this.description = this.student.description;



  this.$http.get('http://localhost:3000/api/students/interests/view', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

this.fields =response.body.data.interest1;
this.interests =response.body.data.interests;

        //console.log(this.user);
});
      })
    },
    EditStudent: function() {

        let route ='http://localhost:3000/api/students/student/';
            //console.log(this.name);
      this.$http.post(route, {"name":this.name,"university":this.university, "address":this.address, "birthdate":this.birthdate, "description":this.description,"phone_number":this.phone_number,"interests":this.fields}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
 console.log(this.fields)
        this.$router.push({ name : 'StudentProfile' , params: { Studid : this.$route.params.EditStudid }});
        swal("Success","Your profile was editted",'success'
      )
        //console.log(this.user);
      })


    },
    changedp: function(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        formData.append("user_id",this.user._id)
        this.$http.post('http://localhost:3000/api/sPs/changedp',formData, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            //console.log('changed dp');
            vm.$forceUpdate();

      })
    },
    editPassword: function()
    {

            this.$http.post('http://localhost:3000/api/students/student/editpassword', {"oldPassword":this.oldPassword,"newPassword":this.newPassword, "confirmNewPassword":this.confirmNewPassword,"id":this.$route.params.EditStudid},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
              $('#StudentEditPassword').modal('hide');

            swal("Success","Updated Password",'success')
            this.confirmNewPassword=""
      this.oldPassword=""
      this.newPassword=""

                    }).catch(function(reason) {
                      if(reason!==null&&reason!=undefined){
                      if(reason.body){
                      for(var i=0;i<reason.data.err.length;i++)
                    swal("Oops..",reason.data.err[i].msg,'error')}}



                    });
          }


  }
}
</script>
