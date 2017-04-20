<template>
<center>
  <form role="form" class="">
          <h2>Edit Your Profile </h2>
        <!-- <div class="form-group">
            <label class="col-sm-2 control-label">Price Ctaegory</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="pricecategory" :value=profile.price_category v-model="pricecategory" />
            </div>
        </div> -->

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
                <input type="text" class="form-control" id="location" :value=profile.location v-model="location" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
                <textarea v-model="description" :value=profile.description></textarea>
            </div>
        </div>

         <div>
        <label for="fields" class="col-sm-2 control-label">Fields</label>
        <li v-for =" field in interests">
        <input type="checkbox" id=field.name :value=field.name v-model="fields">
        <span for=field.name>{{field.name}}</span>
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

        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm"  v-on:click="edit">Submit Changes</button>
            </div>
        </div>
        
    </form>

    <h1>Your Images</h1>
    <li v-for ="image in images"> 
       <img :src="'http://localhost:3000/'+image.img.path.replace('public','')" style="width:200px">
    </li>
    <input ref="avatar" type="file" name="avatar" id="avatar" v-on:change="upload($event.target.name, $event.target.files)">
    <h1>Your Videos</h1>
    <iframe width="420" height="315" :src="attrs">
    </iframe>
    <li v-for =" video in videos"> 
       <a v-on:click="changeVideo(video.url)"> {{video.title}} </a>
    </li>
    <form>
        <input type="text" v-model="title" name="title" placeholder="title">
        <input type="text" v-model="url" name="url" placeholder="url">
        <button  v-on:click="newvideo" value="Submit">Submit</button>
    </form>



    </center>
</template>
<script>
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
    newvideo: function(){
        this.$http.post('http://localhost:3000/api/sPs/videos/upload', {"title":this.title,"url":this.url},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
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
    getVideos: function(){
        let route ='http://localhost:3000/api/sPs/videos/'.concat(this.user._id);
        this.$http.get(route,{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
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