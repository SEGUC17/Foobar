<template>
  <div>

<ul>
  <li v-for =" review in reviews"> 
  {{review.reviewer_id}}<br/>
  {{review.rating}}<br/>
  {{review.content}}
  </li>
</ul>

  </div>
</template>
<script>
export default {
  name: 'SPReviews',
  data () {
    return {
      reviews:[]
    }
  },
created(){
  this.getReviews()
},
methods:{
    getReviews: function () {
      this.$http.get('http://localhost:3000/api/sPs/reviews/view').then(response => {

        this.reviews=response.data.data.reviews
      })
    }}

}
</script>
