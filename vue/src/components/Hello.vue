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

	<section id="fh5co-intro">
		<div class="container">
			<div class="row row-bottom-padded-lg">
				<div class="fh5co-block to-animate" :style="{ backgroundImage: 'url(' + img_7 + ')' }">
					<div class="overlay-darker"></div>
					<div class="overlay"></div>
					<div class="fh5co-text">
						<i class="fh5co-intro-icon icon-bulb"></i>
						<h2>Plan</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						<!--<p><a href="#" class="btn btn-primary">Get In Touch</a></p>-->
					</div>
				</div>
				<div class="fh5co-block to-animate" :style="{ backgroundImage: 'url(' + img_8 + ')' }">
					<div class="overlay-darker"></div>
					<div class="overlay"></div>
					<div class="fh5co-text">
						<i class="fh5co-intro-icon icon-wrench"></i>
						<h2>Develop</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						<!--<p><a href="#" class="btn btn-primary">Click Me</a></p>-->
					</div>
				</div>
				<div class="fh5co-block to-animate" :style="{ backgroundImage: 'url(' + img_10 + ')' }">
					<div class="overlay-darker"></div>
					<div class="overlay"></div>
					<div class="fh5co-text">
						<i class="fh5co-intro-icon icon-rocket"></i>
						<h2>Launch</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						<!--<p><a href="#" class="btn btn-primary">Why Us?</a></p>-->
					</div>
				</div>
			</div>
			<div class="row watch-video text-center to-animate">
				<span>Watch the video</span>

				<a href="https://vimeo.com/channels/staffpicks/93951774" class="popup-vimeo btn-video"><i class="icon-play2"></i></a>
			</div>
		</div>
	</section>

	<section id="fh5co-work" data-section="about">
		<div class="container">
			<div class="row">
				<div class="col-md-12 section-heading text-center">
					<h2 class="to-animate">Benefit</h2>
					<div class="row">
						<div class="col-md-8 col-md-offset-2 subtext to-animate">
							<h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="row row-bottom-padded-sm">
				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_1" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_1.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 1</h2>
						<span>Branding</span>
						</div>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_2" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_2.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 2</h2>
						<span>Web</span>
						</div>
					</a>
				</div>

				<div class="clearfix visible-sm-block"></div>

				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_3" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_3.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 3</h2>
						<span>Web</span>
						</div>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_4" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_4.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 4</h2>
						<span>UI/UX</span>
						</div>
					</a>
				</div>

				<div class="clearfix visible-sm-block"></div>

				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_5" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_5.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 1</h2>
						<span>Photography</span>
						</div>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_6" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_6.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 2</h2>
						<span>Illustration</span>
						</div>
					</a>
				</div>

				<div class="clearfix visible-sm-block"></div>

				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_7" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_7.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 3</h2>
						<span>Web</span>
						</div>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_8" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_8.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 4</h2>
						<span>Sketch</span>
						</div>
					</a>
				</div>

				<div class="clearfix visible-sm-block"></div>

				<div class="col-md-4 col-sm-6 col-xxs-12">
					<a :href="work_1" class="fh5co-project-item image-popup to-animate">
						<img src="~assets/img/work_1.jpg" alt="Image" class="img-responsive">
						<div class="fh5co-text">
						<h2>Project 2</h2>
						<span>Illustration</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>

  	<!--<section id="fh5co-services" data-section="services">
		<div class="container">
			<div class="row">
				<div class="col-md-12 section-heading text-left">
					<h2 class=" left-border to-animate">Services</h2>
					<div class="row">
						<div class="col-md-8 subtext to-animate">
							<h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-sm-6 fh5co-service to-animate">
					<i class="icon to-animate-2 icon-anchor"></i>
					<h3>Brand &amp; Strategy</h3>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean</p>
				</div>
				<div class="col-md-6 col-sm-6 fh5co-service to-animate">
					<i class="icon to-animate-2 icon-layers2"></i>
					<h3>Web &amp; Interface</h3>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean</p>
				</div>

				<div class="clearfix visible-sm-block"></div>

				<div class="col-md-6 col-sm-6 fh5co-service to-animate">
					<i class="icon to-animate-2 icon-video2"></i>
					<h3>Photo &amp; Video</h3>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean</p>
				</div>
				<div class="col-md-6 col-sm-6 fh5co-service to-animate">
					<i class="icon to-animate-2 icon-monitor"></i>
					<h3>CMS &amp; eCommerce</h3>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean</p>
				</div>

			</div>
		</div>
	</section>-->

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
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="89" data-speed="5000" data-refresh-interval="50">89</span>
						<span class="fh5co-counter-label">Finished projects</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-code to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="2343409" data-speed="5000" data-refresh-interval="50">2343409</span>
						<span class="fh5co-counter-label">Line of codes</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-cup to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="1302" data-speed="5000" data-refresh-interval="50">1302</span>
						<span class="fh5co-counter-label">Cup of coffees</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="fh5co-counter to-animate">
						<i class="fh5co-counter-icon icon-people to-animate-2"></i>
						<span class="fh5co-counter-number js-counter" data-from="0" data-to="52" data-speed="5000" data-refresh-interval="50">52</span>
						<span class="fh5co-counter-label">Happy clients</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="fh5co-contact" data-section="contact">
		<div class="container">
			<div class="row">
				<div class="col-md-12 section-heading text-center">
					<h2 class="to-animate">Join Us</h2>
					<div class="row">
						<div class="col-md-8 col-md-offset-2 subtext to-animate">
							<h3>Become a service provider & get a chance to reach thousands of students! Apply below.</h3>
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
						<li><i class="icon-phone"></i> (123) 465-6789</li>
						<li><i class="icon-envelope"></i>info@foobar.com</li>
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
			failuremessages:[{msg:''}]
      }
    },
  methods: {
	applySP: function ()
        {
            this.$http.post('http://localhost:3000/api/sPs/sP/apply', {"name":this.name,"email":this.email,"phone_number":this.phone_number,"description":this.description}).then(data => {
			$('#contactform').fadeOut()
			$('#successcontact').fadeIn('slow');

             this.$router.push({path:'/'});

            console.log('success');
                    }).catch(function(reason) {
                        console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                console.log(this.failuremessages)
                this.successmessages=[{msg:''}];
        });

	}, srch: function(){
			this.$http.post('http://localhost:3000/api/students/home', {search: this.search}).then(data => {
				console.log(data)
				this.results = data.results
				}).catch(function(reason) {
				console.log(reason)
			});
		}
  }
}
</script>
