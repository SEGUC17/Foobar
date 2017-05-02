<template>
<center>

 <div align="center" class="row">
  <form role="form"  @submit.prevent="">

            <h1 style="color:#52d3aa">Enter Announcement Details </h1><br>
            <div class="form-group">
                <div v-for =" message in successmessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                </div>

                <div v-for =" message in failuremessages">
                    <div style="color:#F25C27; margin-bottom:10px;">{{message.msg}}</div>
                </div>
           <br/><br/>

            <div align="center" style="width:400px">
                <input v-validate="{ rules: { required: true} }" type="text" name="title" class="form-control" id="title" placeholder="Title" v-model="title" required="*">
                <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
        </div>

        <div class="form-group">

            <div align="center" style="width:400px">
               <textarea v-validate="{ rules: { required: true} }" rows="5"name="content" class="form-control" id="content" placeholder="Content" v-model="content" required="*"></textarea>
                     <span v-show="errors.has('content')">{{ errors.first('content') }}</span>
            </div>
        </div>
        <br/>
        <br/>
        <div class="row">

            <div align="center" style="width:400px">
            <center>    <button class="btn btn-primary btn-sm" style="height:50px" v-on:click="postAnnouncement"> Post Announcement</button></center>
            </div>
        </div>
    </form>
    </div>
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

          swal(
            'Success!',
            'Announcement Posted!',
            'success'
          )
          this.$router.push({path:'/'})

            //console.log('success');
                    }).catch(function(reason) {
                        //console.log(reason.body.err);
                this.failuremessages = reason.body.err;
                //console.log(this.failuremessages)
                this.successmessages=[{msg:''}];

        });
        }
    }

}
</script>
