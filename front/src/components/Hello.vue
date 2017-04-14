<template>

<div class="hello">
<button class="" v-on:click="created">test</button>
<div>{{msg}}</div>


 <div class="container">
    <div class="row">
          <div class="span12"> 
        <!-- slider -->
        <div class="flexslider">
              <ul class="slides">
            <!--<li> <img src="./assets/img/slide-1.jpg" alt="" > </li>
            <li> <img src="./assets/img/slide-2.jpg" alt="" > </li>
            <li> <img src="./asset/img/slide-3.jpg" alt="" > </li>
            <li> <img src="./assets/img/slide-4.jpg" alt="" > </li>
            <li> <img src="./assets/img/slide-5.jpg" alt="" > </li>-->
          </ul>
            </div>
        <span id="responsiveFlag"></span>
        <div class="block-slogan">
              <h2>Namaskar!</h2>
              <div>
            <p>This template is designed and developed over the Bootstrap frontend framework. Which is a free front-end framework for designers. Template is fully <i>responsive</i> and <i>compatible</i> with all the major browsers.</p>
            <p style="text-align:center; padding-top:20px;"><a href="#" class="btn btn-1">Download Bootstrap</a></p>
          </div>
            </div>
      </div>
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
      msg: ''
    }
  },
  methods: {
    created: function () {
      this.$http.get('http://localhost:3000/admin/announcements/view/').then(response => {
        this.msg = response.body.data.announcements
      })
    }
  }
}
</script>
