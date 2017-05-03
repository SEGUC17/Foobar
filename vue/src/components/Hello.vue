<style scoped>


#features {
    margin-top:20px;
}
.feature, .feature i, .feature h3, .feature .title_border {
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
}
.feature {
    background:#FFFFFF;
    text-align:center;
    padding:20px;
    border: solid 1px #cccccc;
}
.feature p {
    margin-top:20px;
    margin-bottom:30px;
    color:#050914;
}
.feature i{
    font-size:80px;
    color:#FFFFFF;
    background:#1E825F;
    padding:30px;
    border-radius:50%;
    border: solid 3px #1E825F;
}
.feature h3 {
    color:#1E825F;
}
.feature:hover {
    background:#F5F5F5;
    -webkit-transform: translate(0,1em);
    -moz-transform: translate(0,1em);
    -o-transform: translate(0,1em);
    -ms-transform: translate(0,1em);
    transform: translate(0,1em);
}
.feature:hover i{
    color:#1E825F;
    border-color:#1E825F;
    background:#FFFFFF;
}
.feature:hover .title_border {
    background-color:#1E825F;
    width:50%;
}
.feature .title_border {
    width: 0%;
    height: 3px;
    background:#1E825F;
    margin: 0 auto;
    margin-top: 12px;
    margin-bottom: 8px;
}



</style>

<template>
<div class ="js">
  	<section id="fh5co-home" data-section="home" :style="{ backgroundImage: 'url(' + full_image_2 + ')' }" data-stellar-background-ratio="0.5">
		<div class="gradient"></div>
		<div class="container">
			<div class="text-wrap">
				<div class="text-inner">
					<div class="row">
						<div class="col-md-8 col-md-offset-2">
							<h1 class="to-animate">Do something you love.</h1>
							<h2 class="to-animate">Discover what you're passionate about!</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="slant"></div>
	</section>


  <section id="fh5co-work" data-section="about">
		<div class="container">
      <div class="row">
      <div class="col-md-12 section-heading text-center">
					<h2 class="to-animate">Service Providers</h2></div>
            <div v-if="authenticated" v-for=" serviceprovider in serviceproviders.slice(0,9)">

<div v-if="!serviceprovider.user_id.is_deleted">


                 <center> <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}">
                  <div class="col-md-4 feature">

                      <center><img class="img-circle img-responsive" v-if="serviceprovider.user_id && serviceprovider.user_id.profileimg.path" :src="'http://54.77.11.251:3000/'+serviceprovider.user_id.profileimg.path.replace('public','')" style="height:150px; width:150px">
                      <i class="glyphicon glyphicon-user" style="height:150px; width:150px" v-else></i></center>
                          <h3>Name: {{serviceprovider.user_id.name}}</h3>
                          <div class="title_border"></div>
                          <p><h5 class="title"></h5>
              </p>
                          <p>Email: {{serviceprovider.user_id.email}} </p>
              <p class="info">Phone Number: {{serviceprovider.phone_number}}<br />
               Description: {{serviceprovider.description.substring(0, 30)}}<span v-if="serviceprovider.description.length>30">...</span>


              </p>
            </div>
                  </router-link> </center></div>
                  </div>
                  <div v-if="!authenticated" v-for=" serviceprovider in serviceproviders.slice(0,9)">
                  	<div v-if="!serviceprovider.user_id.is_deleted">

                       <center>
                      <a  v-on:click="messag"> <div class="col-md-4 feature" v-if="!serviceprovider.user_id.is_deleted">

                            <center><img class="img-circle img-responsive" v-if="serviceprovider.user_id && serviceprovider.user_id.profileimg.path" :src="'http://54.77.11.251:3000/'+serviceprovider.user_id.profileimg.path.replace('public','')" style="height:150px; width:150px">
                            <i class="glyphicon glyphicon-user" style="height:150px; width:150px" v-else></i></center>
                                <h3>Name: {{serviceprovider.user_id.name}}</h3>
                                <div class="title_border"></div>
                                <p><h5 class="title"></h5>
                    </p>
                                <p>Email: {{serviceprovider.user_id.email}} </p>
                    <p class="info">Phone Number: {{serviceprovider.phone_number}}<br />
                     Description: {{serviceprovider.description.substring(0, 30)}}<span v-if="serviceprovider.description.length>30">...</span>


                    </p>
                  </div></a>
                      </center>
                      </div>
                        </div>



  </div>
</div>
</section>



  	<section id="fh5co-counters" data-section="funfacts" style="background-image: url(images/full_image_1.jpg);" data-stellar-background-ratio="0.5">
		<div class="fh5co-overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-12 section-heading text-center to-animate">
					<h2>Fun Facts</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-briefcase to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="15" data-speed="2" data-refresh-interval="50">89</span>
						<span class="fh5co-counter-label">Finished projects</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-code to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="20000" data-speed="10" data-refresh-interval="50">20000</span>
						<span class="fh5co-counter-label">Line of codes</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-cup to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="100000" data-speed="5068" data-refresh-interval="50">1000000</span>
						<span class="fh5co-counter-label">Cup of coffees</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-people to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="1" data-speed="" data-refresh-interval="50">52</span>
						<span class="fh5co-counter-label">Happy clients</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="fh5co-contact" data-section="contact" v-if="!this.authenticated">
		<div class="container">
			<div class="row">
				<div class="col-md-12 section-heading text-center">
					<h2 class="to-animate">Join Us</h2>
					<div class="row">
						<div class="col-md-8 col-md-offset-2 subtext to-animate">
							<h3>Become a service provider and get a chance to reach thousands of students! Apply below.</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="row row-bottom-padded-md">
				<div class="col-md-6 to-animate">
					<h3>Contact Info</h3>
					<ul class="fh5co-contact-info">
						<li class="fh5co-contact-address ">
							<i class="icon-home"></i>
							5555 Love Paradise 56 New Clity 5655, <br>Cairo Egypt
						</li>
						<li><i class="icon-phone"></i>+1 (123) 465-6789</li>
						<li><i class="icon-envelope"></i>foobar.se@gmail.com</li>
						<li><i class="icon-globe"></i> <a href="#" target="_blank">foobar.com</a></li>
					</ul>
				</div>

				<div class="col-md-6 to-animate">

		<h3>Contact Form</h3>

		<div id ="successcontact"style="display:none;">
			<div class="text-center">
				<i class="fa fa-check" aria-hidden="true" style="color: #52d3aa; font-size: 36px;"></i>
				Submitted. We'll contact you shortly!
			</div>
		</div>


	<form role="form" class="" id="contactform" @submit.prevent="">

        <div class="form-group">
    <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control efc" id="name" placeholder="Name" v-model="name" required="*">
                     <span v-show="errors.has('name')">{{ errors.first('name') }}</span>

        </div>

        <div class="form-group">
                   <input v-validate="{ rules: { required: true,email: true} }" type="email" name="email" class="form-control efc" id="email" placeholder="Email" v-model="email" required="*">
                     <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
              <input v-validate="{ rules: { required: true} }" type="text" name="phone_number" class="form-control efc" id="phone_number" placeholder="Phone Number" v-model="phone_number" required="*">
                     <span v-show="errors.has('phone_number')">{{ errors.first('phone_number') }}</span>
        </div>

        <div class="form-group">
            <textarea v-validate="{ rules: { required: true} }" type="text" name="description" class="form-control efc" id="description" placeholder="Description" v-model="description" required="*"></textarea>
                     <span v-show="errors.has('description')">{{ errors.first('description') }}</span>

        </div>

        <div class="row text-center">
              <button class="btn btn-primary btn-lg"  v-on:click="applySP"> Apply</button>
        </div>

		     <div v-for =" message in successmessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                     </div>
                   <div v-for =" message in failuremessages">
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
           </div>
           <br><br>

    </form>

				</div>
				</div>
			</div>
	</section>


</div>
</template>
<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>

<script>
export default {
  name: 'hello',
  data(){
    return{
          order_status: 'READY',
		  full_image_2: require('../assets/img/full_image_2.jpg'),
		  img_7: require('../assets/img/img_7.jpg'),
		  img_8: require('../assets/img/img_8.jpg'),
		  img_10: require('../assets/img/img_10.jpg'),

		  work_1: require('../assets/img/work_1.jpg'),
		  work_2: require('../assets/img/work_2.jpg'),
		  work_3: require('../assets/img/work_3.jpg'),
		  work_4: require('../assets/img/work_4.jpg'),
		  work_5: require('../assets/img/work_5.jpg'),
		  work_6: require('../assets/img/work_6.jpg'),
		  work_7: require('../assets/img/work_7.jpg'),
		  work_8: require('../assets/img/work_8.jpg'),

			name:'',
			email:'',
			phone_number:'',
			description:'',
			successmessages:[{msg:''}],
			failuremessages:[{msg:''}],
      serviceproviders:[],
      sps:[],

        authenticated: false,


      }
    },created(){
      if(localStorage.getItem('id_token')!=null){
        this.authenticated=true
      }
      this.getAllServiceProviders()
    },
  methods: {
	applySP: function ()
        {
            this.$http.post('http://54.77.11.251:3000/api/sPs/sP/apply', {"name":this.name,"email":this.email,"phone_number":this.phone_number,"description":this.description}).then(data => {
			$('#contactform').fadeOut()
			$('#successcontact').fadeIn('slow');

             this.$router.push({path:'/'});

            //console.log('success');
                    }).catch(function(reason) {
                        // //console.log(reason.body.err);
                // this.failuremessages = reason.body.err;
              if(reason.body.errors!=null)
              {
      swal(
  'Oops...',
  'Invalid input',
  'error'
)
}else if(reason.body.err!=null){
  //console.log(reason.body)
  swal(
'Oops...',
reason.body.err ,
'error'
)
}
                // //console.log(this.failuremessages)
                this.successmessages=[{msg:''}];
        });

	},
messag: function(){
  console.log(1);
  swal(
'Oops...',
"Please login to view our serviceproviders" ,
'warning'
)
}
,

  srch: function(){
			this.$http.post('http://54.77.11.251:3000/api/students/home', {search: this.search}).then(data => {
				//console.log(data)
				this.results = data.results
				}).catch(function(reason) {
				//console.log(reason)
			});
		},getAllServiceProviders: function () {
    this.$http.get('http://54.77.11.251:3000/api/admins/sPs').then(response => {
        //console.log(response.data)
        this.serviceproviders=response.data.data.users;
        var i = 0;
              for (i; i < 10; i++) {
                this.sps[i] = this.serviceproviders[i];
              }
    })
    }
  }
}
</script>
