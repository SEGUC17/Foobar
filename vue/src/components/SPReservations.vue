<template>
  <div>

      <h4>Your reservations Details</h4>
      <table class="table table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th scope="row">Student Name</th>
          <th scope="row">Student Email</th>
          <th scope="row">Offer Title</th>
          <th scope="row">Date</th>
          <th scope="row">Status</th>
          <th scope="row">Approve</th>
          <th scope="row">Disapprove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" >
          <td>{{reservation.user_id.name}}</td>
          <td>{{reservation.user_id.email}}</td>
          <td>{{reservation.offer_id.title}}</td>
          <td>{{reservation.reservation_date}}</td>
          <td v-if="reservation.status==0">Applied</td>
          <td v-else-if="reservation.status==1">Approved (Paid)</td>
          <td v-else-if="reservation.status==2">Disapparoved</td>

          <td v-if="reservation.status==0"><a  style="color:green" v-on:click="approve(reservation._id)">✔</a></td>
          <td v-else></td>
          <td v-if="reservation.status==0"><a style="color =red" v-on:click="disapprove(reservation._id)">✖</a></td>
          <td v-else></td>
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
      this.$http.get('http://54.77.11.251:3000/api/sPs/reservations/view', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.reservations=response.data.data.reservations
      })
    },
    approve:function(reservation_id){

        this.$http.post('http://54.77.11.251:3000/api/sPs/reservations/approve',{"id":reservation_id, "approve":true}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
          swal("Success","Reservation Approved",'success')
        this.getReservations();
        })

    },
    disapprove: function(reservation_id){

        this.$http.post('http://54.77.11.251:3000/api/sPs/reservations/approve',{"id": reservation_id, "approve":false}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
          swal("Success","Reservation Disapproved",'success')

        this.getReservations();
        })

    }
  }
}
</script>
