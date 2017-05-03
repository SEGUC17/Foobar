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
  <div>

        <div class="page-title">
              <div class="title_left">
                <h3>All offers</h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="srch"  placeholder="Search for offers">
                    <span class="input-group-btn">
                      <button class="btn btn-default" v-on:click="search">Go!</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

  <section id="content2" class="tab-content">
        <p>            <div class="container" id="features">

<div class="row">
          <div v-for =" offer in offersInPage" >


            		<a href="" @click.prevent="purchaseStuff(offer)"><div class="col-md-4 feature">
                	   <center><img class="img-circle img-responsive" v-if="offer.sp_id && offer.sp_id.profileimg.path" :src="'http://54.77.11.251:3000/'+offer.sp_id.profileimg.path.replace('public','')" style="height:150px; width:150px">
                    <i class="glyphicon glyphicon-check" style="height:150px; width:150px" v-else></i></center>
                        <h3>{{offer.title}}</h3>
                        <h3>{{offer.sp_id.name}}</h3>
                        <div class="title_border"></div>
                        <p><h5 class="title"><p>{{offer.description}}
						</p>
            <p class="info">${{offer.price}}<br /> <br/>Due Date: {{offer.due_date.substring(0, 10)}}<br />Start Date: {{offer.start_date.substring(0, 10)}}<br /> End Date: {{offer.end_date.substring(0, 10)}}
          </p></h5</p>
   </div></a>

</div></div>
  </div>
</p>
</section>

<center>
      <ul class="pagination">
        <li v-for="n in numberOfPages"><a @click="changePage(n)">{{n}}</a></li>
      </ul>
      </center>


</div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'offers',
  data () {
    return {
      stripe_token: {},
      stripe_instance: {},
      offers:[],
      offersInPage:[],
      numberOfPages: 0,
      perPage: 6,
      counter:[],
      student:{},
      srch:''
    }
  },
created(){
  this.viewOffers()
},
methods:{
    search: function(){
      this.$http.post('http://54.77.11.251:3000/api/students/home',{"search":this.srch},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
        this.offers = response.body.data.offers
        this.reload()
      })
  },
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
                        }).catch(function(reason) {swal("Oops...",reason.body.message,'error')});
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
       }else{swal("Oops..","You have to be signed in to apply",'error')}
          },
  viewOffers: function () {
    this.$http.get('http://54.77.11.251:3000/api/students/viewalloffers',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
      // this.announcements=response.data.data.announcements
      this.offers= response.data.data.offers;
      this.student = response.data.data.student;
      this.numberOfPages=Math.ceil(this.offers.length/this.perPage);
      for(var i = 0 ; i<this.perPage && i<this.offers.length ; i++){
        this.offersInPage.push(this.offers[i]);
      }
    })
  },
    allOffers: function () {
    this.$http.get('http://54.77.11.251:3000/api/students/alloffers',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
      // // this.announcements=response.data.data.announcements
      // this.offers= response.data.data.offers;
      // this.student = response.data.data.student;
      // this.numberOfPages=Math.ceil(this.offers.length/this.perPage);
      // for(var i = 0 ; i<this.perPage && i<this.offers.length ; i++){
      //   this.offersInPage.push(this.offers[i]);
      // }
    })
  },
  changePage: function(number){
    var firstPost = (number*this.perPage)-this.perPage
    var lastPost = number * this.perPage
    this.offersInPage = []
    for(var i = firstPost ; i<lastPost && i<this.offers.length ; i++){
      this.offersInPage.push(this.offers[i]);
    }
  },
  reload: function(){
    this.offersInPage = []
    this.numberOfPages = 0
    if (this.offers.length >0){
      this.numberOfPages=Math.ceil(this.offers.length/this.perPage);
      for(var i = 0 ; i<this.perPage && i<this.offers.length ; i++){
        //console.log('ana hena')
        this.offersInPage.push(this.offers[i]);
      }
    } else{
      swal("Oops..",'no results','warning')
    }
  },

    Apply: function(offer , index){

      this.$http.post('http://54.77.11.251:3000/api/students/offers',{"offer_id":offer._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
        swal("Success","You succesfully applied",'success')
      })

  }
}
}
</script>
