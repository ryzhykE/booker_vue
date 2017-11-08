<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="row form-login">
                <div class=" col-sm-12 col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">B.B. DETAILS</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 ">
                                 <div class="btnclose">
                                    <button class="btn btn-danger " type="button" v-on:click="$emit('close')" >X</button>
                                </div> 
                                <p class="alert-danger">{{error}}</p>
                                <div class="input-group">
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span> When:</span>
                                    <div v-if="(currDate < eventStartPoint) && access == '2' ">
                                        <select v-model="startH">
                                            <option v-for="h in hoursStSelector" :value="h.value">{{h.title}}</option>
                                        </select>
                                        <select v-model="startM">
                                            <option v-for="m in minutesSelector" :value="m.value">{{m.title}}</option>
                                        </select>
                                            -
                                        <select v-model="endH">
                                            <option v-for="h in hoursSelector" :value="h.value">{{h.title}}</option>
                                        </select>
                                        <select v-model="endM">
                                            <option v-for="m in minutesSelector" :value="m.value">{{m.title}}</option>
                                        </select>
                                    </div>
                                    <p v-else>
                                        {{listEvent.timeString}}
                                    </p>                                   
                                </div>
                                <div class="input-group">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-list-alt"></span> Notes: </span>
                                    <div v-if="access == '2'">    
                                        <input class="form-control" type="text" v-model="selDescription" :value="listEvent.description">
                                    </div>
                                    <div v-else>{{listEvent.description}}</div>
                                </div>
                                 <div class="input-group">
                                 <span class="input-group-addon">
                                     <span class="glyphicon glyphicon-user"></span> Who: 
                                 </span>
                                    <div v-if="listEvent.user_login && access == '2'">    
                                        <select class="form-control" v-model="selUser">
                                            <option v-for="user in users" :value="user.id">{{user.login}}</option>
                                        </select>
                                    </div>
                                    <div v-else-if="listEvent.user_login && access == '1'">{{listEvent.user_login}}</div>
                                    <div v-else-if="!listEvent.user_login" class="alert-danger">The user has been removed</div>
                                </div>
                                <div class="input-group">
                                 <span class="input-group-addon">
                                     <span class="glyphicon glyphicon-floppy-saved"></span> Submitted:
                                 </span>
                                    <div class="subtit-time">{{listEvent.create_time}}</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                                
                            <input type="checkbox" id="checkbox" v-model="checked">
                            <label for="checkbox">Apply to all occurrences?</label>
                            
                            <div v-if="success != 'success'">
                              <div v-if="access == '2'" class="btn-section">
                                  <button class="btn btn-primary" v-on:click="updateEvent()"><i class="glyphicon glyphicon-pencil"></i> Update</button>
                                  <button class="btn btn-danger" v-on:click="deleteEvent()"><i class="glyphicon glyphicon-trash"></i> Delete</button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- {{listEvent}}        -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
export default {
  name: "Modal",
  props: ["listEvent", "sentRole"],
  data() {
    return {
      error: "",
      startH: '',
      startM: '',
      success: "",
      endH: '',
      endM: '',
      minutes:['00', '30'],
      eventStartPoint: "",
      access: "",
      eventParent: "",
      user: {},
      users: [],
      occurrenceSection: "",
      checked: false,
      selDescription: "",
      eventYear: "",
      allEvents: "",
      selUser: "",
        config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
     updateEvent: function(){
      var self = this
      self.error = ''
       if (self.checkInputs()) {
        var data = {}
         if (self.checked){
          data.timestamp = new Date(self.eventYear, self.eventMonth, self.eventDay, self.startH, self.startM).getTime()
          data.checked = self.recEventsUpdate(self.allEvents)
          console.log(data.checked)
        }
        else
        {
        data.id = self.listEvent.id
        data.id_user = self.selUser;
        data.id_room = self.listEvent.id_room
        data.description = self.selDescription;
        data.time_start = new Date(self.eventYear, self.eventMonth, self.eventDay, self.startH, self.startM).getTime()
        data.time_end = new Date(self.eventYear, self.eventMonth, self.eventDay, self.endH, self.endM).getTime()
        axios.put(getUrl() + 'events/', data, self.config)
          .then(function(response){
            console.log(response.data)
            if (response.data == 1 || response.data == true)
            {
              self.error = 'Event update!'
              self.success = 'success'
              self.$emit('refresh')
            }
          })
          }
       }  
    },
    recEventsUpdate: function(listEvent) {
        var self = this
        //console.log(listEvent)
        var arrEvents = []
        listEvent.forEach(function(val){
          var newEvent = {}
          var date_start = new Date(val.time_start)
          var date_end = new Date(val.time_end)
          var dateTimeStart = new Date(date_start.getFullYear(), date_start.getMonth(), date_start.getDate(),
          self.startH, self.startM).getTime()
          var dateTimeEnd = new Date(date_end.getFullYear(), date_end.getMonth(), date_end.getDate(),
          self.endH, self.endM).getTime()
          newEvent.event_id = val.id
          newEvent.id_user = self.selUser
          newEvent.id_room = self.listEvent.id_room
          newEvent.description = self.selDescription
          newEvent.time_start = dateTimeStart
          newEvent.time_end = dateTimeEnd
          arrEvents.push(newEvent)

        })
        return arrEvents
    },
    checkInputs: function() {
      var self = this;
      if (self.startH > self.endH){
        self.error = 'End time of an event earlier than the start!'
        return false
      }
      if (self.startH == self.endH && self.endM == self.endM){
        self.error = 'Start day match End date!'
        return false
      }
      if (self.endH == 20 && self.endM == 30)
      {
        self.error = 'End time more than 20:30!'
        return false
      }
      
      return true;
    },
      deleteEvent: function(){
        var self = this
        self.error=''      
        self.success = ''
        if (self.checked)
        {
           var url = ("events/" + self.listEvent.id + "/" + self.listEvent.id_parent + "/" + self.checked + "/");
          console.log(url)
        }
        else
        {
          var url = ("events/" + self.listEvent.id + "/"+ self.checked + "/");
          console.log(url)
        }
        axios.delete(getUrl() + url , self.config )
            .then(function (response) {
            console.log(response.data)
            if (response.data == 1)
             {
                self.error = 'Event Delete  - ' + self.listEvent.time_start + ' : ' + self.listEvent.time_end + ' user ' +self.listEvent.user_login
                self.success = 'success'
                self.$emit('refresh')
             }
             else
            {
                 self.error = response.data
            }
        })
    },
     getEventTime: function(){
      var self = this
      var date_start = new Date(self.listEvent.time_start)
      var date_end = new Date(self.listEvent.time_end)
      self.eventYear = date_start.getFullYear()
      self.eventMonth = date_start.getMonth()
      self.eventDay = date_start.getDate()
  }, 
    setPropert: function() {
      var self = this;
      self.currDate = new Date()
      self.selDescription = self.listEvent.description;
      self.selUser = self.listEvent.id_user;
      self.checkUserRole();
      self.getUsersList();
      self.getEventTime();
      var tmpS = new Date(self.listEvent.time_start)
      var tmpE = new Date(self.listEvent.time_end)
      self.eventStartPoint = tmpS
      self.startH = tmpS.getHours()
      self.endH = tmpE.getHours()
      if(tmpS.getMinutes() == '0'){
        self.startM = '00'
      }else{
        self.startM = tmpS.getMinutes()
      }
      if(tmpE.getMinutes() == '0'){
        self.endM = '00'
      }else{
        self.endM = tmpE.getMinutes()
      }
    },
    checkUserRole: function() {
      var self = this;
      if (self.sentRole == "1") {
        self.access = "2";
      } else {
        self.access = "1";
      }
    },
    getUsersList: function() {
      var self = this;
      self.addUser = "";
      if (self.sentRole != "1") {
        return false;
      }
      axios.get(getUrl() + "user/").then(function(response) {
        if (response.status == 200) {
          self.users = response.data;
          return true;
        } else {
          self.error = response.data;
          return false;
        }
      });
    },
    //  getCount: function() {
    //   var self = this;
    //   axios.get(getUrl() + "events/count/" + self.listEvent.id_user + '/' + self.listEvent.id_parent + '/').then(function(response) {
    //       alert(response.data)
    //     if (response.status == 200) {
        
    //       //self.occurrenceSection = response.data;
    //       return true;
    //     } else {
    //       self.error = response.data;
    //       return false;
    //     }
    //   });
    // }, 
    
  },
  
  created() {
    this.setPropert();
  },
  computed: {
    hoursSelector(){
      var self = this
        var hours = []
          for(var i=8;i<=20;i++){
            hours.push({value:i, title:i})
        }
        return hours
    },
      hoursStSelector(){
      var self = this
        var hours = []
          for(var i=8;i<=19;i++){
            hours.push({value:i, title:i})
        }
        return hours
    },
    minutesSelector(){
      var self = this
      var minutes = []
      self.minutes.forEach(function(m){
        minutes.push({value:m, title:m})
      })
      return minutes
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 390px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.btnclose {
  float: right;
  margin-top: -52px;
}

.btn-section .btn-danger {
  margin-left: 20px;
}
.subtit-time {
    padding-top: 5px;
    font-weight: bold;
    font-size: 15px;
}



</style>