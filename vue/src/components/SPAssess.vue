<template>
  <div>
  <div v-for =" n in students.length">
  <form role="form" class="thumbnail">

        <div class="form-group">
          <div class="container">


          <div class="row">


            <label for="name" class="col-sm-2 control-label">Student name: {{students[n-1].user_id.name}}</label>
            <label for="email" class="col-sm-2 control-label">Student mail: {{students[n-1].user_id.email}}</label>
            <label for="name" class="col-sm-2 control-label">Offer Name: {{students[n-1].offer_id.title}}</label>
            <label for="email" class="col-sm-2 control-label">Offer field: {{students[n-1].offer_id.field}}</label>

            <label for="rating" class="col-sm-2 control-label">Rating</label>
          </div>
        </div>



            <div class="col-sm-10">
              <br>
              <br>
                <input type="number" id="rating" placeholder="Rating" size="10" v-model="rating[n-1]" required="*">
                <br>
                <button class="btn btn-primary btn-sm" v-on:click="assess(students[n-1].user_id._id, n-1, students[n-1].offer_id._id, students[n-1].offer_id.field)">Assess</button>
            </div>


        </div>

    </form>
  </div>

  </div>
</template>
<script>

import Vue from 'vue'
import StarRating from 'vue-star-rating'
Vue.component('star-rating', StarRating);


export default {
  name: 'SPAssess',
  data () {
    return {
      students:[],
      rating:[]
    }
  },
created(){
  this.getStudents()
},
methods:{
    getStudents: function () {
      this.$http.get('http://localhost:3000/api/sPs/students/offer',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.students=response.data.data.students
      })
    },
    assess: function(user_id, index, offer_id, field){
      console.log(user_id+" "+ rating +" "+ offer_id + " "+ field)
      this.$http.post('http://localhost:3000/api/sPs/students/assess/'.concat(user_id), {"rating":this.rating[index], "offer_id":offer_id, "field":field},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
        alert("Student Rated");
            console.log('success');
            this.getStudents();
                    })
    },
  }

}
</script>
