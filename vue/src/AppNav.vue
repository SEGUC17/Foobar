<template>
<header >
  <div class="container clearfix">
    <div class="row" v-if="this.user.type==0">
          <div class="span12">
        <div class="navbar navbar_">
              <div class="container">
            <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
            <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
            <div class="nav-collapse nav-collapse_  collapse">
                  <ul class="nav sf-menu">
                <li class=""><a href="index.html">Home</a></li>
                <li><a href="work.html">Work</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li class="sub-menu"><a href="process.html" v-if="user.authenticated">Process</a>
                    <ul>
                        <li ><router-link  to="/StudentProfile"> Announcement</router-link></li>
                        <li ><router-link  to="/sPs">  Offer</router-link></li>
                        <li><a href="#">Process 03</a></li>
                    </ul>
                </li>
                <li v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                <li v-if = "!this.user.authenticated"><router-link to="/applySP">Apply as SP</router-link></li>            
                <li class="" v-else ><a  v-on:click="logout">visitor</a></li>

              </ul>
                </div>
          </div>
            </div>
      </div>
        </div>
        <div class="row" v-if="this.user.type==1">
              <div class="span12">
            <div class="navbar navbar_">
                  <div class="container">
                <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
                <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
                <div class="nav-collapse nav-collapse_  collapse">
                      <ul class="nav sf-menu">
                        <li></li>
                    <li><a href="work.html">Post</a></li>

                    <li class="sub-menu"><a href="process.html" v-if="this.user.authenticated && this.user.type==1">View</a>
                          <ul>
                        <li><a href="#"><router-link to='/viewAdmins'>Admins</router-link></a></li>
                        <li><a href="#">Students</a></li>
                        <li><a href="#">Service Providers</a></li>
                        <li><a href="#">Interests</a></li>

                      </ul>
                        </li>
                    <li  v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                    <li class="" v-else ><a  v-on:click="logout">logout</a></li>

                  </ul>
                    </div>
              </div>
                </div>
          </div>
            </div>
        <div class="row" v-if="this.user.type==2">
              <div class="span12">
            <div class="navbar navbar_">
                  <div class="container">
                <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
                <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
                <div class="nav-collapse nav-collapse_  collapse">
                      <ul class="nav sf-menu">
                    <li class=""><a href="index.html">Home</a></li>
                    <li><a href="work.html">Work</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li class="sub-menu"><a href="process.html" v-if="user.authenticated">Process</a>
                          <ul>
                        <li><a href="#">Process 01</a></li>
                        <li><a href="#">Process 02</a></li>
                        <li><a href="#">Process 03</a></li>
                      </ul>
                        </li>
                    <li  v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                    <li class="" v-else ><a  v-on:click="logout">logout</a></li>

                  </ul>
                    </div>
              </div>
                </div>
          </div>
            </div>

            <div class="row" v-if="this.user.type==3">
                <div class="span12">
                    <div class="navbar navbar_">
                        <div class="container">
                            <h1 class="brand brand_"><a href="index.html"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
                            <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
                            <div class="nav-collapse nav-collapse_  collapse">
                                <ul class="nav sf-menu">
                                <li class=""><a href="index.html">Home</a></li>
                                <li ><router-link to="/SPPostAnnouncement">Post Announcement</router-link></li>
                                <li><router-link to="/SPPostOffer">Post Offer</router-link></li>
                                <li><router-link to="/SPReservations">View Reservations</router-link></li> 
                                <li><router-link to="/SPReviews">View Reviews</router-link></li>    
                                <li><router-link to="/SPAssess">Assess Students</router-link></li>
                                <li><router-link to="/SPEditProfile">Edit Profile</router-link></li>  
                                <li  v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                                <li class="" v-else ><a  v-on:click="logout">logout</a></li>

                                </ul>
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
                                      <center>  <button class="btn btn-primary btn-sm " type="submit" v-on:click="login">
                                            Submit</button></center>
                                            <br>
                                        <a href="#resetPW" data-toggle="tab">Forgot your password?</a>
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
                                        <button class="btn btn-primary btn-sm"  v-on:click="signup">
                                            Save & Continue</button>
                                    </div>
                                </div>
                                </form>
                                </center>
                            </div>
                            
                            <div class="tab-pane" id="resetPW">
                                <center>
                                <h5>Enter your email below to reset the password:</h5>
                                <form role="form" class="">
                                <div class="form-group">
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="emailReset" placeholder="Email" v-model="resetPWEmail" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                      <center>  
                                      <h6><strong>N.B:</strong> A new password will be sent to this email </h6>
                                      <button class="btn btn-primary btn-sm " type="submit" v-on:click="resetPW">Reset Password</button>
                                      </center>                                         
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
      resetPWEmail: '',
      error: '',


  // User object will let us check authentication status
  user: {
    authenticated: false,
    type: 0
  },}},

 created() {

if(localStorage.getItem('id_token')!=null){
  this.user.authenticated=true

  this.$http.post('http://localhost:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
  this.user.type = decode.body.type
})
}


 },


methods: {
  // Send a request to the login URL and save the returned JWT
  login : function() {
    var app = this;
    app.$http.post('http://localhost:3000/api/users/login', {
	"email":app.creds.username,
	"password":  app.creds.password
}).then(data => {

      localStorage.setItem('id_token', data.body.token)

      app.user.authenticated = true
      console.log(data.body.token+" "+app.user.authenticated)

      app.$http.post('http://localhost:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
        this.user.type = decode.body.type
        console.log(this.user.type)

      })
    //
    })
  },
  signup : function() {
    this.$http.post('http://localhost:3000/api/users/signup', {"email":this.creds.email,"password":this.creds.password}).then(data => {
      console.log('success');
})

  },
 
  resetPW : function() {
    this.$http.post('http://localhost:3000/api/users/resetPW', {"email":this.resetPWEmail}).then(data => {
      console.log('success');
  })

  },

  // To log out, we just need to remove the token
  logout : function() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    this.user.type = 0;
    console.log('loggedout' + this.user.type)
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

}

}
</script>
