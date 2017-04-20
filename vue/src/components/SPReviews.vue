<template>
  <div>

<ul>
  <li v-for =" review in reviews"> 
  {{review.reviewer_id.name}}<br/>
  {{review.rating}}<br/>
  {{review.content}}

   <div class="form-group">
            <label for="comment" class="col-sm-2 control-label">Add Comment</label>
            <div class="col-sm-10">
                <input type="text "class="form-control" id="comment" v-model="comment" />
            </div>
  </div>
  <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-10">
              <button class="btn btn-primary btn-sm"  v-on:click="addComment(review._id)"> Add</button>
            </div>
  </div>
  </li>
</ul>

  </div>
</template>
<script>
export default {
  name: 'SPReviews',
  data () {
    return {
      reviews:[],
      comment:'',
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
    addComment: function(review_id){
      this.$http.post('http://localhost:3000/api/users/comments/create', {"content":this.comment,"review_id":review_id}, {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(data => {
            console.log('success');
                    })
    }
    }

}
</script>
