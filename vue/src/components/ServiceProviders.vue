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

  <div class="page-title">
              <div class="title_left">
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="srch"  placeholder="Search for SPs...">
                    <span class="input-group-btn">
                      <button class="btn btn-default" v-on:click="search">Go!</button>
                    </span>
                  </div>
                </div>
              </div>
    </div>
    <br/><br/>
  <section id="content2" class="tab-content">
        <p>
        <div class="container" id="features">

<div class="row">
          <div v-for=" serviceprovider in serviceproviders">

<div  v-if="!serviceprovider.user_id.is_deleted">


                <router-link :to = "{ name: 'service provider' , params: { id: serviceprovider._id }}">
                <div class="col-md-4 feature">

                    <center><img class="img-circle img-responsive" v-if="serviceprovider.user_id && serviceprovider.user_id.profileimg.path" :src="'http://localhost:3000/'+serviceprovider.user_id.profileimg.path.replace('public','')" style="height:150px; width:150px">
                    <i class="glyphicon glyphicon-user" style="height:150px; width:150px" v-else></i></center>
                        <h3>Name: {{serviceprovider.user_id.name}}</h3>
                        <div class="title_border"></div>
                        <p><h5 class="title"></h5>
            </p>
                        <p>Email: {{serviceprovider.user_id.email}} </p>
            <p class="info">Phone Number: {{serviceprovider.phone_number}}<br />
             Description: {{serviceprovider.description.substring(0, 30)}}<span v-if="serviceprovider.description.length>30">...</span>


            </p>
          </div>
                </router-link>
                </div>
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
      serviceproviders:[],
      srch:'',
      serviceprovidersInPage:[],
      numberOfPages: 0,
    }
  },
created(){
  this.getAllServiceProviders()
},
methods:{
        getAllServiceProviders: function () {
        this.$http.get('http://localhost:3000/api/admins/sPs').then(response => {
            //console.log(response.data)
            this.serviceproviders=response.data.data.users;
        })
        },
        search: function(){
            this.$http.post('http://localhost:3000/api/students/searchSPs',{"search":this.srch},{headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response=> {
            this.serviceproviders = response.body.data.sps
            this.reload()
        })
        },
        reload: function(){
            this.serviceprovidersInPage = []
            this.numberOfPages = 0
            if (this.serviceproviders.length >0){
            this.numberOfPages=Math.ceil(this.serviceproviders.length/this.perPage);
            for(var i = 0 ; i<this.perPage && i<this.serviceproviders.length ; i++){
                //console.log('ana hena')
                this.serviceprovidersInPage.push(this.serviceproviders[i]);
            }
            } else{
            swal("Oops..",'no results','warning')
            }

        }


    }

}
</script>
