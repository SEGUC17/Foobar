<template>
  <div>

<ul>
  <li v-for =" announcement in announcements"> {{announcement.title}}</li>
</ul>


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
      this.$http.get('http://localhost:3000/admin/announcements/view').then(response => {

        this.announcements=response.data.data.announcements
      })
    }}

}
</script>
