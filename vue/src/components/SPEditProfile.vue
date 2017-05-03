<style scoped>
.carousel-3d-container figure {
  margin:0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
<template>

<center>

<!--TEST SHIT-->

<div class="container">
<div class="row">
<div class="col-md-10 ">
<form class="form-horizontal">
<fieldset>

<!-- Form Name -->
<legend>User Profile</legend>

<!-- Text input-->


<div class="form-group">
  <label class="col-md-4 control-label" for="Name (Full name)">Name (Full name)</label>
  <div class="col-md-4">
 <div class="input-group">
       <div class="input-group-addon">
        <i class="fa fa-user">
        </i>
       </div>
       <input id="Name (Full name)" name="Name (Full name)" type="text" :value="user.name" placeholder="Name (Full name)" class="form-control input-md">
      </div>


  </div>


</div>

<!-- File Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="Upload photo">Upload photo</label>
  <div class="col-md-4">
    <input ref="avatar2" type="file" name="avatar2" id="avatar2" v-on:change="changedp($event.target.name, $event.target.files)">
  </div>
</div>



<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="Available Service Area">Location</label>
  <div class="col-md-4">
  <div class="input-group">
       <div class="input-group-addon">
     <i class="fa fa-street-view"></i>

       </div>
                <gmap-autocomplete @place_changed="mapinit" class="form-control input-md" :value="profile.location">
      </gmap-autocomplete>

      </div>

  </div>
</div>


<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="Phone number ">Phone number </label>
  <div class="col-md-4">
  <div class="input-group">
       <div class="input-group-addon">
     <i class="fa fa-phone"></i>

       </div>
    <input type="number" class="form-control input-md" id="phone" placeholder="Primary Phone number " :value="profile.phone_number" v-model="phone_number" />
      </div>

  </div>
</div>



    <div class="form-group">
        <label class="col-md-4 control-label" for="Gender">Price Category</label>
    <div class="col-md-4">
    <label class="radio-inline" for="cheap-0">
      <input type="radio" name="cheap-0" id="one" value="Cheap" v-model="pricecategory">
        $
    </label>
    <label class="radio-inline" for="cheap-1">
      <input type="radio" name="cheap-1" id="two" value="Moderate" v-model="pricecategory">
        $$
    </label>
    <label class="radio-inline" for="cheap-1">
      <input type="radio" name="cheap-1" id="three" value="Expensive" v-model="pricecategory">
        $$$
    </label>
        </div>
         {{ pricecategory }}
    </div>




<!-- Multiple Checkboxes -->
<div class="form-group">
  <label class="col-md-4 control-label" for="Fields">Fields</label>
  <div class="col-md-4">
        <li v-for =" field in interests">
        <input type="checkbox" id="field.name" :value="field.name" v-model="fields">
        <span >{{field.name}}</span>
        </li>

  </div>
</div>


<div class="form-group">
  <label class="col-md-4 control-label" for="Overview (max 200 words)">Overview (max 200 words)</label>
  <div class="col-md-4">
      <textarea  v-model="description" class="form-control" :value="profile.description"></textarea>
  </div>
</div>


    <h1>Your Images</h1>
    <span>
    <carousel >
      <slide v-for="slide in slides" >

          <img :src="'http://localhost:3000/'+slide.img.path.replace('public','')" style="width:300px"></img>


      </slide>
    </carousel>
</span>


    <br/>
    <br/>
    <input ref="avatar" type="file" name="avatar" id="avatar" v-on:change="upload($event.target.name, $event.target.files)">
    <br/>
    <br/>
    <div align="center">
      <span><a class="btn btn-danger" style="margin-top:20px;"  data-toggle="modal" data-target="#SPEditPassword">Edit Password</a></span>
    </div>

    <div>
      <span><a href="#" class="btn btn-success" @click.prevent="edit"><span class="glyphicon glyphicon-thumbs-up"></span> Submit</a></span>
    </div>

<br/>
<br/>
    <h1>Your Videos</h1>
    <div align="center"class="row">
    <youtube v-if="videos.length>0" :video-id="this.attrs"></youtube>

    <li v-for =" video in videos" >
       <a v-on:click="changeVideo(video.url)"> {{video.title}} </a>
    </li>
    <br/>
    <br/>
    <div class="row"align="center">
    <form>
        <input style="width:400px"align="center"type="text" class="form-control" v-model="title" name="title" placeholder="title"><br/>
        <input style="width:400px"type="text" class="form-control" v-model="url" name="url" placeholder="url">
        <br/>
        <button class="btn btn-primary btn-sm"  v-on:click="newvideo"> Post video</button>
    </form>
    </div>
    </div>
    <br/>
    <br/>
<div class="form-group">

  <label class="col-md-4 control-label" ></label>

</div>



</fieldset>
</form>


</div>
<div class="col-md-2 hidden-xs">
            <img v-if="this.user.profileimg && this.user.profileimg.path" :src="'http://localhost:3000/'+this.user.profileimg.path.replace('public','')" class="img-circle profile_img" style="height:100px; width:100px">
            <img v-if="this.user.profileimg && !this.user.profileimg.path" src="~assets/img/missing.png" class="img-circle profile_img" style="height:100px; width:100px">
  </div>


</div>
</div>
    <!--TEST SHIT-->

<div class="modal fade" id="SPEditPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header modal-header-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
            <center>
                <form role="form" class="" @submit.prevent="editPassword()">
                    <div class="row">
                Enter Old Password:<input require="required"type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput1" placeholder="Old Password" v-model="oldPassword" required="*"></input><br/>
                Enter New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput2" placeholder="New Password" v-model="newPassword" required="*"></input><br/>
                Confirm New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput3" placeholder="Confirm New Password" v-model="confirmNewPassword" required="*"></input>
                    </div>

                   <div class="modal-footer">
                     <center>
                <button class="btn btn-primary add_field_button" type="submit"  style="margin-bottom:20px;">Update Password</button>   </center>
                </div>         </form> </center></div>
                 </div>
          </div>
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
      phone_number:'',
      interests:[],
      url:'',
      title:'',
      videos: [],
      attrs:'',
      images:[],
      videoId :'',
      confirmNewPassword:"",
      oldPassword:"",
      newPassword:"",
      fields:'',
      lat:'',
      lang:'',
      slides:'',
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
        this.getVideos();
        this.getImages();
        // this.mapinit();
      })
    },
    getInterests: function () {
      this.$http.get('http://localhost:3000/api/sPs/interests',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.interests=response.data.data.interests
      })
    },
    edit: function ()  {

            this.$http.post('http://localhost:3000/api/sPs/profile/edit', {"price_category":this.pricecategory,"location":this.location, "description":this.description, "fields":this.fields, "description":this.description, "phone_number":this.phone_number,"lat": this.lat,"lang":this.lang},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            ////console.log(this.location);
            swal("Success","Profile Edited",'success')
            this.$router.push({path:'/SPViewMyProfile'})
                    })
          }
        ,
    newvideo : function(){
        this.$http.post('http://localhost:3000/api/sPs/videos/upload', {"title":this.title,"videoURL":this.url},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
          ////console.log(data)
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
            ////console.log('changed dp');
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
            this.slides = response.body.data.images
      })
    },
    changeVideo: function(url){
        this.attrs = url
    },
    mapinit: function(place) {
            this.location = place.name
            this.lat = place.geometry.location.lat();
            this.lang = place.geometry.location.lng();
    },
    editPassword: function()
    {

            ////console.log(this.user);
            this.$http.post('http://localhost:3000/api/sPs/sP/editpassword', {"oldPassword":this.oldPassword,"newPassword":this.newPassword, "confirmNewPassword":this.confirmNewPassword,"id":this.user._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
              this.confirmNewPassword=""
      this.oldPassword=""
    this.newPassword=""
      $('#SPEditPassword').modal('hide');

            swal("Success","Updated Password",'success')


                    }).catch(function(reason) {

                      if(reason!==null&&reason!=undefined){
                      if(reason.body){
                      for(var i=0;i<reason.data.err.length;i++)
                    swal("Oops..",reason.data.err[i].msg,'error')}}
                    });

    }
  }
}
</script>
