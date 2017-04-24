<template>
<div>
  <h5>The most frequent interest among student is <strong>{{most}}</strong></h5>
  <h5>The least frequent interest among student is <strong>{{least}}</strong></h5>
<h4>Interests from the most recommended to the least one  </h4>
<div>
  <ul>
    <li v-for=" interest in interests"> {{interest}}</li>
  </ul>
  <div class="form-group">
      <label  class="col-sm-2 control-label">
          Add a new Interest</label>
          <br>
          <div v-for =" message in successmessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                     </div>
                   <div v-for =" message in failuremessages">
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
           </div>
           <form role="form" class="" v-on:submit='addInterest'>
      <div class="col-sm-10">
      <input v-validate="{ rules: { required: true} }" type="text" name="interestname" class="form-control" id="interestname" placeholder="Interest Name" v-model="interestname" required="*">
                     <span v-show="errors.has('interestname ')">{{ errors.first('interestname') }}</span>
            <button @click ="addInterest()" >add</button>
          <h5>{{msg}}</h5>
      </div>
      </form>
  </div>

</div>
<ul>
    <!-- <li v-for =" admin in admins"><input type="radio" name="list" value="volvo">{{admin.email}} <button class="btn btn-danger">Delete</button> </li> -->

  </ul>
</div></template>

<script>
export default {
  name: 'interests',
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
},
methods:{
    addInterest: function () {

          this.$http.post('http://52.210.115.35:3000/api/admins/addInterest',{name: this.interestname },{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
      this.msg="Interest has been added"
      alert(this.msg)
          }).catch(function(reason) {
                        console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                console.log(this.failuremessages)
                this.successmessages=[{msg:''}];

        });
        },
        reviewDataAnalysis: function () {
          this.$http.get('http://52.210.115.35:3000/api/admins/reviewinterest',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
console.log(response)
            this.most= response.body.data.most,
            this.least = response.body.data.least,
            this.interests = response.body.data.temp
          })
        }
  }
}
</script>
