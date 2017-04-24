<template>
  <div>
  <br>

 <div align="center" v-for =" n in offers.length" class="row-2">
        <div class="container" align="center">
          <h4>{{offers[n-1].sp_id.name}}</h4>
          <h4>{{offers[n-1].title}}</h4>
          <h3>{{offers[n-1].field}}</h3>
          Price: {{offers[n-1].price}}<br/>
          Description: {{offers[n-1].decription}}<br/>

          <button @click="Apply(offers[n-1],n-1)">Apply</button>

          </div>
  </div>



  </div>
</template>
<script>
export default {
  name: 'offers',
  data () {
    return {
      offers:[],
      counter:[],
      student:{}
    }
  },
created(){
  this.viewOffers()
},
methods:{
  viewOffers: function(){
      this.$http.get('http://localhost:3000/api/students/viewoffer',{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.offers= response.data.data.offers;
        this.student = response.data.data.student;
              //  console.log(response.data.data.offers);
      })
    },
    Apply: function(offer , index){
if(localStorage.getItem('id_token')!=null){
var x = confirm("Are you sure you want to apply for this offer ?")

if(x){

      this.$http.post('http://localhost:3000/api/students/offers',{"offer_id":offer._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {

        alert("You succesfully applied")
      }).catch(function(reason) {alert(reason.body.message)});
      }}
      else{alert("You have to be signed in to apply")}


    }
}
}
</script>
