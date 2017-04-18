<template>
  <div>
 
<center>
      <br>
      <br>
      
  <h2>{{most}}</h2>
  <br><br><br>
  <h2>{{least}}</h2>
</center>


  </div>

<!-- <ul>
  <li v-for =" announcement in announcements"> {{announcement.title}}</li>
</ul> -->


  
</template>
<script>
export default {
  name: 'reviewData',
  data () {
    return {
      most:{},
      least:{}
    }
  },
created(){
  this.getReviewData()
},
methods:{
    getReviewData: function () {
      this.$http.get('http://localhost:3000/api/admins/reviewData', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.most=response.data.data.most
        this.least =response.data.data.least
      })
    }}
}
</script>