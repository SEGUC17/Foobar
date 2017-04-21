<template>
<center>
  <form role="form" class="" @submit.prevent="">
        <div class="form-group">
            <h2>Enter Offer Details: </h2>
             <div v-for =" message in successmessages">                                  
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                     </div>
                   <div v-for =" message in failuremessages">                               
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
           </div>

            <label for="title" class="col-sm-2 control-label">Title:</label>
            <div class="col-sm-10">
             <input v-validate="{ rules: { required: true} }" type="text" name="title" class="form-control" id="title" placeholder="Title" v-model="title">
                     <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
               
            </div>
        </div>
        
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Price</label>
            <div class="col-sm-10">
            <input v-validate="{ rules: { required: true} }" type="number" name="price" class="form-control" id="price" placeholder="Price" v-model="price">
                     <span v-show="errors.has('price')">{{ errors.first('price') }}</span>
                
            </div>
        </div>

        <div class="form-group">
            <label for="capacity" class="col-sm-2 control-label">Capacity</label>
            <div class="col-sm-10">
             <input v-validate="{ rules: { required: true} }" type="number" name="capacity" class="form-control" id="capacity" placeholder="Capacity" v-model="capacity">
                     <span v-show="errors.has('capacity')">{{ errors.first('capacity') }}</span>
                
            </div>
        </div>

        <div>
        <label for="field" class="col-sm-2 control-label">Field</label>
        <select v-model="field">
          <option v-for="option in interests" v-bind:value="option.value">
            {{ option.name }}
          </option>
        </select>
        <span>{{ field }}</span>
        </div>

        <div class="form-group">
            <label for="description" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
            <textarea v-validate="{ rules: { required: true} }" name="description" class="form-control" id="description" placeholder="Description" v-model="description"></textarea>
                     <span v-show="errors.has('description')">{{ errors.first('description') }}</span>
                
            </div>
        </div>

        <div class="form-group">
            <label for="due_date" class="col-sm-2 control-label">Due Date</label>
            <div class="col-sm-10">
            <input v-validate="{ rules: { required: true} }" type="date" name="due_date" class="form-control" id="due_date" v-model="due_date">
                     <span v-show="errors.has('due_date')">{{ errors.first('due_date') }}</span>
                
            </div>
        </div>

        <div class="form-group">
            <label for="start_date" class="col-sm-2 control-label">Start Date</label>
            <div class="col-sm-10">
             <input v-validate="{ rules: { required: true} }" type="date" name="start_date" class="form-control" id="start_date" v-model="start_date">
                     <span v-show="errors.has('start_date')">{{ errors.first('start_date') }}</span>
                
            </div>
        </div>

        <div class="form-group">
            <label for="end_date" class="col-sm-2 control-label">End Date</label>
            <div class="col-sm-10">
               <input v-validate="{ rules: { required: true }}" type="date" name="end_date" class="form-control" id="end_date" v-model="end_date">
                     <span v-show="errors.has('end_date')">{{ errors.first('end_date') }}</span>
                
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
             <router-link to="/">   <button class="btn btn-primary btn-sm"  v-on:click="postOffer()">Post Offer</button></router-link>
            </div>
        </div>
    </form>
    </center>
</template>

<script>
export default {
  name: 'SPPostOffer',
  data () {
      return {
    title:'',
    price:'',
    capacity:'',
    field:'',
    description:'',
    due_date:'',
    start_date:'',
    end_date:'',
    interests:[],
    successmessages:[{msg:''}],
    failuremessages:[{msg:''}]
  }
  },
  created() {
    this.getInterests()
 },
methods:{
        postOffer: function () 
        {
            this.$http.post('http://localhost:3000/api/sPs/offers/create', {"title":this.title,"price":this.price, "capacity":this.capacity, "field":this.field, "description":this.description, "due_date":this.due_date, "start_date":this.start_date, "end_date":this.end_date},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    }).catch(function(reason) {
                        console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                console.log(this.failuremessages)
                this.successmessages=[{msg:''}];
        });
        },
        getInterests: function () {
      this.$http.get('http://localhost:3000/api/sPs/interests',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.interests=response.data.data.interests
      })
    }
    }

}
</script>