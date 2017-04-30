<template>

<center>
  <form role="form" class="" @submit.prevent>
          <h2>Edit Your Profile </h2>
            <!--<img v-if="this.user.profileimg.path" :src="'http://localhost:3000/'+this.user.profileimg.path.replace('public','')" alt="">
            <img v-if="!this.user.profileimg.path" src="~assets/img/missing.png" alt="">-->
          <input ref="avatar2" type="file" name="avatar2" id="avatar2" v-on:change="changedp($event.target.name, $event.target.files)">


        <span>Price Category: {{ pricecategory }}</span>
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
                     <gmap-autocomplete @place_changed="mapinit" class="form-control" v-model="location">
      </gmap-autocomplete>
                <!--<input type="text" class="form-control Autocomplete" id="location" :value="this.profile.location"  />-->
            </div>
        </div>

        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
                <input type="text" v-model="description" class="form-control" :value="profile.description" ></input>
            </div>
        </div>

         <div>
        <label for="fields" class="col-sm-2 control-label">Fields</label>
        <li v-for =" field in interests">
        <input type="checkbox" id="field.name" :value="field.name" v-model="fields">
        <span >{{field.name}}</span>
        </li>
        <span>Fields: {{ fields }}</span>
        <br>
        </div>

        <div class="form-group">
        <br>
            <label class="col-sm-2 control-label">Phone Number</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="phone" :value=profile.phone_number v-model="phone_number" />
            </div>
        </div>



    <h1>Your Images</h1>
    <li v-for ="image in images">
       <img :src="'http://localhost:3000/'+image.img.path.replace('public','')" style="width:200px">
    </li>
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
                <button class="btn btn-primary btn-sm " href="#SPEditPassword" data-toggle="modal">Edit Password</button>
            </div>
        </div>

    </form>
 
              <form role="form" class="" v-on:submit.prevent="editPassword()">
             <div class="modal fade" id="SPEditPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
           <br><br>
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header modal-header-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
            <center>

                <div class="row">                          
                Enter Old Password:<input require="required"type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput1" placeholder="Old Password" v-model="oldPassword" required="*"></input><br/>
                Enter New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput2" placeholder="New Password" v-model="newPassword" required="*"></input><br/>
                Confirm New Password:<input type="password" style="height:30px;font-size:10pt"class="form-control input-lg" id="myInput3" placeholder="Confirm New Password" v-model="confirmNewPassword" required="*"></input>
                </div>     
                </center>      
                   <div class="modal-footer">
                <button class="btn btn-primary add_field_button" style="margin-bottom:20px;" >Update Password</button>
                </div>  </div>  
                 </div>
          </div>
        </div>
         </div>
    </div>  

    </div> 
                </form>
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
    edit: function ()
        {
          var x = confirm("Are you sure you want to edit these attributes")
          if(x){
            this.$http.post('http://localhost:3000/api/sPs/profile/edit', {"price_category":this.pricecategory,"location":this.location, "description":this.description, "fields":this.fields, "description":this.description, "phone_number":this.phone_number,"lat": this.lat,"lang":this.lang},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log(this.location);
            alert("Profile Edited")
            this.$router.push({path:'/SPViewMyProfile'})
                    })
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
    },
    mapinit: function(place) {
            this.lat = place.geometry.location.lat();
            this.lang = place.geometry.location.lng();
            console.log(this.lat + "   "+this.lang)
    },
    editPassword: function()
    {
        var x = confirm("Are you sure you want to edit your password")
          if(x)
          {
            console.log(this.user);
            this.$http.post('http://localhost:3000/api/sPs/sP/editpassword', {"oldPassword":this.oldPassword,"newPassword":this.newPassword, "confirmNewPassword":this.confirmNewPassword,"id":this.user._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            alert("Updated Password")
                confirmNewPassword=""
      oldPassword=""
      newPassword=""
      $('#SPEditPassword').modal('hide');
            this.$router.push({path:'/SPViewMyProfile',force:true});
                    }).catch(function(reason) {
                    });
          }
    }
  }
}
</script>