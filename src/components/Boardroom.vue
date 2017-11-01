<template>
    <div class="row form-login">
        <div class="col-xs-offset-3 col-sm-8 col-lg-6">
          <div class="panel panel-primary">
          <div class="panel-heading">
          <h3 class="panel-title">{{rooms}}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8 col-sm-8 col-md-8 login-box">
                <p class="alert-danger">{{error}}</p>
                
                <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input  type="text" class="form-control" placeholder="Login" name='login' required autofocus />
                </div>
                <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" class="form-control" name = "password" placeholder="Password" required />
                </div>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <button type="button" class="btn btn-labeled btn-success" v-on:click="loginUser()">
            <span class="btn-label"><i class="glyphicon glyphicon-ok"></i></span>Enter</button>
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
        rooms: '',
        roomid: '',
        error: '',
    };
  },
  methods: {
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
    /** 
        daysInMonth() {
      var self = this
      var days = []
      var countD = new Date(self.currYear, self.currMonth+1, 0).getDate();
     for(var i=0 ; i < countD ; i++) {
          days.push(i+1)
      }
      self.days = days
    },
    ltMonth() {
      var self = this
      self.inst_date = new Date( self.currYear, self.currMonth-1 )
    },
    gtMonth() {
      var self = this
      self.inst_date = new Date( self.currYear, self.currMonth+1 )
    }
    */
  },
  /** 
    computed: {

    currYear() {
      var self = this
      return self.inst_date.getFullYear()
    },
    currMonth() {
      var self = this
      return self.inst_date.getMonth()
    },
    currWD() {
      var self = this
      return self.inst_date.getDay()
    },
    currDay() {
      var self = this
      const now = new Date();
      if ( self.inst_date.getMonth() == now.getMonth() && self.inst_date.getFullYear() == now.getFullYear() ) {
        return now.getDate()
      } 
    },
   
    nullWeek() {
      var self = this
      var res =  new Date(self.currYear, self.currMonth, 0).getDay()+1;
      return res
    },
    nullWeek1() {
       var self = this
       var res = new Date(self.currYear, self.currMonth, 0).getDay();
       if(res == 0) {
         res = 1
       }
       return res
    }
  },*/
  created() {
       //this.daysInMonth(),
       this.getRoom(this.$route.params.id)
  }
  
  
}
</script>
<style>

</style>
