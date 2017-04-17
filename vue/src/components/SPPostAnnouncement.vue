<template>
<center>
  <form role="form" class="">
        <div class="form-group">
            <h2>Enter Announcement Details: </h2>
            <label for="title" class="col-sm-2 control-label">Title:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="title" placeholder="Title" v-model="title" />
            </div>
        </div>
        
        <div class="form-group">
            <label for="content" class="col-sm-2 control-label">Content</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="content" rows="5" v-model="content"></textarea>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
               <router-link to="/"> <button class="btn btn-primary btn-sm"  v-on:click="postAnnouncement"> Post Announcement</button></router-link>
            </div>
        </div>
    </form>
    </center>
</template>

<script>
export default {
  name: 'SPPostAnnouncement',
  data () {
      return {
    title:'',
    content:''
  }
  },
methods:{
        postAnnouncement: function () 
        {
            this.$http.post('http://localhost:3000/api/sPs/announcements/post', {"title":this.title,"content":this.content}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    })
        }
    }

}
</script>
