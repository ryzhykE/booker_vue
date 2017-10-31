<template>
  <div class="main container">
      <div class="row">
        <div class="col-xs-offset-3 col-sm-8 col-lg-6">
          <div class="panel panel-primary">
          <div class="panel-heading">
          <h3 class="panel-title">Authorization</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8 col-sm-8 col-md-8 login-box">
                <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input v-model="login" type="text" class="form-control" placeholder="Login" name='login' required autofocus />
                </div>
                <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input v-model="pass" type="password" class="form-control" name = "password" placeholder="Password" required />
                </div>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <button type="button" class="btn btn-labeled btn-success" v-on:click="loginUser()">
            <span class="btn-label"><i class="glyphicon glyphicon-ok"></i></span>Войти</button>
          </div>
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
      error:'',
      login: "",
      pass: "",
      id: "",
      checkUser: "",
      role: "",
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
   methods: {
      loginUser: function() {
      var self = this;
      self.error = "";
      axios
        .put(
          getUrl()+'User/',
          {
            login: self.login,
            pass: self.pass
          }
        )
        .then(function(response) {
          console.log(response.data);
          if (response.data.id && response.data.hash) {
            self.id = response.data.id;
            self.hash = response.data.hash;
            self.role = response.data.role;
            localStorage["id"] = JSON.stringify(self.id);
            localStorage["hash"] = JSON.stringify(self.hash);
            localStorage["login"] = JSON.stringify(self.login);
            localStorage["id_role"] = JSON.stringify(self.role);
            //self.checkUserA();
            if (response.data.role == "1") {
                  self.$router.push("/admin");
                }
                else
                {
                  self.$router.push("/calendar");
                }

            return true;
          } else {
            self.error = response.data;
            
          }
        })
        .catch(function(error) {
          console.log(error);
          self.error = "password or login wrong"
        });
    },
    checkUserA: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.id = JSON.parse(localStorage["id"]);
        self.hash = JSON.parse(localStorage["hash"]);
        self.role = JSON.stringify(localStorage["id_role"]);
        axios
          .get(getUrl()+'Main/' + self.id)
          .then(function(response) {
            if (response.data !== false) {
              //console.log(response.data.role);
              if (self.hash === response.data.hash) {
                
                self.checkUser = 1;
                return true;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        return false;
      }
    },
    logoutUser: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        delete localStorage["id"];
        delete localStorage["hash"];
        delete localStorage["login"];
        delete localStorage["role"];
        self.checkUser = "";
        self.role = "",
        self.$parent.getCheck();
        return true;
      } else {
        return false;
      }
    
  },
  created() {
    this.checkUserA();
  }
  },
  created() {
    this.checkUserA();
  },
  
    computed: {    
   
  },
  components: {
  }
};
</script>

<style scoped>
.main {
   background: url(/static/img/calendar.jpg) no-repeat center center fixed;
   background-size: cover; 
}
.form {
  width: 400px;
  margin: 0 auto;
  padding-top: 40px;
}
.form-inp {
  margin-top: 30px;
  margin-bottom: 30px;
}


</style>
