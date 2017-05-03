<style scoped>
#content10 {
    width: 400px;
    margin: 0 auto;
    background-color: #f7f7f7;

}

/* General button style (reset) */
.button {
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: #F25C27;
    cursor: pointer;
    padding: 25px 80px;
    display: inline-block;
    margin: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.button:after {
    content: '';
    position: relative;;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
/* Button 1 */
.button-1 {
    border: 3px solid #fff;
    color: #fff;
}
/* Button 1a */
.button-1a:hover,
.button-1a:active {
    color: #0e83cd;
    background: #fff;
}
/* Button 1b */
.button-1b:after {
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    background: #fff;
}
.button-1b:hover,
.button-1b:active {
    color: #0e83cd;
}
.button-1b:hover:after,
.button-1b:active:after {
    height: 100%;
}
/* Button 1c */
.button-1c:after {
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
}
.button-1c:hover,
.button-1c:active {
    color: #0e83cd;
}
.button-1c:hover:after,
.button-1c:active:after {
    width: 100%;
}
/* Button 1d */
.button-1d {
    overflow: hidden;
}
.button-1d:after {
    width: 0;
    height: 103%;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.button-1d:hover,
.button-1d:active {
    color: #0e83cd;
}
.button-1d:hover:after {
    width: 104%;
    opacity: 1;
}
.button-1d:active:after {
    width: 101%;
    opacity: 1;
}
/* Button 1e */
.button-1e {
    overflow: hidden;
}
.button-1e:after {
    width: 100%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -moz-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -ms-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
}
.button-1e:hover,
.button-1e:active {
    color: #0e83cd;
}
.button-1e:hover:after {
    height: 335%;
    opacity: 1;
}
.button-1e:active:after {
    height: 400%;
    opacity: 1;
}
/* Button 1f */
.button-1f {
    overflow: visible;
}
.button-1f:after {
    width: 101%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.button-1f:hover,
.button-1f:active {
    color: #0e83cd;
}
.button-1f:hover:after {
    height: 104%;
    opacity: 1;
}
.button-1f:active:after {
    height: 130%;
    opacity: 1;
}
/* Button 2 */
.button-2 {
    background: #cb4e4e;
    color: #fff;
    -webkit-box-shadow: 0 4px #ab3c3c;
    -moz-box-shadow: 0 4px #ab3c3c;
    box-shadow: 0 4px #ab3c3c;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
}

#myInput		{
  position: relative;
  left:10px;
  top: 50px;

  width:20%;
  -webkit-transition:width 0.3s ease-in-out;

}
#myInput:focus	{
  position: relative;
  left:10px;

  top: 50px;
  width:90%;

  -webkit-transition:width 0.5s ease-in-out;
}

#myInput1{
  display: inline-block;
  width:90%;
  -webkit-transition:width 0.3s ease-in-out;

}


@import "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";
.box > .icon {
    text-align:
    center;
    position:
    relative;
    }
.box > .icon > .image {
    position: relative;
    z-index: 2;
    margin: auto;
    width: 88px;
    height: 88px;
    border: 8px solid white;
    line-height: 88px;
    border-radius: 50%;
    background: #f0f0f0;
    vertical-align: middle;
    }
.box > .icon > .image > i {
    font-size: 36px !important;
    color: #fff !important;
    }
.box > .icon:hover > .image > i {
    color: white !important;
    }
.box > .icon > .info {
    margin-top: -24px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid #e0e0e0;
    padding: 15px 0 10px 0;
    }
.box > .icon > .info > h3.title {
    font-family: sans-serif !important;
    font-size: 16px;
    color: #222;
    font-weight: 500;
    }
.box > .icon > .info > p {
    font-family: sans-serif !important;
    font-size: 13px;
    color: #666;
    line-height: 1.5em;
    margin: 20px;
    }
.box > .icon:hover > .info > h3.title, .box > .icon:hover > .info > p, .box > .icon:hover > .info > .more > a {
    color: #222;
    }
.box > .icon > .info > .more a {
    font-family: sans-serif !important;
    font-size: 12px;
    color: #222;
    line-height: 12px;
    text-transform: uppercase;
    text-decoration: none;
    }
.box > .icon:hover > .info > .more > a {
    color: #fff;
    padding: 6px 8px;
    background-color: #63B76C;
    }
.box .space {
    height: 30px;
    }

.modal-header-primary {
    color:#fff;
    padding:9px 15px;
    border-bottom:1px solid #eee;
    background-color: #2a3f54;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
}



</style>
<template>
  <div>

      <h1 align="center"style="color:#52d3aa" >Reviews</h1>
          <p align="center"><div align="center"class="container">



                          <div v-for =" r in reviews">

            <center>


                          <div class="container"  id="content10">

                  <div  class="row">
                    <div class="col-md-3 col-xs-6">
            <center>
                      <div class="container" id="content10">
                    <div class="icon">
                      <div class="image"></div>
                      <div class="info">
                        <h3 class="title" style="color:#52d3aa">By: {{r.reviewer_id.name}}</h3>
                          <h2 class="title"><p>   <div  id="makan3" >
                       <star-rating :rating="r.rating" v-bind:show-rating="false" v-bind:read-only="true"   v-bind:inline="true">
            </star-rating>
            </div>
                        </p>
                        <p class="info">{{r.content}}
                      </p></h2>
                        <button class="btn btn-primary btn-sm" @click="viewComments(r._id)"href="#primary" data-toggle="modal">Comments</button>





                        </div>
                      </div>
                    </div>
                    </center>

                  </div>

                  </div>		</div> </center></div>

    <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-lg-4">
    <div>
      <div class="icon">

  <div class="modal fade" id="primary" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header modal-header-primary">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4   align="left">  <div v-for="comment in pastComments">
                    <center>       {{comment.commenter_id.name}}:</center>

                      <center>    <h3 style="color:#52d3aa">{{comment.content}}</h3></center>
                        <br>
                    </div></h4>

              </div>
              <form role="form" class="" @submit.prevent='addComment'>


              <div class="modal-body">
                <div class="row">

              <input style="height:30px;font-size:16px; display:inline-block;"class="form-control input-lg" id="myInput1" placeholder="Write a comment" type="text"v-model="comment" required="*">


              </div>
                     </div>

              <div class="modal-footer">


                  <button class="btn btn-primary add_field_button" style="margin-bottom:20px;" type="submit">Post comment</button>

                               </div>
                               </form>
          </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
        </div>
      </div>
    </div>
  </div>
  <!-- /Boxes de Acoes -->
</div>


</div></p>
  </div>
</template>
<script>
export default {
  name: 'SPReviews',
  data ()  {
    return {
      reviews:[],
      comment:'',
      pastComments:[],
      reviewid:''

    }
  },
created(){
  this.getReviews()
},
methods:{
    getReviews: function () {
      this.$http.get('http://localhost:3000/api/sPs/reviews/view', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.reviews=response.data.data.reviews
      })
    },
    viewComments: function (review_id) {
      this.$http.post('http://localhost:3000/api/users/comments/view',{"review_id":review_id}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
        this.reviewid=review_id;
        ////console.log(this.reviewid);
        this.pastComments =response.data.data.comments;
          })
    },
    addComment: function(){
      this.$http.post('http://localhost:3000/api/users/comments/create', {"content":this.comment,"review_id":this.reviewid}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
        swal("Success","Comment Added",'success');
            //console.log('success');
           this.viewComments(this.reviewid);
           this.comment =''

                    });
    }
    }
    }

</script>
