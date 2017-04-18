<template>
  <div>

    <br><br>
    <center>
      <h2>Announcements</h2></center>
      <br><br><br>
     <div v-for =" announcement in announcements" class="row-2">
        <div class="container" align="center">
          <h3 align="left">{{announcement.title}}</h3>
            
            <p>{{announcement.content}}</p>

          <h2>{{announcement.type}}</h2>
            
      </div>
        </div>
    
  


  </div>
</template>
<script>
export default {
  name: 'announcements',
  data () {
    return {
      announcements:[]
    }
  },
created(){
  this.getAllAnnouncements()
},
methods:{
    getAllAnnouncements: function () {
      this.$http.get('http://localhost:3000/api/announcements/view').then(response => {
        this.announcements=response.data.data.announcements
      })
    }}
}
</script>