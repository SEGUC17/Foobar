<template>
	<header role="banner" id="fh5co-header">
			<div class="container">
				<!-- <div class="row"> -->
			    <nav class="navbar navbar-default">
		        <div class="navbar-header">
		        	<!-- Mobile Toggle Menu Button -->
					   <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
		         <a class="navbar-brand" href="/">Foobar Baby</a> 
		        </div>
		        <div id="navbar" class="navbar-collapse collapse">
		          <ul class="nav navbar-nav navbar-right">
		            <li class="active"><a href="#" data-nav-section="home"><span>Home</span></a></li>
		            <li><a href="#" data-nav-section="work"><span>Work</span></a></li>
		            <li><a href="#" data-nav-section="services"><span>Services</span></a></li>
		            <li><a href="#" data-nav-section="contact"><span>Contact</span></a></li>
              </ul>
		        </div>
			    </nav>
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
      alert("You logged in successfully");
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
      this.successmessages[0].msg = "Registered Successfully, you can login now";
     this.failuremessages=[{msg:''}];
        this.creds.email='';
      this.creds.name='';
      this.creds.password='';
      this.creds.password2='';
      this.university='';
      this.description='';
      this.interests=[];
      this.birthdate='';
      this.address='';
      this.Interests=[];

    }).catch(function(reason) {
        this.failuremessages = reason.body.err;
        this.successmessages= [{msg:''}];

});

  },

  resetPW : function() {

    this.$http.post('http://localhost:3000/api/users/resetPW', {"email":this.resetPWEmail}).then(data => {
      alert("New Password sent to ".concat(this.resetPWEmail));
      console.log('success');
      
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
    alert("You successfully Logged Out"); 
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
    this.$router.push({path:'/'})
    this.successmessages=[{msg:''}],
      this.failuremessages=[{msg:''}]

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
        this.interests=response.body.data.interests
      })
  }

}

}
</script>
