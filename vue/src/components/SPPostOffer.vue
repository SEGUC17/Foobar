<template>
<center>


  <form role="form" class="" v-on:submit.prevent="postOffer()">
            <h1 style="color:#52d3aa">Enter Offer Details </h1><br>
        <div align="center" style="width:400px" class="form-group">

            <h4 for="title" style="color:#52d3aa" class="control-label">Title</h4>
            <input v-validate="{ rules: { required: true} }" type="text" name="title" class="form-control" id="title" placeholder="Title" v-model="title" required="*" >
            <span v-show="errors.has('title')">{{ errors.first('title') }}</span>

        </div>

        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <h4 for="price" style="color:#52d3aa" class="control-label">Price</h4>
            <input v-validate="{ rules: { required: true} }" type="number" name="price" class="form-control" id="price" placeholder="Price" v-model="price" required="*">
            <span v-show="errors.has('price')">{{ errors.first('price') }}</span>
        </div>
        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <h4 for="capacity" style="color:#52d3aa" class="control-label">Capacity</h4>
             <input v-validate="{ rules: { required: true} }" type="number" name="capacity" class="form-control" id="capacity" placeholder="Capacity" v-model="capacity" required="*">
            <span v-show="errors.has('capacity')">{{ errors.first('capacity') }}</span>
        </div>

        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <h4 for="field" style="color:#52d3aa" class="col-sm-2 control-label">Field:</h4>
            <div class="col-sm-10">
                <select style="width:200px;height:30px" v-model="field">
                <option v-for="option in interests" align="center" v-bind:value="option.name">
                 {{ option.name }}
                </option>
                </select >
            </div>
        </div>
        <br/>
        <br/>
        <br/>

        <div align="center" style="width:400px" class="form-group">
            <label for="due_date"  style="color:#52d3aa" class="col-sm-2 control-label">Due Date</label>
            <div class="col-sm-10">
            <input v-validate="{ rules: { required: true} }" type="date" name="due_date" class="form-control" id="due_date" v-model="due_date" required="*">
                     <span v-show="errors.has('due_date')">{{ errors.first('due_date') }}</span>
            </div>
        </div>

        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <label for="start_date" style="color:#52d3aa" class="col-sm-2 control-label">Start Date</label>
            <div class="col-sm-10">
             <input v-validate="{ rules: { required: true} }" type="date" name="start_date" class="form-control" id="start_date" v-model="start_date" required="*">
                     <span v-show="errors.has('start_date')">{{ errors.first('start_date') }}</span>

            </div>
        </div>

        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <label for="end_date" style="color:#52d3aa" class="col-sm-2 control-label">End Date</label>
            <div class="col-sm-10">
               <input v-validate="{ rules: { required: true }}" type="date" name="end_date" class="form-control" id="end_date" v-model="end_date" required="*">
                     <span v-show="errors.has('end_date')">{{ errors.first('end_date') }}</span>

            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div align="center" style="width:400px" class="form-group">
            <h4  for="description" style="color:#52d3aa" align="left"class="control-label"><b>Description</b></h4>
            <textarea name="description" class="form-control" id="description" rows="5" v-model="description"></textarea>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div class="row" align="center">
                <button class="btn btn-primary btn-sm" style="width:200px;height:50px">Post Offer</button>
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
              swal(
                  'Success!',
                  'Offer Posted!',
                  'success'
              )
              this.$router.push({path:'/',force:true})
            //console.log('success');

                    }).catch(function(reason) {
                        swal(
                            'Oops!',
                            reason.body.data.err,
                            'error'
                        )
                        ////console.log(reason.body.data.err);

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
