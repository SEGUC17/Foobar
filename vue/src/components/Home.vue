<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
<button v-on:click="created">test</button>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js acApasp'
    }
  },
  methods: {
    created: function () {
      this.$http.get('http://localhost:3000/admin/announcements/view/').then(response => {
        this.msg = response.data.data.announcements
      })
    }
  }
}
</script>
