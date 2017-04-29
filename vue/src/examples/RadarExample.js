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
            // this.getRatings()
    },
    methods: {
        // getRatings: function() {
        //     this.$http.get('http://localhost:3000/api/students/progress', { headers: { 'jwt-token': localStorage.getItem('id_token') } }).then(response => {
        //         this.interests = response.data.data.interest
        //         this.ratings = response.data.data.userMap
        //         this.getReviewData()

        //     })
        // },

        getReviewData: function() {
            // // this.$http.get('http://localhost:3000/api/admins/reviewData', {headers : {'jwt-token' : localStorage.getItem('id_token')}}).then(response => {
            //   this.most="AHMED"
            //   this.least ="Kamal"
            //   // this.temp = respone.data.data.temp
            // //})
            let route = 'http://localhost:3000/api/students/student/'.concat(this.$route.params.Studid);
            this.studid = this.$route.params.Studid;
            this.$http.get(route, { headers: { 'jwt-token': localStorage.getItem('id_token') } }).then(response => {


                this.student = response.data.data.student;
                console.log(this.student);
                this.user = response.data.data.user;
                for (var i = 0; i < 5; i++) {
                    // this.temp.push(this.interests[i]);
                    // this.dataRatings.push(this.ratings[i]);
                    if (i === 1) {
                        console.log("ahmed");
                        this.temp.push("Ahmed");
                        console.log(this.temp)
                        this.dataRatings.push(3);
                        console.log(this.dataRatings)
                    } else {
                        console.log("kamal");
                        this.temp.push("Kamal");
                        this.dataRatings.push(10);
                    }
                }

                this.flag = true;
                this.render();

            })

        },
        render: function() {

            console.log(this.temp);

            console.log(this.dataRatings);



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
