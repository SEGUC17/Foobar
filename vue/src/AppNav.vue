<template>
<header >
  <div class="container clearfix">
    <div class="row" v-if="this.user.type==0">
          <div class="span12">
        <div class="navbar navbar_">
              <div class="container">
            <h1 class="brand brand_"><img alt="" src="./assets/img/logo.png" style ="height:70px"> </h1>
            <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
            <div class="nav-collapse nav-collapse_  collapse">
                  <ul class="nav sf-menu">
                <li class=""><a href="index.html">Home</a></li>
                <li ><router-link to="/announcements">News</router-link></li>
                <li><a >Work</a></li>
                <li><a >Blog</a></li>
                <li class="sub-menu"><a  v-if="user.authenticated">Process</a>
                    <ul>
                        <li ><router-link  to="/StudentProfile">Announcement</router-link></li>
                        <li ><router-link  to="/sPs">  Offer</router-link></li>
                        <li><a href="#">Process 03</a></li>
                    </ul>
                </li>
                <li v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                <li v-if = "!this.user.authenticated"><router-link to="/applySP">SP</router-link></li>
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
                 <li>
                   <router-link to='Adminpostannouncement'>Post</router-link>
                 </li>
                 <li>
                   <router-link to="/reviewData"> Review Data</router-link>
                 </li>
                 <li>
                   <router-link to="/announcements">Announcements</router-link>
                 </li>
                 <li>
                   <router-link to='/viewAdmins'>Admins</router-link>
                 </li>
                 <li>
                   <router-link to='/adminSP'>Service Providers</router-link>
                 </li>
                 <li>
                   <router-link to='/viewAllStudents'>Students</router-link>
                 </li>
                 <li>
                   <router-link to="/pendingSP">Pending Requests</router-link>
                 </li>
                 <li>
                   <router-link to="/viewInterests">Interests</router-link>
                 </li>
                 <li v-if="!this.user.authenticated"><a data-toggle="modal" data-target="#myModal">Enter</a></li>
                 <li class="" v-else><a href="/" v-on:click="logout">logout</a></li>

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
                <h1 class="brand brand_"><a ><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
                <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
                <div class="nav-collapse nav-collapse_  collapse">
                    <ul class="nav sf-menu">
                      <li ><router-link to="/"><font size="1">Home</font></router-link></li>
                        <li><router-link to="/viewOffers"><font size="1">View Offers</font></router-link></li>
                        <li ><router-link to="/announcements"><font size="1">Announcements</font></router-link></li>
                        <li><router-link to="/viewReservations"><font size="1">Reservation</font></router-link></li>
                        <li ><router-link  :to ="{ name : 'StudentProfile' , params: { Studid : decodeid.body.id }}"> <font size="1">My Profile</font></router-link></li>
                        <li ><router-link  to="/sPs"><font size="1">SPS</font></router-link></li>
                        <li v-if = "!this.user.authenticated" ><a data-toggle="modal" data-target="#myModal"><font size="1">Enter</font></a></li>
                        <li class="" v-else ><a  v-on:click="logout"><font size="1">logout</font></a></li>

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
                        <h1 class="brand brand_"><a ><img alt="" src="./assets/img/logo.png" style ="height:70px"> </a></h1>
                        <a class="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">Menu <span class="icon-bar"></span> </a>
                        <div class="nav-collapse nav-collapse_  collapse">
                            <ul class="nav sf-menu">
                            <li class=""><router-link to="/">Home</router-link></li>
                            <li ><router-link to="/announcements">Announcements</router-link></li>
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
                                <div v-for =" message in successmessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
                                <div v-for =" message in failuremessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
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
                                <router-link to="/"> <button class="btn btn-primary btn-sm " type="submit" v-on:click="login">
                                            Submit</button></router-link>

                                 <div><a href="#resetPW" data-toggle="tab">Forgot your password?</a></div>
                                </form>
                             </center>
                            </div>
                            <div class="tab-pane" id="Registration">
                              <center>
                                <form role="form" class="">
                                <div v-for =" message in successmessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
                                <div v-for =" message in failuremessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
                                 <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                        Name</label>
                                    <div class="col-sm-10">
                                      <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control" id="name" placeholder="Name" v-model="creds.name">
                                      <span v-show="errors.has('name')">{{ errors.first('name') }}</span>
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-sm-2 control-label">
                                        Email</label>
                                    <div class="col-sm-10">
                     <input v-validate="{ rules: { required: true, email: true } }" type="text" name="email" class="form-control" id="email" placeholder="Email" v-model="creds.email">
                     <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                        <!-- <input type="email" class="form-control" id="email" placeholder="Email" v-model="creds.email" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-2 control-label">
                                        Password</label>
                                    <div class="col-sm-10">
                                    <input v-validate="{ rules: { required: true} }" type="password" name="password" class="form-control" id="password" placeholder="Password" v-model="creds.password">
                     <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
                      <!--<input type="password" class="form-control" id="password" placeholder="Password" v-model="creds.password" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-2 control-label">
                                        Confirm Password</label>
                                    <div class="col-sm-10">
                                    <input v-validate="{ rules: { required: true} }" type="password" name="Confirm password" class="form-control" id="Confirm password" placeholder="Password" v-model="creds.password2">
                     <span v-show="errors.has('Confirm password')">{{ errors.first('Confirm password') }}</span>

                                        <!-- <input type="password" class="form-control" id="password2" placeholder="Confirm Password" v-model="creds.password2" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                        University</label>
                                    <div class="col-sm-10">
                                      <input v-validate="{ rules: { required: true} }" type="text" name="university" class="form-control" id="university" placeholder="University" v-model="university">
                                      <span v-show="errors.has('university')">{{ errors.first('university') }}</span>
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                      Address</label>
                                    <div class="col-sm-10">
                                      <input v-validate="{ rules: { required: true} }" type="text" name="address" class="form-control" id="address" placeholder="Address" v-model="address">
                                      <span v-show="errors.has('address')">{{ errors.first('address') }}</span>
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                        Birthdate</label>
                                    <div class="col-sm-10">
                                      <input v-validate="{ rules: { required: true} }" type="date" name="birthdate" class="form-control" id="birthdate" placeholder="Birthdate" v-model="birthdate">
                                      <span v-show="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    </div>
                                </div>
                                  <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                        Description</label>
                                    <div class="col-sm-10">
                                      <textarea v-validate="{ rules: { required: true} }" type="text" name="description" class="form-control" id="description" placeholder="Description" v-model="description"> </textarea>
                                      <span v-show="errors.has('description')">{{ errors.first('description') }}</span>
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">
                                        Interests</label>
                                        <div v-for="interest in this.interests">
                                        <input type="checkbox" :id="interest" :value="interest" v-model="Interests">
                                        <label for="interest">{{interest.name}}</label>


                                        </div>

                                   <!--  <div class="col-sm-10">
                                      <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control" id="name" placeholder="Name" v-model="creds.name">
                                      <span v-show="errors.has('name')">{{ errors.first('name') }}</span> -->
                                        <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                                    <!-- </div> -->
                                </div>
                                <div class="row">
                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                      <router-link to="/"><button class="btn btn-primary btn-sm"  v-on:click="signup">
                                            Save & Continue</button></router-link>
                                    </div>
                                </div>
                                </form>
                                </center>
                            </div>

                            <div class="tab-pane" id="resetPW">
                                <center>
                                <h5>Enter your email below to reset the password:</h5>
                                <form role="form" class="" v-on:submit='resetPW'>
                                <div class="form-group">
                                <div v-for =" message in successmessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
                                <div v-for =" message in failuremessages">
                                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                                </div>
                                <br>
                                             <div class="col-sm-10">
                     <input v-validate="{ rules: { required: true, email: true } }" type="text" name="email" class="form-control" id="email" placeholder="Email" v-model="resetPWEmail" required="*">
                     <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                        <!-- <input type="email" class="form-control" id="email" placeholder="Email" v-model="creds.email" /> -->
                                    </div>

                                </div>

                                <div class="row">

                                    <div class="col-sm-2">
                                    </div>
                                    <div class="col-sm-10">
                                      <center>
                                      <h6><strong>N.B:</strong> A new password will be sent to this email </h6>
                                      <button class="btn btn-primary btn-sm " type="submit">Reset Password</button>
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
import router from './router'
export default {


data () {

    return {
      // We need to initialize the component with any
      // properties that will be used in it
      creds: {
        username: '',
        password: '',
        name:'',
        password2:''

      },
      resetPWEmail: '',
      error: '',
      decodeid: '',
      successmessages:[{msg:''}],
      failuremessages:[{msg:''}],
      university:'',
        description:'',
        interests:[],
        birthdate:'',
        address:'',
        Interests:[],

  // User object will let us check authentication status
  user: {
    authenticated: false,
    type: 0
  }}},

 created() {


if(localStorage.getItem('id_token')!=null){

  this.user.authenticated=true
  this.$http.post('http://localhost:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
    this.decodeid=decode
    this.user.type = decode.body.type
})
}

this.findAllInterests()

 },


methods: {
  // Send a request to the login URL and save the returned JWT
  login : function() {
    var app = this;
    app.$http.post('http://localhost:3000/api/users/login', {
	"email":app.creds.username,
	"password":  app.creds.password
}).then(data => {
      this.successmessages[0].msg = "You logged in successfully";
      this.failuremessages=[{msg:''}];
      localStorage.setItem('id_token', data.body.token)
      app.user.authenticated = true
      app.$http.post('http://localhost:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
        this.decodeid = decode;
        this.user.type = decode.body.type
      })
       $('#myModal').modal('hide');
    //
}).catch(function(reason) {
   this.failuremessages = reason.body.err;
    this.successmessages=[{msg:''}];

});
  },
  signup : function() {
    this.$http.post('http://localhost:3000/api/users/signup', {
    "email":this.creds.email,
    "password":this.creds.password,
    "password2":this.creds.password2,
    "name":this.creds.name,
    "university":this.university,
    "address":this.address,
    "birthdate":this.birthdate,
    "description":this.description,
    "interests":this.Interests

}).then(data => {
  console.log(this.Interests)
      this.successmessages[0].msg = "Registered Successfully, you can login now";
     this.failuremessages=[{msg:''}];

    }).catch(function(reason) {
        this.failuremessages = reason.body.err;
        this.successmessages= [{msg:''}];

});

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
    router.push('/')
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

  findAllInterests: function() {
    this.$http.get('http://localhost:3000/api/students/all/interests/').then(response => {
      console.log(response.body.data.interests);
        this.interests=response.body.data.interests
      })
  }

}

}
</script>
