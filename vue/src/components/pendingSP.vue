
  <template>

  <div class="container">
    <br><br>
    <center>
      <h2>Pending service providers</h2></center>
    <table class="table table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th scope="row">Email</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="pending in pendings" >
          <td>{{pending.email}}</td>
          <td> <a  style="color =red" @click="approve()">✖</a></td>
          <td> <a  style="color:green" @click="reject()">✔</a></td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<script>

export default {
  name: 'viewPendingSP',
  data () {
    return {
      pendings:[],

    }
  },
created(){
  this.getAllPendingSP()
},
methods:{
    getAllPendingSP: function () {
      this.$http.get('http://localhost:3000/api/admins/pendingSPRequests/',{headers : { 'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.pendings=response.body.data.pendingSP

      })
    },
    approve: function(){
        this.$http.post('http://localhost:3000/api/admins/admin',{},{headers : { 'jwt-token' : localStorage.getItem('id_token')}} ).then(response => {
        })
    }


  }

}
</script>
