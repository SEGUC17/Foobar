<template>

  <div align="center">

            <div align="left" class="col-lg-offset-4">
            <img v-if="this.user.profileimg && this.user.profileimg.path" :src="'http://localhost:3000/'+this.user.profileimg.path.replace('public','')" class="img-circle profile_img" style="height:200px; width:200px">
            <img v-else src="~assets/img/missing.png" class="img-circle profile_img" style="height:200px; width:200px">
            </div>
              <br/>
              <br/>
              <br/>
                <h1>Basic Info </h1>

                  <table class="">
                    <tbody>
                      <tr>
                        <td>Name </td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{{user.name}}</td>
                      </tr>
                      <br/>
                      <tr>
                        <td>Email </td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{{user.email}}</td>
                      </tr>
                      <br/>

                      <tr>
                        <td>Price Category</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td> {{ pricecategory }}</td>
                      </tr>
                      <br/>

                    <tr>
                        <tr>
                            <td>Location</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{{profile.location}}</td>
                        </tr>
                                              <br/>

                        <tr>
                            <td>Description</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{{profile.description}}</td>
                        </tr>
                                              <br/>

                        <tr>
                            <td>Phone number</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{{profile.phone_number}}</td>
                        </tr>
                                              <br/>

                        <tr>
                            <td>Fields</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{{ fields }}</td>
                        </tr>
                      </tr>

                    </tbody>
                  </table>
                  <br/>
                  <br/>

                <h1>Your Images</h1>
<span>              <carousel >
                  <slide v-for="slide in images" >

                      <img :src="'http://localhost:3000/'+slide.img.path.replace('public','')" style="width:300px"></img>


                  </slide>
                </carousel>
              </span>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
<br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <h3 align="center">Your Videos</h3>
                <youtube v-if="videos.length>0" :video-id="this.attrs"></youtube>

                <div v-for =" video in videos">
                <a v-on:click="changeVideo(video.url)"> {{video.title}} </a>
                </div>

<br><br><br>

<h3 align="center">Your Location</h3>
  <gmap-map
    :center="center"
    :zoom="15"
    style="width: 500px; height: 300px"
  >
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>

  </div>
</template>


<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

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
      center: {},
      markers: [{}],
    }
  },
created(){
  this.getInterests()
  this.getProfile()
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
        this.user=response.data.data.user["0"];

        var pf = response.data.data.providerProfile

        //console.log(this.user)
        //console.log(pf)
        this.center = {lat: parseFloat(pf.lat), lng: parseFloat(pf.lang)}
        this.markers = [{position: {lat: parseFloat(pf.lat), lng: parseFloat(pf.lang)}}]
        Vue.$gmapDefaultResizeBus.$emit('resize')

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
            //console.log('success');
                    })
        },
    newvideo : function(){
        this.$http.post('http://localhost:3000/api/sPs/videos/upload', {"title":this.title,"videoURL":this.url},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
          //console.log(data)
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
            //console.log('changed dp');
      })
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
