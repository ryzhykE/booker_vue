<template>
  <div class="reservation">
   <form>
     <div class="form-group">
       <label>1. Booked for</label>
        <div class = "row">
          <div  class="col-sm-3 col-md-3">
            <select v-model="user_id" class="form-control">
              <option value="">select user</option>
              <option v-for="user in users" :value="user.id" :key="user.id">
                    {{user.fullname}}
              </option>
            </select>
          </div>
          <div  class="col-sm-9 col-md-9"></div>
        </div>
        </div>
        <div class="form-group">
          <label>2. I would like to book this meeting:</label>
          <div class = "row">
             <div  class="col-sm-2 col-md-2">
                <select v-model="month" class="form-control">
                    <option v-for="(month_name, index) in monthes" :value="index" :key="index">
                          {{month_name}}
                    </option>
                </select>
              </div>
            <div  class="col-sm-1 col-md-1">
              <select v-model="day" class="form-control">
                <option v-for="(day_num, index) in days" :value="day_num" :key="index">
                    {{day_num}}
                </option>
              </select>
            </div>
          <div  class="col-sm-2 col-md-2">
            <select v-model="year" class="form-control">
              <option v-for="(year_num,index) in years" :value="year_num" :key="index">
                    {{year_num}}
              </option>
            </select>
          </div>
           <div  class="col-sm-7 col-md-7"></div>
          </div>
        </div>

        <div class="form-group">
          <label>3. Specify what the time and end  of the meeting (This will be what people see on the calendar.):</label>
          <!--if 24 hour time format -->
          <div class = "row" v-if="f24==true">
             <div  class="col-sm-1 col-md-1">
                <select v-model="hour_start" class="form-control">
                    <option v-for="(hour_num, index) in hours_24" :value="hour_num" :key="index">
                          {{hour_num}}
                    </option>
                </select>
              </div>
            <div  class="col-sm-1 col-md-1">
              <select v-model="minute_start" class="form-control">
                <option  value="0">00</option>
                <option  value="30">30</option>
              </select>
            </div>
           <div  class="col-sm-1 col-md-1" style="text-align:center"> - </div>
             <div  class="col-sm-1 col-md-1">
                <select v-model="hour_end" class="form-control">
                    <option v-for="(hour_num, index) in hours_24" :value="hour_num" :key="index">
                          {{hour_num}}
                    </option>
                </select>
              </div>
            <div  class="col-sm-1 col-md-1">
              <select v-model="minute_end" class="form-control">
                <option  value="0">00</option>
                <option  value="30">30</option>
              </select>
            </div>
            <div  class="col-sm-7 col-md-7"></div>
        </div>
        <!--if 12 hour time format -->
         <div class = "row" v-if="f12==true">
             <div  class="col-sm-1 col-md-1">
                <select v-model="hour_start" class="form-control">
                    <option v-for="hour_num in hours_12_start" :value="hour_num" :key="hour_num">
                          {{hour_num}}
                    </option>
                </select>
              </div>
            <div  class="col-sm-1 col-md-1">
              <select v-model="minute_start" class="form-control">
                <option  value="0" >00</option>
                <option  value="30">30</option>
              </select>
            </div>
             <div  class="col-sm-1 col-md-1">
              <select v-model="day_part_start" class="form-control">
                <option  value="am">AM</option>
                <option  value="pm">PM</option>
              </select>
            </div>
           <div  class="col-sm-1 col-md-1" style="text-align:center"> - </div>
             <div  class="col-sm-1 col-md-1">
                <select v-model="hour_end" class="form-control">
                    <option v-for="hour_num in hours_12_end" :value="hour_num" :key="hour_num">
                          {{hour_num}}
                    </option>
                </select>
              </div>
            <div  class="col-sm-1 col-md-1">
              <select v-model="minute_end" class="form-control">
                <option  value="0">00</option>
                <option  value="30">30</option>
              </select>
            </div>
             <div  class="col-sm-1 col-md-1">
              <select v-model="day_part_end" class="form-control">
                <option  value="am">AM</option>
                <option  value="pm">PM</option>
              </select>
            </div>
            <div  class="col-sm-5 col-md-5"></div>
        </div>
      </div>

      <div class="form-group">
          <label>4.Enter the specifics for the meeting.(This will be what people see when they click on an event link.)</label>
          <div class="row">
            <div  class="col-sm-5 col-md-5">
              <textarea class="form-control" v-model="description" rows="5"></textarea>
            </div>
            <div  class="col-sm-7 col-md-7"></div>
          </div>
      </div> 

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

      <div class="form-group" v-if="is_recurive_event==true">
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
                       @keydown="durationCheck" 
                       oninput="if(this.value>10) this.value = this.value%10  "/>
              </div>
              <div  class="col-sm-2 col-md-2"> 
                <label v-if="recur_period=='weekly'">duration(max 4 weeks)</label>
                <label v-if="recur_period=='bi-weekly'">duration(max 2 weeks)</label>
                <label v-if="recur_period=='monthly'">duration(max 1 month)</label>
              </div>
            <div  class="col-sm-9 col-md-9"> </div>
            </div>
      </div>   

      <button class="btn btn-auth" @click="add_event">Submit</button> 
      <button class="btn btn-auth" @click="cancel" type="cancel">Cancel</button>

   </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'reservation',
  props: ['hour_format'],
  data () {
    return {
      users: [],
      user_id: "",
      hours_24: [8,9,10,11,12,13,14,15,16,17,18,19],
      hours_am: [8,9,10,11],
      hours_pm: [12,1,2,3,4,5,6,7],//12.00 = 12pm
      monthes : ["January", "February",
                 "March", "April", 
                 "May", "June", 
                 "July", "August", 
                 "September","October",
                 "November","Desember"],
      years: [],
      year: 0,
      month: 0,
      day: 0,
      hour_start: 0,
      minute_start: 0,
      hour_end: 0,
      minute_end: 0,
      day_part_start: "am",
      day_part_end: "am",
      description: "",
      is_recur: 1,
      recur_period: "weekly",
      duration: 1
    }
  },
  created(){
    this. getUsers()
    var now = new Date(); 
    var y = now.getFullYear()
    this.years = [y,y+1]
    this.year = y
    this.month = now.getMonth()
    this.day = now.getDate();
  },
  methods:{
     getUsers(){
      var self = this
      axios.get(serverUrl+'BOOKER/client/api/user/', this.config)
            .then(function (response) {
                self.users = response.data.data
                console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    durationCheck: function(event){
          if(this.recur_period == "weekly" && (event.keyCode < 49 || event.keyCode > 52) 
                                           && (event.keyCode < 97 || event.keyCode > 100) )
          {
            event.preventDefault();
          }else if(this.recur_period == "bi-weekly" && (event.keyCode < 49 || event.keyCode > 50) 
                                                    && (event.keyCode < 97 || event.keyCode > 98))
          {
             event.preventDefault();
          }else if(this.recur_period == "monthly" && (event.keyCode != 49))
          {
             event.preventDefault();
          }
    },
    add_event(){
    },
    cancel(){
    }
  },
  computed:{
    days: function(){
      var daysInCurrentMonth = 32- new Date(this.year,this.month , 32).getDate(); 
      var days_temp = []
      for(var i = 1; i <= daysInCurrentMonth; i++){
        days_temp.push(i)
      }
      return days_temp
    },
    hours_12_end: function(){
      if(this.day_part_end=="am") return this.hours_am
      else return this.hours_pm
    },
    hours_12_start: function(){
      if(this.day_part_start=="am") return this.hours_am
      else return this.hours_pm
    },
    f12: function(){
      if(this.hour_format == 'h12') return true
      return false
    },
    f24: function(){
      if(this.hour_format == 'h24') return true
      return false
    },
    is_recurive_event: function(){
      if(this.is_recur=='1') return true
      return false
    }
  }
}
</script>















<template>
  <div class="row col-md-12 justify-content-md-center">
    <div class="row col-md-5">
      <div class="col-md-12">
        <h3> Boardroom booker: {{ getRoomName }} </h3>
        <div v-if="errorMsg" class="alert alert-danger">
          <strong>{{errorMsg}}</strong>
          <button @click="errorMsg = ''" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div v-if="user.admin == 1" class="form-group">
            <label>1. Booked for:</label>
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group col-md-5" role="group">
                <select class="form-control" v-model="selectedUserId">
                  <option v-for="(user, key) in adminData.allUsers" :key="key" :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="user.admin == 0" class="form-group">
            <label>1. Booked for: <strong> {{ getUserName }} </strong></label>
          </div>
          
          <!-- Dropdowns date -->
          <div class="form-group">
            <label>2. I wood like to book this meeting:</label>
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group col-md-7" role="group">
                <select @change="createDateOptions()" class="form-control mr-2" v-model="month">
                  <option v-for="(num, key) in monthCount" :key="key" :value="key">
                    {{ num }}
                  </option>
                </select>

                <select class="form-control mr-2" v-model="day">
                  <option v-for="(num, key) in daysCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select>

                <select class="form-control mr-2" v-model="year">
                  <option v-for="(num, key) in yearsCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Dropdowns start time -->
          <div class="form-group">
            <label>3. Specify what the time start and end of the meeting (This will be what people see on the calendar.)</label>
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group col-md-3" role="group">
                <select class="form-control mr-2" v-model="eventTime.startHour">
                  <option v-for="(num, key) in hoursCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select>

                <select class="form-control mr-2" v-model="eventTime.startMinutes">
                  <option :value="0">00</option>
                  <option :value="30">30</option>
                </select>

                <!-- <select class="form-control mr-2" v-model="year">
                  <option v-for="(num, key) in yearsCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select> -->
              </div>
            </div>
          </div>

          <!-- Dropdowns end time -->
          <div class="form-group">
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group  col-md-3" role="group">
                <select class="form-control mr-2" v-model="eventTime.endHour">
                  <option v-for="(num, key) in hoursCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select>

                <select class="form-control mr-2" v-model="eventTime.endMinutes">
                  <option :value="0">00</option>
                  <option :value="30">30</option>
                </select>

                <!-- <select class="form-control mr-2" v-model="year">
                  <option v-for="(num, key) in yearsCount" :key="key" :value="num">
                    {{ num }}
                  </option>
                </select> -->
              </div>
            </div>
          </div>

          <!-- Desc area -->
          <div class="form-group">
            <label>4. Enter the specifics for the meeting. (This will be what people see when they click on an event link.)</label>
            <textarea class="form-control" rows="4" v-model="description"></textarea>
            <small v-if="!validDescription" class="form-text text-muted">Enter a description of the event (3-100 chars)</small>
            <small v-if="validDescription" class="form-text text-success"><strong>Сorrectly!</strong></small>
          </div>

          <!-- Reacurring event -->
          <div class="form-group">
            <label>5. Is this going to be a reacurring event?</label>
            <div class="custom-controls-stacked">
              <label class="custom-control custom-radio">
                <input @click="recurringType = recurringDuration = ''" type="radio" class="custom-control-input" :value="false" v-model="recurringEvent">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description font-weight-bold">No</span>
              </label>
              <label class="custom-control custom-radio">
                <input @click="recurringType = recurringDuration = ''" type="radio" class="custom-control-input" :value="true" v-model="recurringEvent">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description font-weight-bold">Yes</span>
              </label>
            </div>
          </div>

          <!-- Reacurring options -->
          <div v-if="recurringEvent" class="form-group ">
            <label>6. If it is recurring, specify weekly, be-weekly, or monthly.</label>
            <div class="custom-controls-stacked">
              <label class="custom-control custom-radio">
                <input @click="recurringDuration = ''" type="radio" class="custom-control-input" value="Weekly" v-model="recurringType">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description font-weight-bold">Weekly</span>
              </label>
              <label class="custom-control custom-radio">
                <input @click="recurringDuration = ''" type="radio" class="custom-control-input" value="Bi-weekly" v-model="recurringType">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description font-weight-bold">Bi-weekly</span>
              </label>
              <label class="custom-control custom-radio">
                <input @click="recurringDuration = ''" type="radio" class="custom-control-input" value="Monthly" v-model="recurringType">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description font-weight-bold">Monthly</span>
              </label>
            </div>
            <label class="label-input">
              If weekly or bi-weekly, specify the number of weeks for it keep recurring.
            </label>

            <div v-if="recurringType == 'Weekly'" class="row col-md-2">
            <label>Duration:</label>
              <input type="text" class="form-control" v-model.trim="recurringDuration">
              <small v-if="!validDuration" class="form-text text-muted">Enter 1 - 4</small>
              <small v-if="validDuration" class="form-text text-success"><strong>Сorrectly!</strong></small>
            </div>

            <div v-if="recurringType == 'Bi-weekly'" class="row col-md-2">
            <label>Duration:</label>
              <input type="text" class="form-control" v-model.trim="recurringDuration">
              <small v-if="!validDuration" class="form-text text-muted">Enter 1 or 2</small>
              <small v-if="validDuration" class="form-text text-success"><strong>Сorrectly!</strong></small>
            </div>
          </div>

        </form>
          <button @click="saveEvent()" class="float-left btn btn-dark" :disabled="!validBtnAccess">
            Submit
          </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["user", "rooms", "adminData"],
  
    data() {
      return {
        errorMsg: '',
        selectedUserId: '',
        day: '',
        month: '',
        year: '',
        description: '',
        eventTime: {
          startHour: 8,
          startMinutes: 0,
          endHour: 20,
          endMinutes: 0,
        },
        recurringEvent: false,
        recurringType: '',
        recurringDuration: '',
        daysCount: [],
        yearsCount: [],
        monthCount: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        hoursCount: [],
      }
    },
    created() {
      if (!this.user.access) {
        this.$router.push('/')
      }
      else {
        this.selectedUserId = this.user.id
      }
      let data = new Date()
      this.day = data.getDate()
      this.month = data.getMonth()
      this.year = data.getFullYear()
      for(var i = 0; i<3; i++)
          this.yearsCount.push(+this.year + i)
      this.createDateOptions()
      for(var i = 8; i<=20; i++)
        this.hoursCount.push(i)
    },
    watch: {
    },
    computed: {
      validBtnAccess() {
        if (this.validDescription && this.validDuration) {
          return true
        }
        return false
      },
      validDescription() {
        if (this.description.length >= 3 && this.description.length <= 100) {
          return true
        }
        return false
      },
      validDuration() {
        if (this.recurringEvent) {
          if (this.recurringType == 'Weekly' && (this.recurringDuration >= 1 && this.recurringDuration <= 4) )
            return true
          if (this.recurringType == 'Bi-weekly' && (this.recurringDuration == 1 || this.recurringDuration == 2) )
            return true
          if (this.recurringType == 'Monthly')
            return true
        }
        else {
          return true
        }
        return false
      },
      getUserName() {
        if (this.user.name)
          return this.user.name
        
        return 'No name'
      },
      getRoomName() {
        let currentRoom = this.rooms.filter((el) => {
          if (el.id == this.$route.params.id)
              return true
        })
        if (currentRoom.length > 0)
          return currentRoom[0].name
        
        return 'No room name'
      }
    },
    methods: {
      saveEvent() {
        this.errorMsg = ''
        let dataEvent = {}
        function toTimestamp(strDate) {
          let datum = Date.parse(strDate)
          return datum / 1000
        }
        let strDateStart = 1 + this.month+ '/' +this.day+ '/' +this.year+ ' ' +this.eventTime.startHour+ ':' +this.eventTime.startMinutes+ ':00'
        let strDateEnd = 1 + this.month+ '/' +this.day+ '/' +this.year+ ' ' +this.eventTime.endHour+ ':' +this.eventTime.endMinutes+ ':00'
        dataEvent.timeStart = Math.floor( toTimestamp(strDateStart) )
        dataEvent.timeEnd = Math.floor( toTimestamp(strDateEnd) )
        dataEvent.timeCreate = Math.floor( new Date().getTime()  / 1000 )
        dataEvent.desc = this.description
        dataEvent.type = this.recurringType
        dataEvent.duration = this.recurringDuration
        dataEvent.roomId = this.$route.params.id
        dataEvent.userId = this.selectedUserId
        if ( !(1800 + +dataEvent.timeStart <= dataEvent.timeEnd) ) {
          this.errorMsg = 'Enter the correct amount of time!'
        }
        else if (dataEvent.timeStart < dataEvent.timeCreate) {
          this.errorMsg = 'Can not reserve on the past date or time!'
        }
        else {
          console.log(dataEvent)
        }
        // let timeEnd =  Math.floor( new Date(year, month + 1, 0).getTime()  / 1000 )
        // console.log( new Date(dataEvent.timeStart * 1000).getHours() )
        // console.log( new Date(dataEvent.timeStart * 1000).getMinutes() )
        // alert(toTimestamp('02/13/2009 23:31:30'));
      },
      createDateOptions() {
        let cntMonthDays = new Date(this.year, this.month + 1, 0).getDate()
        if (this.day > cntMonthDays)
            this.day = cntMonthDays
        this.daysCount = []
        for(var i=1; i<=cntMonthDays; i++)
            this.daysCount.push(i)
      },
    }
  }
</script>