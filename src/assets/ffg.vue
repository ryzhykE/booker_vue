
<template>
    <div class="row order-back">
      <div class="col-md-offset-2 col-md-8">
        <router-link to='/'><button class="btn btn-warning main-btn">Main page</button></router-link>
        <div v-if="orders.length != 0 " >
            <h3>Order List</h3>
          <table v-if="checkUser > 0" class="table table-bordered">
            <thead>
            <tr class="info">
              <th class="thTable">Order</th>
              <th class="thTable">Date</th>
              <th class="thTable">First Name</th>
              <th class="thTable">Last Name</th>
              <th class="thTable">Payment</th>
              <th class="thTable">Status</th>
              <th class="thTable">User Discount</th>
              <th class="thTable">Total Discount</th>
              <th class="thTable">Total Price</th>
            </tr>
            </thead>
            <tbody v-for="order in orders">
              <tr v-on:click="listFullOrder(order.id)"   class="collapsed trOrders tr-ord" data-toggle="collapse" :href="'#' + order.id" aria-expanded="false" :aria-controls="order.id">
                <td>{{order.id}}</td>
                <td>{{order.date_time}}</td>
                <td>{{order.first_name}}</td>
                <td>{{order.last_name}}</td>
                <td>{{order.name}}</td>
                <td>{{order.status}}</td>
                <td>{{order.discount}}</td>
                <td>{{order.total_discount}}$</td>
                <td>{{order.total_price}}$</td>
              </tr>
              <tr class="collapse" :id="order.id"  role="tabpanel" :aria-labelledby="order.id">
                <td colspan="9">
                    <table class="table table-hover table-bordered">
                      <thead>
                        <tr class="success">
                          <th class="thTable">Title</th>
                          <th class="thTable">Count</th>
                          <th class="thTable">Price</th>
                          <th class="thTable">Discount Book</th>
                        </tr>
                      </thead>
                      <tbody> 
                      <tr v-for="book in ordersFull">
                        <td>{{book.title_book}}</td>
                        <td>{{book.count}}</td>
                        <td>{{book.price}}</td>
                        <td>{{book.discount_book}}</td>
                      </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
            </tbody>
          </table>   
          <div v-else >
              <p class="order-login">Please, login</p>
          </div>
        </div>
        <div v-else>
            <p class="no-order"> 
              You have no orders !
            </p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "order",
  data() {
    return {
      error: "",
      orders: [],
      ordersFull: [],
      checkUser: 0,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    listOrder: function() {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      axios
        .get(getUrl()+'orders/' + self.id + "/")
        .then(function(response) {
          if (Array.isArray(response.data)) {
            self.orders = response.data;
          } else {
            self.error = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listFullOrder: function(id) {
      var self = this;
      axios
        .get(getUrl()+'OrderInfo/' + id + "/")
        .then(function(response) {
          self.ordersFull = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCheck: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.checkUser = 1;
      } else {
        self.checkUser = 0;
      }
    }
  },
  created() {
    this.listOrder();
    this.getCheck();
  }
};
</script>

<style scoped>
.order-login {
color: red;
   font: 1.6em sans-serif;
   padding-top: 20px;
   padding-bottom: 20px;
   text-transform:uppercase;
}
.no-order {
  font: 1.6em sans-serif;
  padding-top: 20px;
  text-transform:uppercase;
  color: red;
}
.order-back{
   background-image: url(/static/img/order.jpg);
   margin-top: -60px;
   min-height: 350px;
}
.main-btn {
  margin-top: 40px;
}
.tr-ord td {
  color: #3B0C0C;
  font-size: 19px;
  font-weight: bold;
}
</style>


















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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-auth{
  background: blue;
}
</style>



<template>

  <div class="main">
  <div id="app">
  <!--pre {{currDay}} / {{inst_date}} / {{currYear}} / {{currMonth}} / {{currWD}} / {{daysInMonth}} / {{FstWeekD}}-->
  <div id="calendar">
    <div class="head"><b class="ltMonth" @click="ltMonth">«</b><b>{{months[currMonth]}} {{currYear}}</b><b class="gtMonth" @click="gtMonth">»</b></div>
    <div class="week"><b v-for="dayer in days">{{dayer}}</b></div>
    <div class="days">
      <time v-for="blank in nullWeek">&nbsp;</time>
      <time v-for="i in daysInMonth" :class="{currDay: i == currDay}">{{i}}</time>
    </div>
  </div>
</div>
    
  </div>

</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  data() {
    return {
      day:'',
       inst_date: new Date(),
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
   
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
 
  created() {
  },
    computed: {    
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    },
    currWD() {
      return this.inst_date.getDay()
    },
    currDay() {
      const now = new Date();
      if ( this.inst_date.getMonth() == now.getMonth() && this.inst_date.getFullYear() == now.getFullYear() ) {
        return now.getDate()
      } else return
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth+1, 0).getDate();
    },
    nullWeek() {
      return new Date(this.currYear, this.currMonth, 0).getDay();
    }
  },
  methods: {
    ltMonth() {
      this.inst_date = new Date( this.currYear, this.currMonth-1 )
    },
    gtMonth() {
      this.inst_date = new Date( this.currYear, this.currMonth+1 )
    }
  },

  components: {
  }
};
</script>


/**
     * SELECT e.id, e.description as descr, e.id_employee as u_id, e.id_room
     * as room_id, emp.name as u_name, r.name as room_name, ed.start, ed.end
     * FROM events e left join employees emp on e.id_employee = emp.id
     * left join rooms r on e.id_room = r.id left join event_details ed on e.id = ed.id
     * WHERE ed.start between '2017-11-01 08-00-00' and '2017-11-30 20-00-00'and e.id_room = 3
     */




INSERT INTO `events` (`id`, `id_user`, `id_room`, `description`, `time_start`, `time_end`, `id_parent`, `create_time`) VALUES
(4, 1, 2, 'desc1', '2017-11-01 15:00:00', '2017-11-01 16:00:00', 1, '2017-11-01 16:12:09');



'e.id, e.description as descr, e.id_employee as u_id, e.id_room as room_id,'
				. ' emp.name as u_name, r.name as room_name, ed.start, ed.end')
											  ->setTable('events e')
											  ->setJoin('left join employees emp on e.id_employee = emp.id '
													  . 'left join rooms r on e.id_room = r.id '
													  . 'left join event_details ed on e.id = ed.id')
												->setWhere("ed.start between '{$params['start']}' and '{$params['end']}'"
												. "and e.id_room = {$params['id_room']


$start = new \DateTime();
			$start->setDate($params['year'],$params['month'], 1);
			$arr['start'] = $start->format('Y-m-d 08-00-00');
			$arr['end'] = $start->format('Y-m-t 20-00-00');


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background-image: url(/static/img/main.jpg);

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: sans-serif;
  background-image: -webkit-linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
  background-image: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
}
[v-cloak] > * {
  display: none;
}
#app {
  margin: auto;
  height: 315px;
}
.head,
.week,
.days {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
#calendar {
  box-shadow: 0 1em 10em -2em #000;
  width: 280px;
  text-align: center;
}
.week {
  border-bottom: 1px solid rgba(204,204,204,0.3);
  line-height: 2em;
}
.week b {
  font-weight: normal;
  color: rgba(204,204,204,0.5);
  width: 40px;
}
.days {
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  line-height: 40px;
}
time {
  width: 40px;
}
.currDay {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 50%;
}
.head {
  background: rgba(238,238,238,0.3);
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  line-height: 40px;
}
.ltMonth,
.gtMonth {
  cursor: pointer;
  padding: 0 1em;
  background: rgba(238,238,238,0.3);
}
.ltMonth:hover,
.gtMonth:hover {
  background: rgba(238,238,238,0.2);
  color: #f00;
}



</style>

