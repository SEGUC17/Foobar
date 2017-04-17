<template>
  <form role="form" class="">
    <h2>Enter your info: </h2>
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="name" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Email:</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="phone_number" class="col-sm-2 control-label">Phone Number:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="phone_number" placeholder="phone_number" v-model="phone_number" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="description" placeholder="Description" v-model="description" />
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm"  v-on:click="applySP"> Apply</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'ApplySP',
  data () {
      return {
    name:'',
    email:'',
    phone_number:'',
    description:''
  }
},
methods:{
        applySP: function () 
        {
            this.$http.post('http://localhost:3000/api/sPs/sP/apply', {"name":this.name,"email":this.email,"phone_number":this.phone_number,"description":this.description}).then(data => {
            console.log('success');
                    })
        }
    }

}
</script>
