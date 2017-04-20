<template>
  <div>

<ul>
  <li v-for =" reservation in reservations"> {{reservation.user_id}}</li>
</ul>


  </div>
</template>
<script>
export default {
  name: 'SPReservations',
  data () {
    return {
      reservations:[]
    }
  },
created(){
  this.getReservations()
},
methods:{
    getReservations: function () {
      this.$http.get('http://localhost:3000/api/sPs/reservations/view', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.reservations=response.data.data.reservations
      })
    }}

}
</script>
