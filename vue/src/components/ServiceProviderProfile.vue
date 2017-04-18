<template>
  <div>

<ul>
  <li>{{service.user_id}}</li>
  <li> {{user}}</li>

 <li v-for = "servicep in service.fields"> {{servicep}} </li>
 
</ul>


  </div>
</template>
<script>

export default {
  name: 'StudentProfile',
  // components: {
  //  ServiceProvider
  // }
  data () {
    return {
      service:{},
      user:{}
    }
  },
created(){
  this.getServiceProvider()
},
methods:{
    getServiceProvider: function () {
      let route ='http://localhost:3000/api/students/sP/'.concat(this.$route.params.id);
   
      this.$http.get(route).then(response => {
        console.log(this.$route.params.id);

        this.service=response.data.data.providerProfile;
        this.user =response.data.data.user;
        console.log(this.user);
        
      })
    },
   


  }

}
</script>
