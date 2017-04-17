<template>
  <form role="form" class="">
        <div class="form-group">
            <h2>Enter Announcement Details: </h2>
            <label for="title" class="col-sm-2 control-label">Title:</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="title" placeholder="Title" v-model="title" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="content" class="col-sm-2 control-label">Content</label>
            <div class="col-sm-10">
                <input type="content" class="form-control" id="content" placeholder="Content" v-model="content" />
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
                <button class="btn btn-primary btn-sm"  v-on:click="postAnnouncement"> Post Announcement</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'postAnnouncement',
  data () {
      return {
    title:'',
    content:''
  }
  },
methods:{
        postAnnouncement: function () 
        {
            this.$http.post('http://localhost:3000/api/admins/announcements/create', {"title":this.title,"content":this.content}).then(data => {
            console.log('success');
                    })
        }
    }

}
</script>
