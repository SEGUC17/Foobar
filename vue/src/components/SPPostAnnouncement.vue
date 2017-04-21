<template>
<center>
  <form role="form" class="" @submit.prevent="">
        <div class="form-group">
            <h2>Enter Announcement Details: </h2><br>
              <div v-for =" message in successmessages">                                  
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                     </div>
                   <div v-for =" message in failuremessages">                               
               <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
           </div>
           <br><br>
            <label for="title" class="col-sm-2 control-label">Title:</label>
            <div class="col-sm-10">
                  <input v-validate="{ rules: { required: true} }" type="text" name="title" class="form-control" id="title" placeholder="Title" v-model="title">
                     <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
        </div>
        
        <div class="form-group">
            <label for="content" class="col-sm-2 control-label">Content</label>
            <div class="col-sm-10">
               <textarea v-validate="{ rules: { required: true} }" name="content" class="form-control" id="content" placeholder="Content" v-model="content"></textarea>
                     <span v-show="errors.has('content')">{{ errors.first('content') }}</span>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
              <router-link to="/">  <button class="btn btn-primary btn-sm"  v-on:click="postAnnouncement"> Post Announcement</button></router-link>
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
    content:'',
    successmessages:[{msg:''}],
    failuremessages:[{msg:''}],
    
  }
  },
methods:{
        postAnnouncement: function () 
        {
            this.$http.post('http://localhost:3000/api/sPs/announcements/post', {"title":this.title,"content":this.content}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    }).catch(function(reason) {
                        console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                console.log(this.failuremessages)
                this.successmessages=[{msg:''}];

        });
        }
    }

}
</script>
