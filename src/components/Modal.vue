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
                                <!-- <div v-if="occurrenceSection == 'show'" > -->
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
        <!-- {{listEvent}} -->        
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
      selUser: "",
        config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
          getReccur: function(){
      var self = this
      self.error = ''
      self.events = []
      axios.get(getUrl() + "events/" + self.listEvent.id_parent + "/", self.config)
        .then(function (response) {
          console.log(response.data)
    
        })
    },
      deleteEvent: function(){
        var self = this
        self.error=''      
        self.success = ''
        axios.delete(getUrl() + "events/" + self.listEvent.id + "/", self.config )
            .then(function (response) {
            console.log(response.data)
            if (response.data == 1)
             {
                self.error = 'Event Delete !'
                self.success = 'success'
                self.$emit('refresh')
             }
             else
            {
                 self.error = response.data
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    setPropert: function() {
      var self = this;
      self.currDate = new Date()
      self.selDescription = self.listEvent.description;
      self.selUser = self.listEvent.id_user;
      self.checkUserRole();
      self.getUsersList();
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
      //self.getEventTime();
      //   if (self.access == '2' || self.user.id == self.event.id_user)
      //   {
      //     self.getEventsIdParent()
      //   }
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