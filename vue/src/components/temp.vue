<template>

<div class="Home">
<div class="bg-content">
 <div class="container">
    <div class="row">
          <div class="span12">
        <!-- slider -->
        <div class="flexslider">
              <ul class="slides">
            <li> <img src="~assets/img/slide-1.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-2.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-3.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-4.jpg" alt="" > </li>
            <li> <img src="~assets/img/slide-5.jpg" alt="" > </li>
          </ul>
        </div>
        <span id="responsiveFlag"></span>
        <div class="block-slogan">

              <div>
            <p style="text-align:center; padding-top:20px;"><a href="#" class="btn btn-1">Download Bootstrap</a></p>
          </div>
            </div>
      </div>
    </div>
    <input type="text" class="form-control"  placeholder="interest" v-model="val" >

    <center><button class="" v-on:click="ee">Get all announcements</button></center>
    <div>{{msg}}</div>
  </div>
  </div>

  </div>

</template>
<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
      val :''
    }
  },
  methods: {
    ee: function () {
      this.$http.post('http://localhost:3000/admin/addInterest',{name:this.val}).then(response => {
        this.msg = response.body.data.name
      })
    }
  }
}
</script>
