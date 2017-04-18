<template>
<div>
  <h5>The most frequent interest among student is <strong>{{most}}</strong></h5>
  <h5>The least frequent interest among student is <strong>{{least}}</strong></h5>

<div>
  <ul>
    <li v-for=" interest in interests"> {{interest}}</li>
  </ul>
  <div class="form-group">
      <label  class="col-sm-2 control-label">
          Add a new Interest</label>
      <div class="col-sm-10">
          <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Admin's Name" v-model ="interestname" />

          <button @click ="addInterest()" >add</button>
          <h5>{{msg}}</h5>
      </div>
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
  interests: []

    }
  },
created(){
this.reviewDataAnalysis();
},
methods:{

    addInterest: function () {
          this.$http.post('http://localhost:3000/api/admins/addInterest',{name: this.interestname },{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
      this.msg="Interest has been added"
          })
        },
        reviewDataAnalysis: function () {
          this.$http.get('http://localhost:3000/api/admins/reviewinterest',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
console.log(response)
            this.most= response.body.data.most,
            this.least = response.body.data.least,
            this.interests = response.body.data.temp
          })
        }

  }

}

</script>
