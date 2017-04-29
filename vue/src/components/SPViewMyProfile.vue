<style scoped>
body {
    font-family: Helvetica Neue, Arial, sans-serif;
}
polygon {
    fill: #42b983;
    opacity: .75;
}
circle {
    fill: transparent;
    stroke: #999;
}
text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
}
label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}
#raw {
    position: absolute;
    top: 0;
    left: 300px;
}
</style>

<template>

  <div>
<div class="container">
      <div class="row">
     <br/>
     <br/>
    <div align="center">
          <img class="img-circle img-responsive" v-if="this.user && this.user.profileimg.path" :src="'http://localhost:3000/'+user.profileimg.path.replace('public','')" style="height:200px; width:200px">
    </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


          <div class="panel panel-info">
            <div class="panel-heading">
            </div>
            <div class="panel-body">
              <div class="row">

<br />
                <h3 class="panel-title">Basic Info </h3>

                <div class=" col-md-9 col-lg-9 ">
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td>{{user.name}}</td>
                      </tr>
                      <tr>
                        <td>Email </td>
                        <td>{{user.email}}</td>
                      </tr>

                      <tr>
                        <td>Price Category</td>
                        <td> {{ pricecategory }}</td>
                      </tr>

                    <tr>
                        <tr>
                            <td>Location</td>
                            <td>{{profile.location}}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{{profile.description}}</td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>{{profile.phone_number}}</td>
                        </tr>
                        <tr>
                            <td>Fields</td>
                            <td>{{ fields }}</td>
                        </tr>
                      </tr>

                    </tbody>
                  </table>

                <h4>Your Images</h4>
                <span class="col-lg-3"v-for ="image in images">
                <img :src="'http://localhost:3000/'+image.img.path.replace('public','')" style="height:200px; width:200px">&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                
                <h4 >Your Videos</h4>
                <youtube :video-id="this.attrs"></youtube>

                <div v-for =" video in videos">
                <a v-on:click="changeVideo(video.url)"> {{video.title}} </a>
                </div>

                <div id="map"></div>
 

                </div>
              </div>
            </div>
                 <!--  -->

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
 Vue.use(VueYouTubeEmbed);
export default {
  name: 'SPReviews',
  data () {
    return {
      profile:'',
      user:'',
      pricecategory:'',
      location:'',
      description:'',
      fields:[],
      phone_number:'',
      interests:[],
      url:'',
      title:'',
      videos: [],
      attrs:'',
      images:[],
      videoId :'',
      lat:'',
      lang:''
    }
  },
created(){
  this.getProfile(),
  this.getInterests(),
  this.mapinit()
},
methods:{
    getProfile: function () {
      this.$http.get('http://localhost:3000/api/sPs/profile/view',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.profile=response.data.data.providerProfile
        this.location = response.data.data.providerProfile.location;
        this.pricecategory = response.data.data.providerProfile.price_category;
        this.description = response.data.data.providerProfile.description;
        this.fields = response.data.data.providerProfile.fields;
        this.phone_number = response.data.data.providerProfile.phone_number;
        this.lat = response.data.data.providerProfile.lat;
        this.lat = response.data.data.providerProfile.lang;
        this.getVideos();
        this.getImages();
      })
    },
    getInterests: function () {
      this.$http.get('http://localhost:3000/api/sPs/interests',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.interests=response.data.data.interests
      })
    },
    edit: function ()
        {
            this.$http.post('http://localhost:3000/api/sPs/profile/edit', {"price_category":this.pricecategory,"location":this.location, "description":this.description, "fields":this.fields, "description":this.description, "phone_number":this.phone_number},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    })
        },
    newvideo : function(){
        this.$http.post('http://localhost:3000/api/sPs/videos/upload', {"title":this.title,"videoURL":this.url},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
          console.log(data)
        })
    },
    upload: function(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        formData.append("user_id",this.user._id)
        this.$http.post('http://localhost:3000/api/sPs/upload',formData, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            this.getImages();
      })
    },
    changedp: function(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        formData.append("user_id",this.user._id)
        this.$http.post('http://localhost:3000/api/sPs/changedp',formData, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            console.log('changed dp');
      })
    },
    mapinit: function(){
      var myLatLng = {lat: this.user.lat, lng: this.user.lang};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    },
    getVideos: function(){
        let route ='http://localhost:3000/api/sPs/videos/';
        this.$http.post(route,{"id":this.user._id}).then(response => {
            this.videos = response.body.data.video
      })
    },
    getImages: function(){
        let route ='http://localhost:3000/api/sPs/images/'.concat(this.user._id);
        this.$http.get(route,{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            this.images = response.body.data.images
      })
    },
    changeVideo: function(url){
        this.attrs = url
    }
  }
}
</script>