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
          <td>{{reservation.service_provider_id.name}}</td>
          <td>{{reservation.service_provider_id.email}}</td>
          <td>{{reservation.offer_id.title}}</td>
          <td>{{reservation.reservation_date.substring(0, 10)}}</td>
          <td v-if="reservation.status==0">Applied</td>
          <td v-else-if="reservation.status==1">Approved (Paid)</td>
          <td v-else-if="reservation.status==2">Disapparoved</td>
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
        console.log(response);
        this.reservations=response.data.data.reservations
      })
    }}

}
</script>
