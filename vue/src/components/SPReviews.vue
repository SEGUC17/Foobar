<template>
  <div>

    <div v-for ="n in reviews.length" class="row-2">
      <div class="container thumbnail" align="left">
        <h3>{{reviews[n-1].reviewer_id.name}}</h3><br/>
        <strong>Rating: {{reviews[n-1].rating}}</strong><br/><br/>
        <p>Content: {{reviews[n-1].content}} </p>

        {{viewComments(reviews[n-1]._id)}}

        <div v-for="comment in pastComments">
          <div class="thumbnail">
            <strong>{{comment.commenter_id.name}} </strong> {{comment.content}}
          </div>
        </div>


        <div class="form-group">
          <div class="col-sm-10">
              <input type="text "class="form-control" id="comment" v-model="comment[n-1]" />
              <button class="btn btn-primary btn-sm"  v-on:click="addComment(reviews[n-1]._id, n-1)"> Add Comment</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'SPReviews',
  data ()  {
    return {
      reviews:[],
      comment:[],
      pastComments:[],
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
      return  this.pastComments =response.data.data.comments
      })
    },
    addComment: function(review_id, index){
      this.$http.post('http://localhost:3000/api/users/comments/create', {"content":this.comment[index],"review_id":review_id}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
            this.comment[index]='';
           this.viewComments(review_id);
                    });
    }
    }
}
</script>
