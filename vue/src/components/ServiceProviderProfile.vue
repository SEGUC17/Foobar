<style scoped>

#content10 {
    width: 400px;
    margin: 0 auto;
    background-color: #ffffff;
}

#content11 {
    width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
}
#content12 {
    width: 650px;
    margin: 0 auto;
    background-color: #ffffff;
}

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





*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.clearfix:before,
.clearfix:after {
	content: " ";
	display: table;
}

.clearfix:after {
	clear: both;
}

body {
	font-family: sans-serif;
	background: #f6f9fa;
}

h1 {
	color: #ccc;
	text-align: center;
}

a {
  color: #ccc;
  text-decoration: none;
  outline: none;
}

/*Fun begins*/
.tab_container {
	width: 90%;
	margin: 0 auto;
	padding-top: 70px;
	position: relative;
}

input, section {
  clear: both;
  padding-top: 10px;
  display: none;
}

label {
  font-weight: 700;
  font-size: 18px;
  display: block;
  float: left;
  width: 20%;
  padding: 1.5em;
  color: #757575;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background: #f0f0f0;
}

#tab1:checked ~ #content1,
#tab2:checked ~ #content2,
#tab3:checked ~ #content3,
#tab4:checked ~ #content4,
#tab5:checked ~ #content5 {
  display: block;
  padding: 20px;
  background: #fff;
  color: #999;
  border-bottom: 2px solid #f0f0f0;
}

.tab_container .tab-content p,
.tab_container .tab-content h3 {
  -webkit-animation: fadeInScale 0.7s ease-in-out;
  -moz-animation: fadeInScale 0.7s ease-in-out;
  animation: fadeInScale 0.7s ease-in-out;
}
.tab_container .tab-content h3  {
  text-align: center;
}

.tab_container [id^="tab"]:checked + label {
  background: #fff;
  box-shadow: inset 0 3px #0CE;
}

.tab_container [id^="tab"]:checked + label .fa {
  color: #0CE;
}

label .fa {
  font-size: 1.3em;
  margin: 0 0.4em 0 0;
}

/*Media query*/
@media only screen and (max-width: 930px) {
  label span {
    font-size: 14px;
  }
  label .fa {
    font-size: 14px;
  }
}

@media only screen and (max-width: 768px) {
  label span {
    display: none;
  }

  label .fa {
    font-size: 16px;
  }

  .tab_container {
    width: 98%;
  }
}

/*Content Animation*/
@keyframes fadeInScale {
  0% {
  	transform: scale(0.9);
  	opacity: 0;
  }

  100% {
  	transform: scale(1);
  	opacity: 1;
  }
}

@import "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css";

@import "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
.box > .icon {
    text-align:
    center;
    position:
    relative;
    }
.box > .icon > .image {
    position: relative;
    z-index: 2;
    margin: auto;
    width: 88px;
    height: 88px;
    border: 8px solid white;
    line-height: 88px;
    border-radius: 50%;
    background: #428bca;
    vertical-align: middle;
    }
.box > .icon > .image > i {
    font-size: 36px !important;
    color: #fff !important;
    }
.box > .icon:hover > .image > i {
    color: white !important;
    }
.box > .icon > .info {
    margin-top: -24px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid #e0e0e0;
    padding: 15px 0 10px 0;
    }
.box > .icon > .info > h3.title {
    font-family: sans-serif !important;
    font-size: 16px;
    color: #222;
    font-weight: 500;
    }
.box > .icon > .info > p {
    font-family: sans-serif !important;
    font-size: 13px;
    color: #666;
    line-height: 1.5em;
    margin: 20px;
    }
.box > .icon:hover > .info > h3.title, .box > .icon:hover > .info > p, .box > .icon:hover > .info > .more > a {
    color: #222;
    }
.box > .icon > .info > .more a {
    font-family: sans-serif !important;
    font-size: 12px;
    color: #222;
    line-height: 12px;
    text-transform: uppercase;
    text-decoration: none;
    }
.box > .icon:hover > .info > .more > a {
    color: #fff;
    padding: 6px 8px;
    background-color: #63B76C;
    }
.box .space {
    height: 30px;
    }



@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,700);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css);
*, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
body, html {
    font-size: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
}
/* clearfix */
.clearfix:before, .clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
body {
    font-family: 'Roboto', Calibri, Arial, sans-serif;
    color: #89867e;
    background: #fff;
}
a {
    color: #888;
    text-decoration: none;
}
a:hover,
a:active {
    color: #333;
}
/* Header Style */
.main,
.container > header {
    margin: 0 auto;
    padding: 2em;
}
.container > header {
    text-align: center;
}
.container > header h1 {
    font-size: 2.625em;
    line-height: 1.3;
    margin: 0;
    font-weight: 300;
}
.container > header span {
    display: block;
    font-size: 60%;
    opacity: 0.5;
    padding: 0 0 0.6em 0.1em;
}

.container {
    height: 100%;
    position: relative;
}
.container > section {
    margin: 0 auto;
    padding: 5em 0.5em;
    text-align: center;
    color: #fff;
}
.container > section div {
    position: relative;
    margin: 0;
    z-index: 1;
}
.container > section div.text {
    font-size: 1.4em;
}
.no-touch .note-touch {
    display: none;
}
.color-pattern-1 {
    background: #0e83cd;
}
.color-pattern-2 {
    background: #f06060;
}
.color-pattern-3 {
    background: #fcd04b;
}
.color-pattern-4 {
    background: #CC2E8C;
}
.color-pattern-5 {
    background: #0e83cd;
}

/* General button style (reset) */
.button {
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: #F25C27;
    cursor: pointer;
    padding: 25px 80px;
    display: inline-block;
    margin: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.button:after {
    content: '';
    position: relative;;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
/* Button 1 */
.button-1 {
    border: 3px solid #fff;
    color: #fff;
}
/* Button 1a */
.button-1a:hover,
.button-1a:active {
    color: #0e83cd;
    background: #fff;
}
/* Button 1b */
.button-1b:after {
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    background: #fff;
}
.button-1b:hover,
.button-1b:active {
    color: #0e83cd;
}
.button-1b:hover:after,
.button-1b:active:after {
    height: 100%;
}
/* Button 1c */
.button-1c:after {
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
}
.button-1c:hover,
.button-1c:active {
    color: #0e83cd;
}
.button-1c:hover:after,
.button-1c:active:after {
    width: 100%;
}
/* Button 1d */
.button-1d {
    overflow: hidden;
}
.button-1d:after {
    width: 0;
    height: 103%;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.button-1d:hover,
.button-1d:active {
    color: #0e83cd;
}
.button-1d:hover:after {
    width: 104%;
    opacity: 1;
}
.button-1d:active:after {
    width: 101%;
    opacity: 1;
}
/* Button 1e */
.button-1e {
    overflow: hidden;
}
.button-1e:after {
    width: 100%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -moz-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -ms-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
}
.button-1e:hover,
.button-1e:active {
    color: #0e83cd;
}
.button-1e:hover:after {
    height: 335%;
    opacity: 1;
}
.button-1e:active:after {
    height: 400%;
    opacity: 1;
}
/* Button 1f */
.button-1f {
    overflow: visible;
}
.button-1f:after {
    width: 101%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.button-1f:hover,
.button-1f:active {
    color: #0e83cd;
}
.button-1f:hover:after {
    height: 104%;
    opacity: 1;
}
.button-1f:active:after {
    height: 130%;
    opacity: 1;
}
/* Button 2 */
.button-2 {
    background: #cb4e4e;
    color: #fff;
    -webkit-box-shadow: 0 4px #ab3c3c;
    -moz-box-shadow: 0 4px #ab3c3c;
    box-shadow: 0 4px #ab3c3c;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
}

#myInput		{
position: inline;
display:inline-block;
  left:10px;
  top: 50px;
  border: none;
   border-bottom: 2px solid lightseagreen;

  width:20%;
  -webkit-transition:width 0.3s ease-in-out;

}
#myInput:focus	{
position: inline;
display:inline-block;
  left:10px;
  border: none;
     border-bottom: 2px solid lightseagreen;
  top: 50px;
  width:90%;

  -webkit-transition:width 0.5s ease-in-out;
}

#myInput1		{
  position: inline;


  width:90%;
  -webkit-transition:width 0.3s ease-in-out;

}

#makan1 {
    padding-left: 7px;
}
#makan4 {
  padding-left: 30px;

}
  @import "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
  .box > .icon {
      text-align:
      center;
      position:
      relative;
      }
  .box > .icon > .image {
      position: relative;
      z-index: 2;
      margin: auto;
      width: 88px;
      height: 88px;
      border: 8px solid white;
      line-height: 88px;
      border-radius: 50%;
      background: #f0f0f0;
      vertical-align: middle;
      }
  .box > .icon > .image > i {
      font-size: 36px !important;
      color: #fff !important;
      }
  .box > .icon:hover > .image > i {
      color: white !important;
      }
  .box > .icon > .info {
      margin-top: -24px;
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid #e0e0e0;
      padding: 15px 0 10px 0;
      }
  .box > .icon > .info > h3.title {
      font-family: sans-serif !important;
      font-size: 16px;
      color: #222;
      font-weight: 500;
      }
  .box > .icon > .info > p {
      font-family: sans-serif !important;
      font-size: 13px;
      color: #666;
      line-height: 1.5em;
      margin: 20px;
      }
  .box > .icon:hover > .info > h3.title, .box > .icon:hover > .info > p, .box > .icon:hover > .info > .more > a {
      color: #222;
      }
  .box > .icon > .info > .more a {
      font-family: sans-serif !important;
      font-size: 12px;
      color: #222;
      line-height: 12px;
      text-transform: uppercase;
      text-decoration: none;
      }
  .box > .icon:hover > .info > .more > a {
      color: #fff;
      padding: 6px 8px;
      background-color: #63B76C;
      }
  .box .space {
      height: 30px;
      }

  .modal-header-primary {
      color:#fff;
      padding:9px 15px;
      border-bottom:1px solid #eee;
      background-color: #2a3f54;
      -webkit-border-top-left-radius: 5px;
      -webkit-border-top-right-radius: 5px;
      -moz-border-radius-topleft: 5px;
      -moz-border-radius-topright: 5px;
       border-top-left-radius: 5px;
       border-top-right-radius: 5px;
  }




</style>

<template>


   <div>

		<div class="tab_container">
			<input id="tab1" type="radio" name="tabs" checked>
			<label for="tab1"><span>About</span></label>

			<input id="tab2" type="radio" name="tabs" v-on:click="Offers">
			<label for="tab2"><span>Offers</span></label>

			<input id="tab3" type="radio" name="tabs" v-on:click="getImages">
			<label for="tab3"></i><span>Images</span></label>

			<input id="tab4" type="radio" name="tabs" v-on:click="Video">
			<label for="tab4"><span>Videos</span></label>

			<input id="tab5" type="radio" name="tabs" v-on:click="getReviews">
			<label for="tab5"><span>Reviews</span></label>

			<section id="content1" class="tab-content">
          <h3>{{user.name}}</h3>
          <center><img class="img-circle img-responsive" v-if="user && user.profileimg && user.profileimg.path" :src="'http://54.77.11.251:3000/'+user.profileimg.path.replace('public','')" style="height:150px; width:150px">
<img v-else alt="User Pic" src="~assets/img/missing.png" class="img-circle img-responsive" style="height:150px; width:150px"> </center>
<br></br>
		      	<p><table class="table table-user-information">
              <tbody>
         <tr>
             <tr>
                  <td>Description</td>
                  <td>{{service.description}}</td>
                </tr>
                  <tr>
                  <td>Location</td>
                  <td>{{service.location}}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{user.email}}</td>
                </tr>
                <tr>


                  <td>Phone Number</td>
                  <td>{{service.phone_number}}
                  </td>
    </tr>
                </tr>

              </tbody>
            </table>
</p>
			</section>

			<section id="content2" class="tab-content">

				<div>
				<br>


							<p>
								 <div class="container" id="features">

			<div class="row">
								<div v-for =" offer in offers" >


											<a href=""  @click.prevent="purchaseStuff(offer)" ><div class="col-md-4 feature">
														<i class="glyphicon glyphicon-check"></i>
															<h3>{{offer.title}}</h3>
															<div class="title_border"></div>
															<p><h5 class="title"><p>{{offer.description}}
									</p>
									<p class="info">$ {{offer.price}}<br /> Start Date: {{offer.start_date.substring(0, 10)}}<br /> End Date: {{offer.end_date.substring(0, 10)}}
								</p></h5</p>
											</div></a>

			</div></div>
				</div>
			</p>

			</div>
			</section>



			<section id="content3" class="tab-content">

		      	<p>
              <p><div id="content11">


                        <carousel >
                                  <slide v-for="slide in images" >

                                      <img :src="'http://54.77.11.251:3000/'+slide.img.path.replace('public','')" style="width:300px"></img>


                                  </slide>
                                </carousel>

  </div>      </p>
</p>
			</section>

			<section id="content4"  >

		      	<p>      <div class="container">
              <hr>
<div v-for ="video in videos"   id="content12">


  <div class="info" >
<center>


  <h3 class="title" style="color:#52d3aa"> {{video.title}}</h3></center>
</div>
<div class="" >


  <youtube :video-id="video.url"></youtube>

</div>
<hr>
</div>
</div></p>
			</section>

			<section id="content5" class="tab-content">
			<h1 style="color:#52d3aa">Reviews</h1>
		      	<p><div class="container" >


              <div v-for =" r in reviews">

<center>


              <div class="container"  id="content10">

      <div  class="row">
        <div class="col-md-3 col-xs-6">
<center>
          <div class="container" id="content10">
        <div class="icon">
          <div class="image"></div>
          <div class="info">
            <h3 class="title" style="color:#52d3aa">By: {{r.reviewer_id.name}}</h3>
              <h2 class="title"><p>   <div  id="makan3" >
           <star-rating :rating="r.rating" v-bind:show-rating="false" v-bind:read-only="true"   v-bind:inline="true">
</star-rating>
</div>
            </p>
            <p class="info">{{r.content}}
          </p></h2>
            <button class="btn btn-primary btn-sm" @click="viewComments(r._id)"href="#primary" data-toggle="modal">Comments</button>





            </div>
          </div>
        </div>
        </center>

      </div>

      </div>		</div> </center></div>
      <div class="container">
    <div class="row">
        <!-- Boxes de Acoes -->
        <div class="col-xs-12 col-sm-6 col-lg-4">
			<div>
				<div class="icon">

    <!-- Modal -->
    <div class="modal fade" id="primary" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header modal-header-primary">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>


                      <h4   align="left">  <div v-for="comment in pastComments">
                          <center>       {{comment.commenter_id.name}}:</center>

                            <center>    <h3 style="color:#52d3aa">{{comment.content}}</h3></center>
                              <br>
                          </div></h4>


                </div>
                <form role="form" class="" @submit.prevent="addComment">
                <div class="modal-body">
                  <div class="row">


                <input style="height:30px;font-size:16px; display:block" class="form-control input-lg" v-validate="{ rules: { required: true} }" id="myInput1" placeholder="Write a comment" type="text" v-model="comment" required="*">
 <!-- <input style="height:50px;font-size:10pt" v-validate="{ rules: { required: true} }" type="text" name="review" class="form-control input-lg" id="review" placeholder="Write a review" v-model="review" > -->

                </div>
                            </div>

                <div class="modal-footer">


                    <button class="btn btn-primary btn-sm" style="margin-bottom:20px;">Post comment</button>

                                 </div>
                                 </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- Modal -->
					</div>
				</div>
			</div>
		</div>
		<!-- /Boxes de Acoes -->
	</div>
  <div class="row" v-if="type==2">
  <form role="form"  @submit.prevent= "Review">
    <div>
<fieldset>
 <input class="form-control input-lg" v-validate="{ rules: { required: true} }" id="myInput" placeholder="Write a review"  v-model="review" type="text"required="*">
     </fieldset>

            <!-- <input style="height:50px;font-size:10pt"class="form-control input-lg" id="myInput" placeholder="Write a review" type="text"v-model="review" required="*"><br /><br /><br /> -->
            <div id="makan1" style="width:50%">
              <star-rating @rating-selected="rating = $event" :rating="rating" v-bind:show-rating="false" ></star-rating>
            </div>
<div id="makan2" style="width:80%">

  <button class="btn btn-primary btn-sm">Add Review</button>
  </div>
     </div>
        </form>
  </div>
</div></p>
			</section>
		</div>
     <div>


  </div>



  </div>
 </template>



 <script>

 import Vue from 'vue'
 import VueYouTubeEmbed from 'vue-youtube-embed'
 import StarRating from 'vue-star-rating'
 Vue.component('star-rating', StarRating);



 Vue.use(VueYouTubeEmbed);
 export default {
  name: 'StudentProfile',
   // components: {
   //  ServiceProvider
   // }
   data () {
     return {
       stripe_token: {},
       stripe_instance: {},
       service:{},
      user:{},
      offers:{},
      videos:{},
      videoId :'',
      review:'',
      rating:0,
      reviews:[],
      comment:'',
      pastComments:[],
      reviewid:'',
      reloadCounter:0,
      images:[],

type:''
     }
   },
 created(){
     if(this.$route.params.id!= null)
     this.getServiceProvider(this.$route.params.id)

     this.$http.post('http://54.77.11.251:3000/api/users/decode',{"token": localStorage.getItem('id_token')}).then(decode => {
       ////console.log(this.decodeid)
       this.type = decode.body.type;

   })

 },
  watch: {
   '$route' (to ,from){
       if(to!=null)
       this.getServiceProvider(this.$route.params.id);

    }},
 methods:{

   purchaseStuff: function(inoffer){
    if(localStorage.getItem('id_token')!=null){

       var price = inoffer.price*100;
       this.stripe_instance = StripeCheckout.configure({
           key: 'pk_test_930VGCISk9ZC24NhBPmMy3C8',    //put your own publishable key here
           image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
           locale: 'auto',
           token: function(token) {
             //console.log('got a token. sending data to 54.77.11.251');
             this.stripe_token= token;
             //console.log(this.stripe_token);
             this.order_status= "PENDING";
             Vue.http.post('http://54.77.11.251:3000/api/charge', {token_id: this.stripe_token.id, price: price})
               .then((payresponse) => {
                   Vue.http.post('http://54.77.11.251:3000/api/students/offers',{"offer_id":inoffer._id, "charge_id": payresponse.body.response.id },{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
                         swal("Success","You succesfully applied",'success')
                     }).catch(function(reason) {swal("Oops..",reason.body.message,'error')});
               },(response) => {
                 this.order_status= "FAILED";
               });
           },
       });
         this.stripe_instance.open({
           name: inoffer.title,
           description: 'stuff and stuff',
           amount: price
         })

    }else{swal("Oops...","You have to be signed in to apply",'error')}

       },

    getServiceProvider: function (param) {
        if(param!=null){
        //console.log(param)
      let route ='http://54.77.11.251:3000/api/students/sP/'.concat(param);

       this.$http.get(route, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
      //   //console.log(this.$route.params.id);

         this.service=response.data.data.providerProfile;
         this.user =response.data.data.user;


       })}
     },



     Offers: function(){
       this.$http.post("http://54.77.11.251:3000/api/students/serviceproviders/offers", {"id":this.user._id}).then(response => {

         this.offers=response.body.data.Offers;
				 console.log(response);
       });

     },

     Apply: function(offer){
       this.$http.post('http://54.77.11.251:3000/api/students/offers',{"offer_id":offer._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}})
     },


     Video: function(){
       this.$http.post("http://54.77.11.251:3000/api/sPs/videos", {"id":this.user._id}).then(response => {

        this.videos=response.body.data.video;
       });

     },
     Review: function(){
       this.$http.post('http://54.77.11.251:3000/api/students/serviceproviders/add',{"sp_id":this.user._id, "content":this.review,"rating":this.rating},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        swal("Success","Review Added",'success');
         this.getReviews()
       })

     },  getReviews: function () {
         this.$http.post('http://54.77.11.251:3000/api/students/reviews/view',{"sp_id":this.user._id}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
//console.log(response.data.data.reviews)
           this.reviews=response.data.data.reviews
         })
       },
       getImages: function(){
            let route ='http://54.77.11.251:3000/api/sPs/images/'.concat(this.user._id);
            this.$http.get(route).then(response => {
                this.images = response.body.data.images
          })
        },
       viewComments: function (review_id) {
         this.$http.post('http://54.77.11.251:3000/api/users/comments/view',{"review_id":review_id}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
           this.reviewid=review_id;
           //console.log(this.reviewid);
         this.pastComments =response.data.data.comments
         })
       },
       addComment: function(){
         this.$http.post('http://54.77.11.251:3000/api/users/comments/create', {"content":this.comment,"review_id":this.reviewid}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
          swal("Success","Comment Added",'success');
               //console.log('success');
              this.viewComments(this.reviewid);
              this.comment =''
                       });
       }

   }

 }
 </script>
