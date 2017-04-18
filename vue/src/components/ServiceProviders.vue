<template>
  <div>

<ul>
  <li v-for =" serviceprovider in serviceproviders">{{serviceprovider._id}}</li>
</ul>


  </div>
</template>
<script>
export default {
  name: 'serviceprovider',
  data () {
    return {
      serviceproviders:[]
    }
  },
created(){
  this.getAllServiceProviders()
},
methods:{
    getAllServiceProviders: function () {
      this.$http.get('http://localhost:3000/api/students/sPs', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {

        this.serviceproviders=response.data.data.profiles
      })
    }}

}
</script>
