<template>

  <div>


            <img v-if="this.user.profileimg && this.user.profileimg.path" :src="'http://localhost:3000/'+this.user.profileimg.path.replace('public','')" class="img-circle profile_img" style="height:100px; width:100px">
            <img v-if="this.user.profileimg && !this.user.profileimg.path" src="~assets/img/missing.png" class="img-circle profile_img" style="height:100px; width:100px">


                <h3 class="">Basic Info </h3>

                  <table class="">
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

        console.log(this.user)
        console.log(pf)
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
