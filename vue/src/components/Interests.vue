<template>
<div>
  <h5>The most frequent interest among student is <h1 style="color:#52d3aa"><strong>{{most}}</strong></h1></h5>
  <h5>The least frequent interest among student is <h1 style="color:#52d3aa"><strong>{{least}}</strong></h1></h5>
<h4>Interests from the most recommended to the least one  </h4>
<div>
  <ul>
    <h3  style="color:#52d3aa" v-for=" interest in interests"> {{interest.name}}</h3>
  </ul>
  <form role="form" class="" @submit.prevent='addInterest'>
          <div v-for =" message in successmessages">
                <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                  </div>
                <div v-for =" message in failuremessages">
        <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
      </div>
      <h1 style="color:#52d3aa" align="center"> Add a new Interest to the system</h1>
      <br/>
      <br/>
      <div align="center"class="form-group">
          <input  v-validate="{ rules: { required: true} }" style="width:400px"type="text" name="interestname" class="form-control efc" id="interestname" placeholder="Interest Name" v-model="interestname" required="*">
          <span v-show="errors.has('interestname ')">{{ errors.first('interestname') }}</span>
      </div>

      <div align="center" class="form-group">
        <div align="center" class="row">

            <input type="submit"  style="width:100px"tabindex="4" class="form-control efc" value="Add">

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

      this.$http.post('http://localhost:3000/api/admins/addInterest',{name: this.interestname },{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
      swal(
  'Success!',
  this.interestname +" has been added!",
  'success'
);
//console.log(response);
          }).catch(function(reason) {
                this.failuremessages = reason.body.err;
                this.successmessages=[{msg:''}];
        });
      },
      getInterests: function () {

      this.$http.get('http://localhost:3000/api/students/all/interests',{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {

        this.interests = response.body.data.interests
            }).catch(function(reason) {
                //console.log(reason)
          });
        },
        reviewDataAnalysis: function () {
          this.$http.get('http://localhost:3000/api/admins/reviewinterest',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            this.most= response.body.data.most,
            this.least = response.body.data.least
          })
        }
  }
}
</script>
