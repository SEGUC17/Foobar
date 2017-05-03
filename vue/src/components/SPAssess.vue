<template>
  <div>
  <div v-for =" n in students.length">
  <form role="form" class="thumbnail">

        <div class="form-group">
          <div align="center" class="col-lg-6 container">


          <div align="center"class="row">

            <br/>
            <label for="name" class="control-label">Student name: {{students[n-1].user_id.name}}</label><br/>
            <label for="email" class="control-label">Student mail: {{students[n-1].user_id.email}}</label><br/>
            <label for="name" class="control-label">Offer Name: {{students[n-1].offer_id.title}}</label>

          </div>
        </div>

            <div align="center">

              <br>
                <input type="number" min="0" max="10" id="rating" placeholder="Rating" size="" v-model="rating[n-1]" required="*">
                <br/>
                <br/>
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
      //console.log(user_id+" "+ rating +" "+ offer_id + " "+ field)
      this.$http.post('http://localhost:3000/api/sPs/students/assess/'.concat(user_id), {"rating":this.rating[index], "offer_id":offer_id, "field":field},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
        swal("Success","Student Rated",'success');
            //console.log('success');
            this.getStudents();
                    })
    },
  }

}
</script>
