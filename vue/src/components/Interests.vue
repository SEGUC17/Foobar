<template>
<div>
  <h5>The most frequent interest among student is <strong>{{most}}</strong></h5>
  <h5>The least frequent interest among student is <strong>{{least}}</strong></h5>
<h4>Interests from the most recommended to the least one  </h4>
<div>
  <ul>
    <li v-for=" interest in interests"> {{interest.name}}</li>
  </ul>
  <form role="form" class="" @submit.prevent='addInterest'>
          <div v-for =" message in successmessages">
                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                  </div>
                <div v-for =" message in failuremessages">
        <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
      </div>
      <div class="form-group">
          <input v-validate="{ rules: { required: true} }" type="text" name="interestname" class="form-control efc" id="interestname" placeholder="Interest Name" v-model="interestname" required="*">
          <span v-show="errors.has('interestname ')">{{ errors.first('interestname') }}</span>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <input type="submit"  tabindex="4" class="form-control efc" value="Add">
          </div>
        </div>
      </div>

       <h5>{{msg}}</h5>
  </form>

</div>
<ul>
    <!-- <li v-for =" admin in admins"><input type="radio" name="list" value="volvo">{{admin.email}} <button class="btn btn-danger">Delete</button> </li> -->

  </ul>
  <bar></bar>
</div></template>

<script>
import Bar from '../examples/BarExample.js'

export default {
  name: 'interests',
components: { Bar },
  data () {
    return {
  interestname : "",
  msg : "",
  most : "",
  least :"",
  interests: [],
    successmessages:[{msg:''}],
    failuremessages:[{msg:''}]
    }
  },
created(){
this.reviewDataAnalysis();
this.getInterests();
},
methods:{
    addInterest: function () {

      this.$http.post('http://52.210.115.35:3000/api/admins/addInterest',{name: this.interestname },{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
      swal(
  'Success!',
  this.interestname +" has been added!",
  'success'
);
console.log(response);
          }).catch(function(reason) {
                this.failuremessages = reason.body.err;
                this.successmessages=[{msg:''}];
        });
      },
      getInterests: function () {

      this.$http.get('http://52.210.115.35:3000/api/students/all/interests',{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {

        this.interests = response.body.data.interests
            }).catch(function(reason) {
                console.log(reason)
          });
        },
        reviewDataAnalysis: function () {
          this.$http.get('http://52.210.115.35:3000/api/admins/reviewinterest',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            this.most= response.body.data.most,
            this.least = response.body.data.least
          })
        }
  }
}
</script>
