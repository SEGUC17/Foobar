<style scoped>
/* ----------------------------
 * Callouts
 * ----------------------------
 */

.callout-light {
    padding: 40px;
	color: #000;
	background-color: #172d44;
  border-left: 10px solid #1abb9c;

}

.callout-light h1,
h2,
h3,
h4 {
  color:#ecf0f1;
	font-weight: 300;
	line-height: 1.4;
}

.callout-dark {
	padding: 30px;
	color: #fff;
	background-color: #353535;
  border-left: 10px solid #1abb9c;

}
.callout-dark h1{
  color: #ecf0f1;
  font-weight: 300;
  line-height: 1.4;
}
.callout-dark
h2,
h3,
h4 {
	font-weight: 300;
	line-height: 1.4;
}

.callout-dark p {
	color: #ecf0f1;
	font-size: 17px;
}

.callout-mage {
	padding: 30px;
	background-color: #743C58;
	color: #fff;
}

.callout-bubble {
	padding: 30px;
	color: #fff;
	background-color: #A94545;
}

.callout-bubble h1,
h2,
h3,
h4 {
	font-weight: 300;
	line-height: 1.4;
}

.callout-block {
	background-color: #F5F3F4;
	border-left: 5px solid #a94545;
	border-right: 5px solid #a94545;
	padding: 15px;
}

.callout-block h1,
.callout-block h2,
.callout-block h3,
.callout-block h4 {
	font-weight: 300;
	line-height: 1.4;
}
</style>


<template>
  <div>


  <div class="container" align="center">
    <div v-for =" announcement in announcementsInPage" class="row-2">
    <br/>


              <div class="row">
            				<div class="callout-dark text-center fade-in-b" v-show="announcement.announcer_id.type===1">
            					<h4>{{announcement.title}} - <b> Admin </b> </h4>
            					<h1>{{announcement.content}}.</h1>
            				</div>
            			</div>

                  <div class="row"  v-show="announcement.announcer_id.type===3">
                    <div class="callout-light text-center fade-in-b">
                      <h4>{{announcement.title}} - <b> {{announcement.announcer_id.name}} </b>  </h4>
                      <h1>{{announcement.content}}.</h1>
                    </div>
                  </div>
</div>

</div>

  <center>
        <ul class="pagination">
          <li v-for="n in numberOfPages"><a @click="changePage(n)">{{n}}</a></li>
        </ul>
        </center>



  </div>
</template>
<script>
export default {
  name: 'announcements',
  data () {
    return {
      announcements:[],
      announcementsInPage:[],
      numberOfPages: 0,
      perPage: 5

    }
  },
mounted(){
  this.getAllAnnouncements()
},
methods:{
    getAllAnnouncements: function () {
      this.$http.get('http://localhost:3000/api/announcements/view',{"token": localStorage.getItem('id_token')}).then(response => {
        this.announcements=response.data.data.announcements

        this.numberOfPages=Math.ceil(this.announcements.length/this.perPage);
        for(var i = 0 ; i<this.perPage && i<this.announcements.length ; i++){
          this.announcementsInPage.push(this.announcements[i]);
        }
      })
    },
    changePage: function(number){
      var firstPost = (number*this.perPage)-this.perPage
      var lastPost = number * this.perPage
      this.announcementsInPage = []
      for(var i = firstPost ; i<lastPost && i<this.announcements.length ; i++){
        this.announcementsInPage.push(this.announcements[i]);
      }
    }
  }
}
</script>
