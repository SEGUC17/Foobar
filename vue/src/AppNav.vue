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
                <li class="active"><a href="index.html">Home</a></li>
                <li><a href="work.html">Work</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li class="sub-menu"><a href="process.html" v-if="!user.authenticated">Process</a>
                      <ul>
                    <li><a href="#">Process 01</a></li>
                    <li><a href="#">Process 02</a></li>
                    <li><a href="#">Process 03</a></li>
                  </ul>
                    </li>
                <li><a  data-toggle="modal" data-target="#myModal" v-if= "!this.user.authenticated" >Enter</a></li>
                <li><a  data-toggle="modal"  v-if= "this.user.authenticated" >logout</a></li>

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

}

}
</script>
