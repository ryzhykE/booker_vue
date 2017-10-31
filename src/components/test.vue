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

