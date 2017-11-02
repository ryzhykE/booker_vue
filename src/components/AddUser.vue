<template>
    <div class="row">
        <div class="col-lg-5 ">
            <h4>Register user</h4>
            <div v-if="error !== ''" class="alert alert-danger">
                {{ error }}
            </div>
        
                <div class="form-group">
                    <label class="control-label col-sm-2" for="login">Login: </label>
                    <div class="col-sm-10">
                        <input v-model="login" type="text" class="form-control" id="login" placeholder="Enter login" name="login">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email: </label>
                    <div class="col-sm-10">
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="pass">Password: </label>
                    <div class="col-sm-10">
                        <input v-model="pass" type="password" class="form-control" id="pass" placeholder="Enter password" name="pass">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="pass_confirm">Password Conferm: </label>
                    <div class="col-sm-10">
                        <input v-model="pass_confirm" type="password" class="form-control" id="pass_confirm" placeholder="Conferm password" name="pass">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button v-on:click="registration()" type="submit" class="btn btn-default">Submit</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      error: "",
      success: "",
      login: "",
      email:"",
      pass: "",
      pass_confirm: "",
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    registration: function() {
      var self = this;
      if (
        self.email &&
        self.login &&
        self.pass &&
        self.pass_confirm
      ) {
        if (self.pass.length < 5) {
         self.error = "Password should be at least 4 characters"
        return false
        }
         if (self.login.length < 4) {
         self.error = "Login more 4 characters"
         return false
        }
        if (self.pass != self.pass_confirm) {
          self.error = "Password fields do not match";
          return false
        }

          var data = new FormData();
          data.append("email", self.email);
          data.append("login", self.login);
          data.append("pass", self.pass);
          axios
            .post(
              getUrl()+'User/',
              data,
              self.config
            )
            .then(function(response) {
              if (response.data === "Register success")
                {
                    self.error = response.data
                    self.$router.push({ path: '/employeelist/'})
                    self.$parent.getUsersList()
                }
                else
                {
                    self.error = response.data
                }
              
            })
            .catch(function(error) {
                self.error = response.data
              console.log(error);
            });
    
      } else {
        self.error = "Enter field!";
      }
    }
  }
};
</script>

<style scoped>
.success {
  color: darkblue;
  text-align: center;
}
</style>
