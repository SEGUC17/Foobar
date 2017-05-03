<template>
<div class="tab_container">
  <center>


      <h3>{{ quiz.title }}</h3>
  </center>
      <div class="callout">

        <div v-for="(question, index) in quiz.questions">
          <!-- Hide all questions, show only the one with index === to current question index -->
          <div v-show="index === questionIndex">
            <h3>{{ question.text }}</h3>
            <ol>
              <!-- for each response of the current question -->
              <li v-for="response in question.responses">
                <label>
								    <input type="radio" v-bind:value="response.value" v-bind:name="index" v-model="userResponses[index]"> {{response.text}}
								  </label>
              </li>

            </ol>
            <!-- The two navigation buttons -->
            <!-- Note: prev is hidden on first question -->
            <center><button  class="btn btn-primary btn-sm" v-if="questionIndex > 0" v-on:click="prev">
			        prev
			      </button>&nbsp;&nbsp;&nbsp;
            <button v-if="userResponses[questionIndex]==null" class="btn btn-primary btn-sm" v-on:click="next" disabled="">			        next
</button>

            <button v-if="userResponses[questionIndex]!=null" class="btn btn-primary btn-sm" v-on:click="next">
			        next
			      </button></center>
          </div>
        </div>

        <!-- Last page, quiz is finished, display result -->
        <div v-show="questionIndex === quiz.questions.length">

        <br/><br/>
        <h3 align="center">We suggest you the following interests ratios</h3>
        <br/><br/>

      </div>
          <div v-show="questionIndex === quiz.questions.length">
     <pie-chart :data="score()"></pie-chart></div>
</div>
</div>

    </div>


</template>
<script>
export default{
data(){
  return{
    quiz : {
          title: 'who are you?!',

          questions: [{
                  text: "You often get so lost in thoughts that you ignore or forget your surroundings.",
                  responses: [{
                          text: 'Agree',
                          value: 'Music'
                      },
                      {
                          text: 'Neutral',
                          value: 'Arts'
                      },
                      {
                          text: 'Disagree',
                          value: 'Leading'
                      }
                  ]
              },
              {
                  text: "You rarely do something just out of sheer curiosity.",
                  responses: [{
                          text: 'Agree',
                          value: 'Sports'
                      },
                      {
                          text: 'Neutral',
                          value: 'Music'
                      },
                      {
                          text: 'Disagree',
                          value: 'Cooking'
                      }
                  ]
              },
              {
                  text: "You are usually highly motivated and energetic",
                  responses: [{
                          text: 'Agree',
                          value: 'Sports'
                      },
                      {
                          text: 'Neutral',
                          value: 'Cultural'
                      },
                      {
                          text: 'Disagree',
                          value: 'Technology'
                      }
                  ]
              },
              {
                  text: "You do not mind being at the center of attention.",
                  responses: [{
                          text: 'Agree',
                          value: 'Leading'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Arts'
                      }
                  ]
              },
              {
                  text: "You consider yourself more practical than creative.",
                  responses: [{
                          text: 'Agree',
                          value: 'Technology'
                      },
                      {
                          text: 'Neutral',
                          value: 'Cooking'
                      },
                      {
                          text: 'Disagree',
                          value: 'Arts'
                      }
                  ]
              },{
                  text: "People can rarely upset you.",
                  responses: [{
                          text: 'Agree',
                          value: 'Cultural'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Music'
                      }
                  ]
              },{
                  text: "Your mood can change very quickly.",
                  responses: [{
                          text: 'Agree',
                          value: 'Music'
                      },
                      {
                          text: 'Neutral',
                          value: 'Cultural'
                      },
                      {
                          text: 'Disagree',
                          value: 'Leading'
                      }
                  ]
              },{
                  text: "Your work style is closer to random energy spikes than to a methodical and organized approach.",
                  responses: [{
                          text: 'Agree',
                          value: 'Arts'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Education'
                      }
                  ]
              },{
                  text: "An interesting book or a video game is often better than a social event.",
                  responses: [{
                          text: 'Agree',
                          value: 'Technology'
                      },
                      {
                          text: 'Neutral',
                          value: 'Education'
                      },
                      {
                          text: 'Disagree',
                          value: 'Cultural'
                      }
                  ]
              },{
                  text: "As a parent, you would rather see your child grow up kind than smart.",
                  responses: [{
                          text: 'Agree',
                          value: 'Cultural'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Education'
                      }
                  ]
              },{
                  text: "You do not let other people influence your actions.",
                  responses: [{
                          text: 'Agree',
                          value: 'Leading'
                      },
                      {
                          text: 'Neutral',
                          value: 'Technology'
                      },
                      {
                          text: 'Disagree',
                          value: 'Cooking'
                      }
                  ]
              },{
                  text: "You enjoy going to social events that involve dress-up or role-play activities.",
                  responses: [{
                          text: 'Agree',
                          value: 'Cultural'
                      },
                      {
                          text: 'Neutral',
                          value: 'Arts'
                      },
                      {
                          text: 'Disagree',
                          value: 'Music'
                      }
                  ]
              },{
                  text: "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
                  responses: [{
                          text: 'Agree',
                          value: 'Technology'
                      },
                      {
                          text: 'Neutral',
                          value: 'Arts'
                      },
                      {
                          text: 'Disagree',
                          value: 'Sports'
                      }
                  ]
              },{
                  text: "Keeping your options open is more important than having a to-do list.",
                  responses: [{
                          text: 'Agree',
                          value: 'Education'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Leading'
                      }
                  ]
              },{
                  text: "You feel more energetic after spending time with a group of people.",
                  responses: [{
                          text: 'Agree',
                          value: 'Cultural'
                      },
                      {
                          text: 'Neutral',
                          value: 'Sports'
                      },
                      {
                          text: 'Disagree',
                          value: 'Cooking'
                      }
                  ]
              },{
                  text: "You often take initiative in social situations.",
                  responses: [{
                          text: 'Agree',
                          value: 'Cultural'
                      },
                      {
                          text: 'Neutral',
                          value: 'Leading'
                      },
                      {
                          text: 'Disagree',
                          value: 'Music'
                      }
                  ]
              },
                  ]
              },

    questionIndex: 0,
    userResponses: Array()
  }
},

methods: {
            // Go to next question
            next: function() {
                this.questionIndex++;
                console.log(this.userResponses);
            },
            // Go to previous question
            prev: function() {
                this.questionIndex--;
            },
             score: function() {
                //find the highest occurence in responses
                // this.count(this.userResponses)
                var modeMap = [];
                var frequency = [];
                var temp = this.unique(this.userResponses);
                var maxEl = this.userResponses[0],
                    maxCount = 1;
                for(var j =0; j<temp.length;j++){
                  maxCount = 1;
                for (var i = 1; i < this.userResponses.length; i++) {

                    if(temp[j]===this.userResponses[i]){
                      maxCount++
                    }
                  }
                  frequency.push(maxCount);
                }

                for(var i =0; i<temp.length;i++){

                  modeMap.push([temp[i],frequency[i]])

                }

                    console.log(modeMap);

                    // if (modeMap[el] == null)
                    //     modeMap[el] = 1;
                    // else
                    //     modeMap[el]++;
                    // if (modeMap[el] > maxCount) {
                    //     maxEl = el;
                    //     maxCount = modeMap[el];
                    // }

                return modeMap;
            },
            unique: function(array) {
              var n = [];
          for(var i = 0; i < array.length; i++)
          {

         if (n.indexOf(array[i]) == -1) n.push(array[i]);

          }
             return n;
            }
}
}

</script>
