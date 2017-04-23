<template>
<center>
<br/>

  <form role="form" class="" @submit.prevent>
          <h2>Edit Your Profile </h2>
          <img v-if="this.user.profileimg" :src="'http://localhost:3000/'+user.profileimg.path.replace('public','')" style="width:200px">
          <input ref="avatar2" type="file" name="avatar2" id="avatar2" v-on:change="changedp($event.target.name, $event.target.files)">

        <br/>
        <br/>
        <div>Price Category: {{ pricecategory }}</div>
        <br>
        <input type="radio" id="one" value="Cheap" v-model="pricecategory">
        <span for="pricecategory">$</span>&nbsp; &nbsp;
        <input type="radio" id="two" value="Moderate" v-model="pricecategory">
        <span for="pricecategory">$$</span>&nbsp; &nbsp;
        <input type="radio" id="three" value="Expensive" v-model="pricecategory">
        <span for="pricecategory">$$$</span>


        <div class="form-group">
        <br>
            <label class="col-sm-2 control-label">Location</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="location" :value="profile.location" v-model="location" />
            </div>
        </div>

        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
                <input type="text" v-model="description" :value="profile.description" ></input>
            </div>
        </div>

         <div>
        <label for="fields" class="col-sm-2 control-label">Fields</label>
        <li v-for =" field in interests">
        <input type="checkbox" id="field.name" :value="field.name" v-model="fields">
        <span for=field.name>{{field.name}}</span>
        </li>
        <span>Fields: {{ fields }}</span>
        <br>
        </div>

        <div class="form-group">
        <br>
            <label class="col-sm-2 control-label">Phone Number</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="phone" :value="profile.phone_number" v-model="phone_number" />
            </div>
        </div>

      <button class="col-md-5 btn btn-primary btn-sm " href="#SPEditPassword" data-toggle="modal">Edit Password</button>




    <h1>Your Images</h1>
    <span v-for ="image in images">
       <img :src="'http://localhost:3000/'+image.img.path.replace('public','')" style="width:200px">&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <input ref="avatar" type="file" name="avatar" id="avatar" v-on:change="upload($event.target.name, $event.target.files)">
    <h1>Your Videos</h1>
    <youtube :video-id="this.attrs"></youtube>

    <li v-for =" video in videos">
       <a v-on:click="changeVideo(video.url)"> {{video.title}} </a>
    </li>
    <form>
        <input type="text" v-model="title" name="title" placeholder="title">
        <input type="text" v-model="url" name="url" placeholder="url">
        <button class="btn btn-primary btn-sm"  v-on:click="newvideo"> Post video</button>
    </form>

        <div class="row">
            
           
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm"  v-on:click="edit">Submit Changes</button>
            </div>
        </div>

    </form>


  <div class="modal fade" id="SPEditPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header modal-header-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>

            <div class="modal-body">
                <div class="row">                          
                Enter Old Password:<input required style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput1" placeholder="Old Password" type="password"v-model="oldPassword"></input><br/>
                Enter New Password:<input required style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput2" placeholder="New comment" type="password"v-model="newPassword"></input><br/>
                Confirm New Password:<input required style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput3" placeholder="Confirm New comment" type="password"v-model="confirmNewPassword"></input>
                </div>                
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary add_field_button" style="margin-bottom:20px;" v-on:click="editPassword()">Update Password</button>
            </div>
          </div>
        </div>
    </div>
 
    

    </center>
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
      oldPassword:'',
      newPassword:'',
      confirmNewPassword:'',
      successmessages:[{msg:''}],
      failuremessages:[{msg:''}]

    }
  },
created(){
  this.getProfile(),
  this.getInterests()
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
        console.log(this.user)
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
          var x = confirm("Are you sure you want to edit these attributes")
          if(x){
            this.$http.post('http://localhost:3000/api/sPs/profile/edit', {"price_category":this.pricecategory,"location":this.location, "description":this.description, "fields":this.fields, "description":this.description, "phone_number":this.phone_number},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
            alert("Profile Edited")
            this.$router.push({path:'/SPViewMyProfile'})
                    })
          }
        },
    editPassword: function()
    {
        var x = confirm("Are you sure you want to edit your password")
          if(x)
          {
            this.$http.post('http://localhost:3000/api/sPs/sP/editpassword', {"oldPassword":this.oldPassword,"newPassword":this.newPassword, "confirmNewPassword":this.confirmNewPassword},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            alert("Updated Password")
            this.$router.push({path:'/SPViewMyProfile'})
                    }).catch(function(reason) {
                        console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                console.log(this.failuremessages)
                this.successmessages=[{msg:''}];
                    });
          }
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
