<template>
<div class ="header">
  <div v-if="!showgent">
    <header role="banner" id="fh5co-header">
        <div class="container">
          <!-- <div class="row"> -->
            <nav class="navbar navbar-default">
              <div class="navbar-header">
                <!-- Mobile Toggle Menu Button -->
              <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
              <a class="navbar-brand" href="/">Foobar</a>
              </div>
              <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                  <li class="active"><a href="#" data-nav-section="home"><span>Home</span></a></li>
                  <li><a href="#" data-nav-section="about"><span>Our SPS</span></a></li>
                  <li><a href="#" data-nav-section="funfacts"><span>Facts</span></a></li>
                  <li><a href="#" data-nav-section="contact"><span>Join Us</span></a></li>
                  <li><a class="external" data-toggle="modal" data-target="#myModal" style="cursor:pointer;"><span>Enter</span></a></li>
                </ul>
              </div>
            </nav>

        </div>
    </header>
    <router-view></router-view>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="row" style ="border:none;">
        <div class="col-md-12">
        <div class="panel-login">
        <div class="panel-heading">
          <div class="row">

            <div class="col-xs-4">
            <a href="#" class="active" id="login-form-link">Login</a>
            </div>

            <div class="col-xs-4">
            <a href="#" id="register-form-link">Register</a>
            </div>

          </div>
              <hr>
        </div>

        <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                  <form @submit.prevent="login" id="login-form"  role="form" style="display: block;">

                    <div class="form-group">
                      <input v-show="!reset" type="text" name="email" id="email" tabindex="1" v-model="creds.username" class="form-control efc" placeholder="Email" value="" required="true">
                    </div>

                    <div class="form-group">
                      <input  v-show="!reset" type="password" name="password" id="password" tabindex="2" v-model="creds.password" class="form-control efc" placeholder="Password" required="true">
                    </div>

                    <div class="form-group text-center">
                      <label style="color:#52d3aa;">{{message}}</label>
                    </div>


                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <input  v-show="!reset" type="submit"  name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login efc" value="Log In">
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="text-center">
                              <a  v-show="!reset" v-on:click="setReset()" tabindex="5" href="#resetPW-form" class="forgot-password">Forgot Password?</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </form>


                  <form @submit.prevent="signup" id="register-form" style="display: none;">


                    <div v-for =" message in successmessages">
                        <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                    </div>

                    <div v-for =" message in failuremessages">
                        <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                    </div>

                    <div class="form-group">
                        <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control efc" id="name" placeholder="Name" v-model="creds.name" required="*">
                        <span v-show="errors.has('name')">{{ errors.first('name') }}</span>
                          <!-- <input type="text" class="form-control" id="name" placeholder="Name" v-model="creds.name" /> -->
                    </div>

                    <div class="form-group">
                     <input v-validate="{ rules: { required: true, email: true } }" type="text" name="email" class="form-control efc" id="email" placeholder="Email" v-model="creds.email" required="*">
                     <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-group">
                      <input v-validate="{ rules: { required: true} }" type="text" name="university " class="form-control efc" id="university" placeholder="University" v-model="university" required="*">
                      <span v-show="errors.has('university')">{{ errors.first('university') }}</span>
                    </div>

                    <div class="form-group">
                      <input v-validate="{ rules: { required: true} }" type="text" name="address" class="form-control efc" id="address" placeholder="Address" v-model="address">
                      <span v-show="errors.has('address')">{{ errors.first('address') }}</span>
                    </div>

                    <div class="form-group">
                      <input v-validate="{ rules: { required: true} }" type="date" name="birthdate" class="form-control efc" id="birthdate" placeholder="Birthdate" v-model="birthdate">
                      <span v-show="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
                    </div>

                    <div class="form-group">
                      <div>
                        <label class="control-label">Interests</label><span style="font-weight: normal; font-size:12px; margin-left: 5px;"> (tell us a bit about what you like)</span>
                      </div>

                      <span v-for="interest in this.interests" style="font-size:14px; margin-right:10px;">
                            <input type="checkbox" :id="interest" :value="interest" v-model="Interests">
                            <label for="interest" style="font-weight: normal;">{{interest.name}}</label>
                      </span>
                    </div>

                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control efc btn btn-register" value="Register Now">
                        </div>
                      </div>
                    </div>

                  </form>

                  <form @submit.prevent="resetPW" id="resetPW-form"  role="form" style="display: block;">
                    <div class="form-group">
                      <input  v-show="reset" type="text" name="email" id="email" tabindex="1" v-model="resetPWEmail" class="form-control efc" placeholder="Email" value="" required="true">
                    </div>

                    <div class="form-group text-center">
                      <label style="color:#52d3aa;">{{message}}</label>
                    </div>
                    <h5  v-if="reset">N.B: An email will be sent to this email with a temporarily new password</h5>

                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <input  v-if="reset" type="submit"   name="resetPW-submit" id="resetPW-submit" tabindex="7" class="form-control btn btn-login efc" value="Reset Password">
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
              </div>
          </div>
        </div>
    </div>
  </div>

  <div class ="gent" v-if="showgent" >
    <div class="nav-md">
      <div class="container body">
        <div class="main_container">
          <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
              <div class="navbar nav_title" style="border: 0;">
                <a href="/" class="site_title"><i class="fa fa-paw"></i> <span>FOOBAR</span></a>
              </div>

              <div class="clearfix"></div>

              <!-- menu profile quick info -->
              <div class="profile clearfix">
                <div class="profile_pic">
                      <img v-if="profilepic.path" :src="'http://54.77.11.251:3000/'+profilepic.path.replace('public','')" alt="" class="img-circle profile_img" style="height:70px; width:70px">
                      <img v-if="!profilepic.path" src="~assets/img/missing.png" alt="" class="img-circle profile_img" style="height:70px; width:70px">
                </div>
                <div class="profile_info">
                  <span>Welcome</span>
                  <h2>{{ name | capitalize }}</h2>
                </div>
                <div class="clearfix"></div>
              </div>
              <!-- /menu profile quick info -->

              <br />

              <!-- sidebar menu -->
              <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

                <!--CUSTOM TO USER-->
                <div class="menu_section" v-show="this.user.type===1">
                  <h3>Admin</h3>
                  <ul class="nav side-menu">
                    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                          <li>
                            <router-link to="Adminpostannouncement">Post Announcement</router-link>
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

                      </ul>
                    </li>
                  </ul>
                </div>

                <div class="menu_section" v-show="this.user.type===3" >
                  <h3>Service Provider</h3>
                  <ul class="nav side-menu">
                    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                            <li><router-link to="/">Home</router-link></li>
                            <li><router-link to="/announcements">Announcements</router-link></li>
                            <li><router-link to="/SPPostAnnouncement">Post Announcement</router-link></li>
                            <li v-show="this.user.is_blocked===false"><router-link to="/SPPostOffer" >Post Offer</router-link></li>
                            <li><router-link to="/SPReservations">View Reservations</router-link></li>
                            <li><router-link to="/SPReviews">View Reviews</router-link></li>
                            <li><router-link to="/SPAssess">Assess Students</router-link></li>
                            <li><router-link to="/SPViewMyProfile">My Profile</router-link></li>
                            <li><router-link to="/SPEditProfile">Edit Profile</router-link></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div class="menu_section" v-show="this.user.type===2">
                  <h3>Student</h3>
                  <ul class="nav side-menu" >
                    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                          <li><router-link to="/">Home</router-link></li>
                          <li><router-link to="/viewOffers">Your Offers</router-link></li>
                          <li><router-link to="/AllOffers">All Offers</router-link></li>
                          <li><router-link to="/announcements">Announcements</router-link></li>
                          <li><router-link to="/viewReservations">Reservation</router-link></li>
                          <li><router-link to="/quiz">Test</router-link></li>
                          <li><router-link  :to ="{ name : 'StudentProfile' , params: {Studid : this.decodeid}}">My Profile</router-link></li>
                          <li><router-link  to="/sPs">SPS</router-link></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <!--END CUSTOM-->

              </div>
              <!-- /sidebar menu -->

              <!-- /menu footer buttons -->
              <div class="sidebar-footer">
                <center>
                <a data-toggle="tooltip" href="/" v-on:click="logout" style="width:100%;" title="Logout">
                  <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
                </center>
              </div>
              <!-- /menu footer buttons -->
            </div>
          </div>

          <!-- top navigation -->
          <div class="top_nav">
            <div class="nav_menu">
              <nav>
                <div class="nav toggle">
                  <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>

                <ul class="nav navbar-nav navbar-right" style="">
                  <li class="dropdown">
                    <a href="" role="button" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <img v-if="profilepic.path" :src="'http://54.77.11.251:3000/'+profilepic.path.replace('public','')" alt="">
                      <img v-if="!profilepic.path" src="~assets/img/missing.png" alt="">
                      {{ name | capitalize }}
                      <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right" style="">
                      <li><router-link  :to ="{ name : 'StudentProfile' , params: {Studid : this.decodeid}}">Profile</router-link> </li>
                      <li><a  href="/" v-on:click="logout"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    </ul>
                  </li>

                  <li role="presentation" class="dropdown">
                    <a href="" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                      <i class="fa fa-envelope-o"></i>
                      <span class="badge bg-green">{{announcements.length}}</span>
                    </a>
                    <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">

                       <li v-for="n in announcements.slice(0,10)">


                          <span>
                          <h2 style="color:#52d3aa">  <span>{{n.title.substring(0, 30)}}</span> </h2>
                          </span>
                          <span class="message">
                            {{n.content.substring(0, 30)}}
                          </span> -    <span class="time">{{n.createdAt.substring(0, 10)}}</span>

                      </li>

                      <li>
                        <div class="text-center">
                          <router-link to="/announcements">
                            <strong>See All Alerts</strong>
                            <i class="fa fa-angle-right"></i>
                          </router-link>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <!-- /top navigation -->

          <!-- page content -->
          <div class="right_col" role="main">
            <transition>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
          <!-- /page content -->


        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import router from './router'
import AppNav from './AppNav.vue'
export default {
data () {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      creds: {
        username: '',
        password: '',
        password2:''
      },
      resetPWEmail: '',
      error: '',
      decodeid: '',
      message:'',
      name:'',
      university:'',
      description:'',
      interests:[],
      birthdate:'',
      address:'',
      Interests:[],
      showgent: false,
      profilepic:'',
      announcements:[],
      announcementsInPage:[],
      numberOfPages: 0,
      perPage: 3,
      successmessages:[{msg:''}],
      failuremessages:[{msg:''}],
      showadmin:false,
      showsp:false,
      showstudent:false,
      reset: false,

  // User object will let us check authentication status
  user: {
    authenticated: false,
    type: 0,
    is_blocked:false
  }}},

created() {

if(localStorage.getItem('id_token')!=null){
  this.showgent= true
  this.user.authenticated=true
  this.$http.post('http://54.77.11.251:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
    this.decodeid=decode.body.id
    ////console.log(this.decodeid)
    this.user.type = decode.body.type;
    this.user.is_blocked = decode.body.is_blocked;
    this.name = decode.body.name;
    this.profilepic = decode.body.image;
    this.getAllAnnouncements();

})
}

this.findAllInterests()

 },


methods: {
  // Send a request to the login URL and save the returned JWT
  login : function() {
    var app = this;
    app.$http.post('http://54.77.11.251:3000/api/users/login', {
	"email":app.creds.username,
	"password":  app.creds.password
}).then(data => {
      localStorage.setItem('id_token', data.body.token)
      app.user.authenticated = true
      app.$http.post('http://54.77.11.251:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
        this.getAllAnnouncements();

        this.decodeid = decode.body.id;
      //  //console.log(decode.body.type)
        this.user.type = decode.body.type;
        this.user.is_blocked = decode.body.is_blocked;
        localStorage.setItem('usertype', decode.body.type)
        this.name = decode.body.name;
        this.profilepic = decode.body.image;

      })
       $('#myModal').modal('hide');
       this.$router.go({
          path: '/testingg',
          force: true
        })

       this.showgent = true
}).catch(function(reason) {
   this.message = reason.body.err;
});
  },
  getAllAnnouncements: function () {
      this.$http.get('http://54.77.11.251:3000/api/announcements/view',{"token": localStorage.getItem('id_token')}).then(response => {
        this.announcements=response.data.data.announcements
      //  //console.log(this.announcements);
        this.numberOfPages=Math.ceil(this.announcements.length/this.perPage);
        for(var i = 0 ; i<this.perPage && i<this.announcements.length ; i++){
          this.announcementsInPage.push(this.announcements[i]);
        }
      //  //console.log(this.announcementsInPage)
      })
    },
  signup : function() {
    this.$http.post('http://54.77.11.251:3000/api/users/signup', {
    "email":this.creds.email,
    "name":this.creds.name,
    "university":this.university,
    "address":this.address,
    "birthdate":this.birthdate,
    "description":this.description,
    "interests":this.Interests

}).then(data => {
  swal(
    'Signup Successful',
    'A confirmation email has been sent with your password',
    'success'
  )
 this.failuremessages=[{msg:''}];


    }).catch(function(reason) {
        this.failuremessages = reason.body.err;
        this.successmessages= [{msg:''}];

});

  },
 setReset: function(){
    this.reset = true;
  },

  resetPW : function() {
    this.$http.post('http://54.77.11.251:3000/api/users/resetPW', {"email":this.resetPWEmail},{"token": localStorage.getItem('id_token')}).then(decode => {
      alert("New Password sent to ".concat(this.resetPWEmail));
      //console.log('success');

  }).catch(function(reason) {
        this.failuremessages = reason.body.err;
        this.successmessages= [{msg:''}];

});
this.$router.go({path:'/',force:true});
  },

  // To log out, we just need to remove the token
  logout : function() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    this.user.type = 0;
    this.creds.username='';
    this.creds.name='';
    this.creds.password='';
    this.creds.password2='';
    this.university='';
    this.description='';
    this.interests=[];
    this.birthdate='';
    this.address='';
    this.Interests=[];
    localStorage.setItem('usertype', 0)



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
    this.$http.get('http://54.77.11.251:3000/api/students/all/interests/').then(response => {
        this.interests=response.body.data.interests
      })
  },


}

}
</script>
