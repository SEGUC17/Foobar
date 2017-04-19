<template>
  <div>
  <br>

 <div v-for =" offer in offers" class="row-2">
        <div class="container" align="center">
          <h3 align="left">{{offer.field}}</h3>
            <h1>{{offer.sp_id}}</h1>
            <p>{{offer._id}}</p>
            <button @click="Apply(offer)">Apply</button>

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
    Apply: function(offer){
      this.$http.post('http://localhost:3000/api/students/offers',{"offer_id":offer._id},{headers : {'jwt-token' : localStorage.getItem('id_token')}})
    }
    }
}
</script>
