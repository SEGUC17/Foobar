<template>
<div>
  <div class="form-group">
    <label class="col-sm-2 control-label">
            Add an Announcement</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Title" v-model="title" />
      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Content" v-model="content" />


      <button @click="postAnnouncements()">Post</button>
      <h5>{{msg}}</h5>
    </div>
  </div>
  <ul>
    <li v-for=" announcement in announcements"> {{announcement.title}}</li>
  </ul>


</div>
</template>
<script>
export default {
  name: 'announcements',
  data () {
    return {
      announcements:[],
      title: "",
      content: "",
      msg : ""
    }
  },
created(){
  this.getAllAnnouncements()
},
methods:{
    getAllAnnouncements: function () {
      this.$http.get('http://localhost:3000/api/admins/announcements/view').then(response => {

        this.announcements=response.data.data.announcements
      })
    },
    postAnnouncements: function () {
          this.$http.post('http://localhost:3000/api/admins/adminpost',{headers : { 'jwt-token' : localStorage.getItem('id_token')}, Body :{'title' :this.name , 'content' : this.content}}).then(response => {
      this.msg="Announcement has been added"
          })
        }
  }

}
</script>
