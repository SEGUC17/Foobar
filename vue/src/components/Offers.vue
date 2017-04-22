<template>
  <div>
  <br>

 <div align="center" v-for =" n in offers.length" class="row-2">
        <div class="container" align="center">
          <h4>{{offer.sp_id.name}}</h4>
          <h4>{{offer.title}}</h4>
          <h3>{{offer.field}}</h3>
          Price: {{offer.price}}<br/>
          Description: {{offer.decription}}<br/>

          <button @click="Apply(offer[n-1],n-1)">Apply</button>

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
                console.log(response.data.data.offers);
      })
    },
    Apply: function(offer , index){
      
var x = confirm("Are you sure you want to apply for this offer ?")

if(x){      
      this.$http.post('http://localhost:3000/api/students/offers',{"offer_id":offer._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}),then(response=> {
        alert("You succesfully applied")
      })
      }
    
    
    }
}
}
</script>
