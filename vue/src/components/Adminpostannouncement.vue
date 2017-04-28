<template>
<center>
  <form role="form" class="" v-on:submit="postAnnouncement">

        <h2>Enter Announcement Details:</h2>
        <div v-for =" message in successmessages">                                  
            <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
         </div>
         <div v-for =" message in failuremessages">                               
            <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
         </div>

        <div class="form-group">
               <input v-validate="{ rules: { required: true} }" type="text" name="title" class="form-control efc" id="title" placeholder="Title" v-model="title" required="*">
                     <span v-show="errors.has('title')">{{ errors.first('title') }}</span>   
        </div>

        <div class="form-group">
                <textarea v-validate="{ rules: { required: true} }" name="content" class="form-control efc" id="content" placeholder="Content" v-model="content" required="*"></textarea>
                     <span v-show="errors.has('content')">{{ errors.first('content') }}</span>
        </div>

        <div class="row">
            <center>
                <button class="btn btn-primary"> Post Announcement</button>
            </center>
        </div>
    </form>
    </center>
</template>

<script>
export default {
  name: 'Adminpostannouncement',
  data () {
      return {
    title:'',
    content:'',
    successmessages:[{msg:''}],
    failuremessages:[{msg:''}]
  }
  },
methods:{
        postAnnouncement: function ()
        {
            this.$http.post('http://localhost:3000/api/admins/announcements/post', {"title":this.title,"content":this.content}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
              alert("Announcement Posted")
              this.$router.push({path:'/'})
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
