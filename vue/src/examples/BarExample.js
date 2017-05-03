import BarChart from '../BaseCharts/Bar'

export default BarChart.extend({
  data() {
      return {
        most: {},
        least: {},
        temp: [],
        frequency: []
      }
    },
    created() {
      this.getReviewData()
        // this.getRatings()
    },
    methods: {
      getReviewData: function() {
        this.$http.get('http://localhost:3000/api/admins/reviewData', {
          headers: {
            'jwt-token': localStorage.getItem('id_token')
          }
        }).then(response => {
          this.most = response.data.data.most
          this.least = response.data.data.least
          for (var i = 0; i < response.data.data.frequency[0].length; i++) {
            this.temp.push(response.data.data.frequency[0][i])
            this.frequency.push(response.data.data.frequency[1][i])
          }

          this.render()
        })
      },

      render: function() {
        this.renderChart({
          labels: this.temp,
          datasets: [{
            label: 'Interests',
            backgroundColor: '#f87979',
            data: this.frequency
          }]
        }, {
          responsive: true,
          maintainAspectRatio: false
        })
      }
    }
})
