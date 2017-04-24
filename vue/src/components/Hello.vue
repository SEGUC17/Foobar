<template>
<div class="hello">
<div class="bg-content">
  <div class="container">
    <div class="row">
          <div class="span12">
        <!-- slider -->

        <span id="responsiveFlag"></span>
        <div class="block-slogan">
              <h2>FOOBAR</h2>
              <div>
            <p>Foobar is a society where  students can find their interests and choose to upgrade and develop it as many service providers arrive here and post their offers.</p>
            <!-- <p style="text-align:center; padding-top:20px;"><a href="#" class="btn btn-1">Download Bootstrap</a></p> -->
          </div>
            </div>
      </div>
        </div>
  </div>

      <!-- content -->

<div id="content" class="content-extra"><div class="ic"></div>
    <div class="row-1">
        <div class="container">
    		<div class="row">
        <article class="span12">
        <h4>Our Service Providers</h4>
         </article>
        <div class="clear"></div>
         <ul class="portfolio clearfix">
           <li class="box"><a ><img alt="" src="~assets/img/work/1.jpg"></a></li>
           <li class="box"><a  ><img alt="" src="~assets/img/work/2.jpg"></a></li>
           <li class="box"><a  ><img alt="" src="~assets/img/work/3.jpg"></a></li>
           <li class="box"><a ><img alt="" src="~assets/img/work/4.jpg"></a></li>
           <li class="box"><a ><img alt="" src="~assets/img/work/5.jpg"></a></li>
           <li class="box"><a ><img alt="" src="~assets/img/work/6.jpg"></a></li>
           <li class="box"><a ><img alt="" src="~assets/img/work/7.jpg"></a></li>
           <li class="box"><a ><img alt="" src="~assets/img/work/8.jpg"></a></li>
         </ul>
      </div>
     	</div>
    </div>
    <div class="row-2">
        <div class="container">
        	<h3>Foobar is here for your help</h3>

            <p>Searching for new skills to learn? <i>we are here to get you offers that matches your interests</i></p>
            <!-- <a href="#" class="btn btn-1">Download</a> -->
      </div>
        </div>
    <div class="row-1">
        <div class="container">
        <div class="row">
        <article class="span12">
        <h4>Choose an interest?</h4>
         </article>

            </div>
      </div>
        </div>


  </div>
    </div>

      <h1>Test Item 2 Sell</h1>
      <img src="https://unsplash.it/300" />
      <p style="max-width:300px">Magna minim tempor eiusmod reprehenderit cillum adipisicing elit incididunt. Minim ex incididunt anim consequat nisi aute do mollit. Ipsum proident esse consectetur anim ullamco dolor id labore magna incididunt enim occaecat ut aute sit magna.</p>
      <p>${{price / 100}}</p>
      <button @click.prevent="purchaseStuff()">PURCHASE</button>
      <h3>Order Status {{order_status}}</h3>

                  <form class="form" method="POST" action="http://52.210.115.35:3000/api/testupload" enctype="multipart/form-data">
                    <div class="form-group">
                        <input type="file" name="profile_img" accept="image/*" id="img_upload2" required>
                    </div>
                    <center><button type="submit" class="btn btn-default">Submit</button></center>
                </form>

  </div>

</template>
<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>

<script>
import Vue from 'vue'

export default {
  name: 'hello',
  data(){
    return{
          stripe_token: {},
          price: 999,
          stripe_instance: {},
          order_status: 'READY'
      }
    },
  methods: {
    purchaseStuff: function(){
          var price = this.price
          this.stripe_instance = StripeCheckout.configure({
              key: 'pk_test_930VGCISk9ZC24NhBPmMy3C8',    //put your own publishable key here
              image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
              locale: 'auto',
              token: function(token) {
                console.log('got a token. sending data to localhost');
                this.stripe_token= token;
                console.log(this.stripe_token);
                this.order_status= "PENDING";
                Vue.http.post('http://52.210.115.35:3000/api/charge', {token_id: this.stripe_token.id, price: price})
                  .then((response) => {
                    console.log(response.body);
                    this.order_status= "SUCCESSFULLY COMPLETED";
                  },(response) => {
                    // error callback
                    console.log(response.body);
                    this.order_status= "FAILED";
                  });
              },
          });
            this.stripe_instance.open({
              name: 'INFINITE INDUSTRIES',
              description: 'stuff and stuff',
              amount: this.price
            })
            console.log('attempting to get a token');

          }
  },
}
</script>
