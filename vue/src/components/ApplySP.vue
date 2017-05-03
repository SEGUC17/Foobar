<template>
    <center>
  <form role="form" class="" @submit.prevent="">
    <h2>Enter your info </h2>
    <br>
     <div v-for =" message in successmessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                     </div>
                   <div v-for =" message in failuremessages">
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
           </div>
           <br><br>

        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name:</label>
            <div class="col-sm-10">
    <input v-validate="{ rules: { required: true} }" type="text" name="name" class="form-control" id="name" placeholder="Name" v-model="name" required="*">
                     <span v-show="errors.has('name')">{{ errors.first('name') }}</span>

            </div>
        </div>

        <div class="form-group">
                   <label for="email" class="col-sm-2 control-label">Email:</label>
      <div class="col-sm-10">
                   <input v-validate="{ rules: { required: true,email: true} }" type="email" name="email" class="form-control" id="email" placeholder="Email" v-model="email" required="*">
                     <span v-show="errors.has('email')">{{ errors.first('email') }}</span>


            </div>
        </div>

        <div class="form-group">
            <label for="phone_number" class="col-sm-2 control-label">Phone Number:</label>
            <div class="col-sm-10">
              <input v-validate="{ rules: { required: true} }" type="text" name="phone_number" class="form-control" id="phone_number" placeholder="Phone Number" v-model="phone_number" required="*">
                     <span v-show="errors.has('phone_number')">{{ errors.first('phone_number') }}</span>
            </div>
        </div>

        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description:</label>
            <div class="col-sm-10">
            <textarea v-validate="{ rules: { required: true} }" type="text" name="description" class="form-control" id="description" placeholder="Description" v-model="description" required="*"></textarea>
                     <span v-show="errors.has('description')">{{ errors.first('description') }}</span>

            </div>
        </div>

        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
             <!--  <router-link to="/"> -->
              <button class="btn btn-primary btn-sm"  v-on:click="applySP"> Apply</button>
<!--               </router-link> -->         </div>
        </div>
    </form>
    </center>
</template>

<script>
export default {
  name: 'ApplySP',
  data () {
      return {
    name:'',
    email:'',
    phone_number:'',
    description:'',
    successmessages:[{msg:''}],
    failuremessages:[{msg:''}]
  }
},
methods:{
        applySP: function ()
        {
            this.$http.post('http://localhost:3000/api/sPs/sP/apply', {"name":this.name,"email":this.email,"phone_number":this.phone_number,"description":this.description}).then(data => {
            swal("Success","You successfully applied",'success');
             this.$router.push({path:'/'});

            //console.log('success');
                    }).catch(function(reason) {
                        //console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                //console.log(this.failuremessages)
                this.successmessages=[{msg:''}];
        });

        }
    }

}
</script>
