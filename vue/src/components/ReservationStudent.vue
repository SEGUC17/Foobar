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
          <td>{{reservation.reservation_date.substring(0,10)}}</td>
          <td v-if="reservation.status==0">Applied</td>
          <td v-else-if="reservation.status==1">Approved (Paid)<a style="color:red; margin-left:10px; cursor:pointer;" @click.prevent="refund(reservation._id,reservation.charge_id)">Refund</a></td>
          <td v-else-if="reservation.status==2">Disapparoved</td>
          <td v-else-if="reservation.status==3">Refunded</td>

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
    }, refund: function(id, charge){
       if(localStorage.getItem('id_token')!=null){
          this.$http.post('http://localhost:3000/api/refund',{"charge_id":charge},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
            this.$http.post('http://localhost:3000/api/changeStatus',{"id":id},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
              this.getReservations();
            })
          })
       }else{swal("Success","You have to be signed in to apply",'success')}
      }
    }
}
</script>
