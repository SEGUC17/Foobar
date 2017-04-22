<template>
  <div>

    <br><br>
    <center>
      <h2>Announcements</h2></center>
      <br><br><br>
     <div v-for =" announcement in announcementsInPage" class="row-2">
        <div class="container" align="center">
          <h3 align="left">{{announcement.title}}</h3>
            
            <p>{{announcement.content}}</p>
            <h3>Announcer Name: {{announcement.announcer_id.name}}</h3>
            <h3>Announcer Email: {{announcement.announcer_id.email}}</h3>
          <h2>{{announcement.type}}</h2>

          
            
      </div>
        </div>
      
          
          <li v-for="n in numberOfPages"><a @click="changePage(n)">{{n}}</a></li>

  </div>
</template>
<script>
export default {
  name: 'announcements',
  data () {
    return {
      announcements:[],
      announcementsInPage:[],
      numberOfPages: 0 , 
      perPage: 3 

    }
  },
created(){
  this.getAllAnnouncements()
},
methods:{
    getAllAnnouncements: function () {
      this.$http.get('http://localhost:3000/api/announcements/view').then(response => {
        this.announcements=response.data.data.announcements
        console.log(this.announcements);
        this.numberOfPages=Math.ceil(this.announcements.length/this.perPage);
        for(var i = 0 ; i<this.perPage && i<this.announcements.length ; i++){
          this.announcementsInPage.push(this.announcements[i]);

        }
        console.log(this.announcementsInPage)

      })
    },
    changePage: function(number){
      var lastPost = number * this.perPage
      var firstPost = (number*this.perPage)-this.perPage
      this.announcementsInPage = []
      
      for(var i = firstPost ; i<lastPost && i<this.announcements.length ; i++){
       this.announcementsInPage.push(this.announcements[i]);
      }
    }
  }
}
</script>