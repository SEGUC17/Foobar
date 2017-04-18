<template>
<header>
  <div class="container clearfix">
    <div class="row">
          <div class="span12">
        <div class="navbar navbar_">
              <div class="container">
            <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
            <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
            <div class="nav-collapse nav-collapse_  collapse">
          <ul class="nav sf-menu">
                
                <li><a  data-toggle="modal" data-target="#myModal" v-if= "!this.user.authenticated" >Enter</a></li>
                <li><a  data-toggle="modal"  v-if= "this.user.authenticated" >logout</a></li>

                <li><a data-toggle="modal" data-target="#addInterest">Add Interest</a></li>
                <li><a data-toggle="modal" data-target="#postAnnouncement">Post Announcement</a></li>
                <li><a data-toggle="modal" data-target="#myModal2">Edit admins</a></li>

                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/viewOffers">View Offers</router-link></li>
                <li><router-link to="/viewReservations">View Reservation</router-link></li>
                <li ><router-link to="/announcements">Announcements</router-link></li>
     <!--            <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}" v-model ="spid"> 
  {{serviceprovider._id}} </router-link> --> 
                <br>
                <li ><router-link to="/pendingSp">View Pending Service Providers</router-link></li>
                <li ><router-link  :to ="{ name : 'StudentProfile' , params: { Studid : StudId }}"> Student Profile</router-link></li>
                <li ><router-link  to="/sPs">  SPS</router-link></li>
                <li ><router-link  to="/reviewData"> Review Data</router-link></li>

               
              </ul>
                </div>
          </div>
            </div>
      </div>
        </div>
  </div>
 <div class="modal hide fade" id ="myModal2">

  <div class="modal-body" style="padding-left:6%">
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="row">
                    <div class="col-md-8" style="">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#Add" data-toggle="tab">Add Admin</a></li>
                            <li><a href="#Delete" data-toggle="tab">Delete Admin</a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="Add">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label  for="email" class="col-sm-2 control-label">
                                        Name</label>
                                    <div class="col-sm-10">
                                        <input  type="text" class="form-control" id="adminname" placeholder="Enter your name here" v-model="adminname" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="adminemail" placeholder="Enter the email here"  v-model="adminemail"  />
                                    </div>

                                </div>



                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button @click="addAdmin()" type="submit" class="btn btn-success btn-sm">
                                            Submit</button>


                                    </div>
                                </div>
                                </form>
                             </center>
                            </div>
                            <div class="tab-pane" id="Delete">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Admin ID </label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="email" placeholder="Enter the ID here" />
                                    </div>
                                </div>






                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button type="button" class="btn btn-warning btn-sm">
                                            Delete</button>
                                    </div>
                                </div>
                                </form>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
  </div>

  </div>

  <div class="modal hide fade" id ="addInterest">

  <div class="modal-body" style="padding-left:6%">
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="row">
                    <div class="col-md-8" style="">
                        <!-- Nav tabs -->
                       
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="Login">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Add Interest</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="interestName" v-model="interestName" placeholder="Interest Name" />
                                    </div>
                                </div>
                              

                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-primary btn-sm" @click="addInterest()">
                                            Submit</button>
                                            <br>
                                    </div>
                                </div>
                                </form>
                             </center>
                            </div>
                           
                        </div>
                    </div>
                </div>
                  </div>
                </div>

<div class="modal hide fade" id ="postAnnouncement">
  <div class="modal-body" style="padding-left:6%">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>                         <div class="row">
                    <div class="col-md-8" style="">
                        <!-- Nav tabs -->
                       
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="Login">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Post Announcement</label>
                                    
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="AnnTitle" v-model="Title" placeholder="Title" />
                                    </div>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"  v-model="Announcement" id="Announcement"  placeholder="Announcement" /> </textarea> 
                                    </div>
                                </div>
                              

                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-primary btn-sm" @click="postAnnouncementAdmin()">
                                            Submit</button>
                                            <br>
                                    </div>
                                </div>
                                </form>
                             </center>
                            </div>
                           
                        </div>
                    </div>
                </div>
                  </div>
                </div>


  <div class="modal hide fade" id ="myModal">

  <div class="modal-body" style="padding-left:6%">
  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="row">
                    <div class="col-md-8" style="">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#Login" data-toggle="tab">Login</a></li>
                            <li><a href="#Registration" data-toggle="tab">Registration</a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="Login">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="email1" placeholder="Email" v-model="creds.username" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" class="col-sm-2 control-label">
                                        Password</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="creds.password" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                      <center>  <button class="btn btn-primary btn-sm" v-on:click="login">
                                            Submit</button></center>
                                            <br>
                                        <a href="javascript:;">Forgot your password?</a>
                                    </div>
                                </div>
                                </form>
                             </center>
                            </div>
                            <div class="tab-pane" id="Registration">
                                <center>
                                <form role="form" class="">
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="email" placeholder="Email" v-model="creds.email" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-2 control-label">
                                        Password</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="password" placeholder="Password" v-model="creds.password" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                        <button class="btn btn-primary btn-sm" v-on:click="signup">
                                            Save & Continue</button>
                                    </div>
                                </div>
                                </form>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

</div>
</div>
  </header>

</template>

<script>

export default {


data () {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      creds: {
        username: '',
        password: '',

      },
      error: '',
       show : true ,
      interestName :"",
       Announcement :"",
       adminEmail :"",
       Title: "" ,
       adminname : "",
      adminemail: "",
      StudId:"58f50f4d14aa397c21ca1ffa",
  // User object will let us check authentication status
  user: {
    authenticated: false
  },}},
methods: {
  // Send a request to the login URL and save the returned JWT
  login : function() {
    this.$http.post('http://localhost:3000/api/users/login', {
	"email":this.creds.username,
	"password":  this.creds.password
}).then(data => {
      localStorage.setItem('id_token', data.body.token)

      this.user.authenticated = true
      console.log(data.body.token+" "+this.user.authenticated)


    //
    })
    this.$http.post('http://localhost:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {

      console.log(decode.body)

    })

  },

  signup : function() {
    this.$http.post('http://localhost:3000/api/users/signup', {"email":this.creds.email,"password":this.creds.password}).then(data => {
      console.log('success');
})

  },

  // To log out, we just need to remove the token
  logout : function() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    console.log('loggedout')
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },
   addInterest: function(){
        this.$http.post("http://localhost:3000/api/admins/addInterest",{name: this.interestName}).then(console.log(this.interestName))
    } ,
    postAnnouncementAdmin: function(){
        // this.$http.post("http://localhost:3000/api/admins/addInterest",{name: this.interestName}).then(console.log(this.interestName))
        console.log(this.Announcement);
    },
     addAdmin: function () {
      this.$http.post('http://localhost:3000/api/admins/admin',{name: this.adminname , email: this.adminemail  } ).then(
 console.log(this.adminname)
      )
    }

}

}
</script>
