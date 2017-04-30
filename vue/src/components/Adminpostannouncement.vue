<template>
<center>
  <form role="form" class="" @submit.prevent="postAnnouncement">

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
            this.$http.post('http://52.210.115.35:3000/api/admins/announcements/post', {"title":this.title,"content":this.content}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
              swal(
          'Success',
          'Announcement posted',
          'success'
        )
        console.log(data);
              this.$router.push({path:'/'})

                    }).catch(function(reason) {
                      swal(
        'Oops...',
        reason.body.err,
        'error'
      );

        });
        }
    }

}
</script>
