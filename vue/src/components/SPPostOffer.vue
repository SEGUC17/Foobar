<template>
<center>
  <form role="form" class="">
        <div class="form-group">
            <h2>Enter Offer Details: </h2>
            <label for="title" class="col-sm-2 control-label">Title:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="title" placeholder="Title" v-model="title" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="price" class="col-sm-2 control-label">Price</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="price" placeholder="Price" v-model="price" />
            </div>
        </div>

        <div class="form-group">
            <label for="capacity" class="col-sm-2 control-label">Capacity</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="capacity" placeholder="Capacity" v-model="capacity" />
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
                <textarea v-model="description" placeholder="description.."></textarea>
            </div>
        </div>

        <div class="form-group">
            <label for="due_date" class="col-sm-2 control-label">Due Date</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="due_date" placeholder="due_date" v-model="due_date" />
            </div>
        </div>

        <div class="form-group">
            <label for="start_date" class="col-sm-2 control-label">Start Date</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="start_date" placeholder="start_date" v-model="start_date" />
            </div>
        </div>

        <div class="form-group">
            <label for="end_date" class="col-sm-2 control-label">End Date</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="end_date" placeholder="end_date" v-model="end_date" />
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm"  v-on:click="postOffer">Post Offer</button>
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
    interests:[]
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
                    })
        },
        getInterests: function () {
      this.$http.get('http://localhost:3000/api/sPs/interests',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.interests=response.data.data.interests
      })
    }
    }

}
</script>