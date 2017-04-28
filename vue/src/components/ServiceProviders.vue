<style scoped>


#features {
    margin-top:20px;
}
.feature, .feature i, .feature h3, .feature .title_border {
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
}
.feature {
    background:#FFFFFF;
    text-align:center;
    padding:20px;
    border: solid 1px #cccccc;
}
.feature p {
    margin-top:20px;
    margin-bottom:30px;
}
.feature i{
    font-size:80px;
    color:#FFFFFF;
    background:#1E825F;
    padding:30px;
    border-radius:50%;
    border: solid 3px #1E825F;
}
.feature h3 {
    color:#1E825F;
}
.feature:hover {
    background:#F5F5F5;
    -webkit-transform: translate(0,1em);
    -moz-transform: translate(0,1em);
    -o-transform: translate(0,1em);
    -ms-transform: translate(0,1em);
    transform: translate(0,1em);
}
.feature:hover i{
    color:#1E825F;
    border-color:#1E825F;
    background:#FFFFFF;
}
.feature:hover .title_border {
    background-color:#1E825F;
    width:50%;
}
.feature .title_border {
    width: 0%;
    height: 3px;
    background:#1E825F;
    margin: 0 auto;
    margin-top: 12px;
    margin-bottom: 8px;
}



</style>


<template>
  <div>
  <br>

  <section id="content2" class="tab-content">
        <p>            
        <div class="container" id="features">

<div class="row">
          <div v-for=" serviceprovider in serviceproviders">


                <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}">
                <div class="col-md-4 feature">
                      <i class="glyphicon glyphicon-user"></i>
                        <h3>Name: {{serviceprovider.user_id.name}}</h3>
                        <div class="title_border"></div>
                        <p><h5 class="title"></h5>
            </p>
                        <p>Email: {{serviceprovider.user_id.email}} </p>
            <p class="info">Phone Number: {{serviceprovider.phone_number}}<br /> 
             Description: {{serviceprovider.description}} 
             

            </p>
          </div>
                </router-link>
                </div> 

</div>
</div>

</p>
</section>
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
      this.$http.get('http://localhost:3000/api/admins/sPs').then(response => {
        console.log(response.data)
        this.serviceproviders=response.data.data.users;
      })
    }}

}
</script>
