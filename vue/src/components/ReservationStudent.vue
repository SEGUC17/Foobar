<template>
  <div>

<ul>
  <li v-for =" reservation in reservations"> {{reservation.user_id}}</li>
</ul>


  </div>
</template>
<script>
export default {
  name: 'announcements',
  data () {
    return {
      reservations:[]
    }
  },
created(){
  this.getAllReservations()
},
methods:{
    getAllReservations: function () {
      this.$http.get('http://localhost:3000/api/students/reservations/view').then(response => {

        this.reservations=response.data.data.reservations
      })
    }}

}
</script>
