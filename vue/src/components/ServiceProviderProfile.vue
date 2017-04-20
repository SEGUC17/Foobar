<template>
   <div>
     <div>
<div class="container">
      <div class="row">
      <div class="col-md-5  toppad  pull-right col-md-offset-3 ">
             <br>
   <button @click="ReviewTrue()">Reviews</button>
   <button @click="ImageTrue()">Images</button>
   <button @click="VideosTrue()">Videos</button>
   <button @click="OffersTrue()">Offers</button>
      </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title">{{user.name}}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" class="img-circle img-responsive"> </div>


                <div class=" col-md-9 col-lg-9 ">
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>University: </td>
                        <td>{{service}}</td>
                      </tr>

                      <tr>
                        <td>Date of Birth</td>
                        <td>{{service._id}}</td>
                      </tr>

                         <tr>
                             <tr>
                        <td>Description</td>
                        <td>{{service.description}}</td>
                      </tr>
                        <tr>
                        <td>Home Address</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{{user.email}}</td>
                      </tr>
                        <td>Phone Number</td>
                        <td>123-4567-890(Landline)<br><br>555-4567-890(Mobile)
                        </td>

                      </tr>

                    </tbody>
                  </table>

                </div>
              </div>
            </div>
                <div  class="carousel slide" data-ride="carousel" v-if="images">
              <ul class="carousel-indicators">
            <li> <img src="~assets/img/slide-1.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-2.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-3.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-4.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-5.jpg" alt="" > </li>
          </ul>
            </div>


          </div>
        </div>
      </div>
    </div>


  </div>



  </div>
 </template>
 <script>

 export default {
  name: 'StudentProfile',
   // components: {
   //  ServiceProvider
   // }
   data () {
     return {
       service:{},
      user:{},
      review:false,
      images:false,
      videos:false,
      offers:false,
     }
   },
 created(){
   this.getServiceProvider()
 },
 methods:{
    getServiceProvider: function () {
      let route ='http://localhost:3000/api/students/sP/'.concat(this.$route.params.id);

       this.$http.get(route, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
         console.log(this.$route.params.id);

         this.service=response.data.data.providerProfile;
         this.user =response.data.data.user;
         console.log(this.user);

       })
     },
     OffersTrue: function() {
       if(this.offers){
        this.offers=false;
      }else{
        this.offers=true;
      }
     }
     ,
     ReviewTrue: function() {
       if(this.review){
        this.review=false;
      }else{
        this.review=true;
      }
     }
     ,
     ImageTrue: function() {
      if(this.images){
        this.images=false;
      }else{
        this.images=true;
      }
     }
     ,
     VideosTrue: function() {
       if(this.videos){
        this.videos=false;
      }else{
        this.videos=true;
      }
     }

   }

 }
 </script>
