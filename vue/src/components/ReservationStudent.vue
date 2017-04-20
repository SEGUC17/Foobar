<template>
  <div>

      <h4>Your reservations Details</h4>
      <table class="table table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th scope="row">Service Provider Name</th>
          <th scope="row">Service Provider Email</th>
          <th scope="row">Offer Title</th>
          <th scope="row">Date</th>
          <th scope="row">Status</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" >
          <td>{{reservation.user_id.name}}</td>
          <td>{{reservation.user_id.email}}</td>
          <td>{{reservation.offer_id.title}}</td>
          <td>{{reservation.reservation_date}}</td>
          <td>{{reservation.status}}</td>
        </tr>
      </tbody>
    </table>

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
      this.$http.get('http://localhost:3000/api/students/reservations/view', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.reservations=response.data.data.reservations
      })
    }}

}
</script>
