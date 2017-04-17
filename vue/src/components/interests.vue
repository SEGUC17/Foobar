<template>
<div>
  <div>

    <div class="form-group">
      <label class="col-sm-2 control-label">
          Add a new Interest</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Admin's Name" v-model="interestname" />

        <button @click="addInterest()">add</button>
        <h5>{{msg}}</h5>
      </div>
    </div>

  </div>
  <ul>
    <!-- <li v-for =" admin in admins"><input type="radio" name="list" value="volvo">{{admin.email}} <button class="btn btn-danger">Delete</button> </li> -->

  </ul>
</div>
</template>

<script>
export default {
  name: 'interests',
  data () {
    return {
  interestname : "",
  msg : ""

    }
  },
created(){

},
methods:{

    addInterest: function () {
          this.$http.post('http://localhost:3000/api/admins/addInterest',{name: this.interestname } ).then(response => {
      this.msg="Interest has been added"
          })
        }

  }

}

</script>
