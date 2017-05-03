import RadarChart from '../BaseCharts/Radar'

export default
RadarChart.extend({

  data() {
      return {
        student: {},
        user: {},
        interests: [],
        temp: [],
        ratings: [],
        dataRatings: [],
        flag: false
      }
    },

    created() {
      this.getReviewData()

    },
    methods: {


      getReviewData: function() {

        let route = 'http://localhost:3000/api/students/progress';

        this.$http.get(route, {
          headers: {
            'jwt-token': localStorage.getItem('id_token')
          }
        }).then(response => {


          this.interests = response.data.data.interests;
          //console.log(response.data.data.userMap);
          this.ratings = response.data.data.userMap;
          if (this.interests) {
            for (var i = 0; i < this.interests.length; i++) {
              this.temp.push(this.interests[i].name);

              this.dataRatings.push(this.ratings[i]);

              // if (i === 1) {
            } //     console.log("ahmed");

          } else {
            this.temp.push("No Assessments")
            this.dataRatings.push(0)
          }


          this.render();

        })

      },
      render: function() {

        //    console.log(this.temp);

        //  console.log(this.dataRatings);



        this.renderChart({

          labels: this.temp,
          datasets: [{

            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: this.dataRatings

          }]
        }), {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }

})
