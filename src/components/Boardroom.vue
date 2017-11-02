<template>
    <div class="row form-login">
        <div class="col-xs-offset-1 col-sm-10 col-lg-10">
          <div class="panel panel-primary">
          <div class="panel-heading">
          <h3 class="panel-title">{{rooms}}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class=" col-xs-10 col-sm-10 col-md-10">
                <p class="alert-danger">{{error}}</p>
                <div class="input-group">
                  <div class="new-user">
                    <label>1. Booked for:</label>
                    <select v-model="editUser">
                      <option value="" class="default">Select User</option>
                      <option v-for="user in users" :value="user.id">{{user.login}}</option>
                    </select>
                  </div>
                </div>
                <div class="new-user">
                  <label>2. I would like to book this meeting</label>
                  <div class="input-group">
                    <select v-model="month" class=" col-md-4">
                      <option v-for="(month_name, index) in months" :value="index" :key="index">
                            {{month_name}}
                      </option>
                    </select>
                    <select v-model="day" class="col-md-3">
                      <option v-for="(day, index) in daysInMonth" :value="day" :key="index">
                          {{day}}
                      </option>
                    </select>
                    <select  v-model="year" class="col-md-5">
                      <option v-for="(numyear, index) in yearsCount" :value="numyear":key="index">
                        {{ numyear }}
                      </option>
                    </select>
                  </div>
                </div>

                  <div class="new-user">
                  <label> 3. Specify what the time and end of the meeting. (This will be what people see on the calendar.)</label>
                    <div class="col-md-10 col-md-offset-2" >
                    <div  class="col-md-2">
                        <select v-model="hour_start" class="form-control">
                            <option v-for="(hour_num, index) in hours_24" :value="hour_num" :key="index">
                                  {{hour_num}}
                            </option>
                        </select>
                    </div>
                    <div  class="col-md-2">
                      <select v-model="minute_start" class="form-control">
                        <option  value="0">00</option>
                        <option  value="30">30</option>
                      </select>
                    </div>
                    <div  class="col-md-1" style="text-align:center"> - </div>
                    <div  class="col-md-2">
                        <select v-model="hour_end" class="form-control">
                            <option v-for="(hour_num, index) in hours_24" :value="hour_num" :key="index">
                                  {{hour_num}}
                            </option>
                        </select>
                      </div>
                    <div  class="col-md-2">
                      <select v-model="minute_end" class="form-control">
                        <option  value="0">00</option>
                        <option  value="30">30</option>
                      </select>
                    </div>
                  </div>
                </div>
              
                <div class="new-user">
                  <label>4. Enter the specifics for the meeting. (This will be what people see when they click on an event link.)</label>
                  <div class="input-group">
                    <textarea class="form-control" v-model="description" rows="5" required autofocus></textarea>
                  </div>
                </div>
                <div class="new-user">
                <div class="form-group">
                  <label>5. Is this going to be a recurring event?</label>
                    <div class="radio">
                      <label>
                        <input type="radio" name="recur" id="recur1" value="1" v-model="is_recur" >yes
                        </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="recur" id="recur2" value="0" v-model="is_recur" >no
                      </label>
                    </div>
                  </div>   
                </div> 
                <div class="new-user">
                   <div class="form-group" v-if="is_recur == 1">
                      <label>6. If it is recurring, specify weekly, bi-weekly, or monthly.</label>
                      <div class="radio">
                        <label>
                          <input type="radio" name="recur_period" id="recurp1" value="weekly" v-model="recur_period" >weekly
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="recur_period" id="recurp2" value="bi-weekly" v-model="recur_period" >bi-weekly
                        </label>
                      </div>
                      <div class="radio">
                        <label>
                          <input type="radio" name="recur_period" id="recurp3" value="monthly" v-model="recur_period" >monthly
                        </label>
                      </div>
                    
                      <label> If weekly or bi-weekly, specify the number of weeks for it to keep recurring. 
                        If monthly, specify the number of months. (If you choose "bi-weekly" and put in an odd number of weeks,
                        the computer will round down.)</label>
                        
                        <div class="row">
                          <div  class="col-sm-1 col-md-1"> 
                            <input class="form-control num_only" v-model="duration"
                                 />
                          
                            <label v-if="recur_period=='weekly'">duration(max 4 weeks)</label>
                            <label v-if="recur_period=='bi-weekly'">duration(max 2 weeks)</label>
                            <label v-if="recur_period=='monthly'">duration(max 1 month)</label>
                            </div>
                        </div>
                  </div>   
                </div> 

              </div>
              
            </div>
            <div class="panel-footer">
              <button type="button" class="btn btn-labeled btn-success" v-on:click="addEvent()">
              <span class="btn-label"><i class="glyphicon glyphicon-ok"></i></span>Enter</button>
          </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
     beforeRouteUpdate(to, from, next) {
        this.getRoom(to.params.id)
        next()
    },
     data() {
    return {
      duration: 1,
      recur_period: '',
      is_recur: 1,
      minute_end: '',
      hour_start: '',
      minute_start:'',
      hour_end:'',
      hours_24: [8,9,10,11,12,13,14,15,16,17,18,19],
      hours_am: [8,9,10,11],
      hours_pm: [12,1,2,3,4,5,6,7],
      year: '',
      inst_date: new Date(),
      month: '',
      day: '',
      description: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
              'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
              ],
      yearsCount: [2017,2018,2019,2020],
      users: '',
      editUser: '',
      rooms: '',
      roomid: '',
      error: '',
    };
  },
  methods: {
     getUser: function() {
        var self = this;
        axios
          .get(getUrl()+'user/',self.config )
          .then(function(response) {
            if (response.data !== false) {
              self.users = response.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
     },
      getRoom: function(id) {
        var self = this;
        axios
          .get(getUrl()+'Room/' + id +'/',self.config )
          .then(function(response) {
            if (response.status == 200) {
                self.rooms = response.data.name;
                self.roomid = response.data.id;
          } else {
            self.errors = response.data;
          }
          })
          .catch(function(error) {
            self.errors = error 
          });
     
    },
  },
    computed: {
       daysInMonth: function() {
      var self = this
      var days = []
      var countD = new Date(self.year, self.month+1, 0).getDate();
     for(var i=0 ; i < countD ; i++) {
          days.push(i+1)
      }
       return days
      console.log(days)
    },
    recurring: function(){
      var self = this
      if(self.is_recur=='1')
      {
        self.is_recur = 1
      }
      else
      {
        self.is_recur = 0
      } 
      
    }
  },
  created() {
       this.getUser()
       this.getRoom(this.$route.params.id)
  }
  
  
}
</script>
<style scoped>
.new-user {
    font: 1.3em sans-serif;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom:20px;
}
.new-user p {
  text-align: left;
}


</style>
