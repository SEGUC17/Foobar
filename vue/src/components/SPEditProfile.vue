<template>
<center>
  <form role="form" class="">
        <div class="form-group">
            <h2>Edit Your Profile </h2>
            <label class="col-sm-2 control-label">Price Ctaegory</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="pricecategory" :placeholder=profile.price_category v-model="pricecategory" />
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Location</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="location" :placeholder=profile.location v-model="location" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
                <textarea v-model="description" :placeholder=profile.description></textarea>
            </div>
        </div>

         <div>
        <label for="fields" class="col-sm-2 control-label">Fields</label>
        <li v-for =" field in interests"> 
        <input type="checkbox" id=field.name :value=field.name v-model="fields">
        <label for=field.name>{{field.name}}</label>
        </li>
        <br>
        <span>Fields: {{ fields }}</span>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Phone Number</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="phone" :placeholder=profile.phone_number v-model="phone_number" />
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
      interests:[]
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
        this.user=response.data.data.user
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
        }

  }

}
</script>
