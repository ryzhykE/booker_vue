<template>
  <div class="col-lg-5 ">
      <div v-if="error !== ''" class="alert alert-danger">
        {{ error }}
      </div>
      <div class="form">
           <div class="form-group">
                    <label class="control-label col-sm-2" for="login">Login: </label>
                    <div class="col-sm-10">
                        <input v-model="userInfo.login" type="text" class="form-control" id="login" placeholder="Enter login" name="login">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email: </label>
                    <div class="col-sm-10">
                        <input v-model="userInfo.email" type="email" class="form-control" id="email" placeholder="Enter email" name="email">
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
            <button class="btn btn-success save-user" @click="saveUser()">Update User</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'EditUser',
      beforeRouteUpdate(to, from, next) {
        this.getUser(to.params.id)
        this.showOrdrers = false
        this.orderMsg = ''
        next()
    },
  data () {
    return {
      user:'',
      userInfo: [],
      pass:'',
      pass_confirm:'',
      error:'',
      showOrdrers: false,
      orderMsg: '',
       config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
    }
  },
  methods:{
            getUser: function(id) {
        var self = this;
        axios
          .get(getUrl()+'user/' +id+'/',self.config )
          .then(function(response) {
            if (response.data !== false) {
              self.userInfo = response.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
     
        },
      saveUser: function(){
        var self = this
          self.error = ''
          if (self.userInfo.login && self.userInfo.email && self.pass)
          {
            
            if (self.userInfo.login.length < 2) {
            self.error = "Login should be at least 4 characters"
            return false
            }
            if (self.pass.length < 5) {
            self.error = "Password should be at least 4 characters"
            return false
            }
            if (self.pass != self.pass_confirm) {
              self.error = "Password fields do not match";
              return false
            }
              var data = {}
              data.id = self.userInfo.id
              data.login = self.userInfo.login
              data.email = self.userInfo.email
              data.pass = self.pass
             console.log(data);
                axios.put(getUrl()+'admin/', data, self.config)
                    .then(function (response) {
                    self.getUser(self.$route.params.id)
                    self.$parent.getUsersList(self.$route.params.id)
                    self.error = 'User update'
                   
                })
                    .catch(function (error) {
                    console.log(error)
                })
          }
          else{
              self.errorMsg =  'Check all fields!'
          }
    },
    
    
  },
   created(){
    this.getUser(this.$route.params.id)
  },
  computed:{
  },
  components:{
  }
}
</script>


<style scoped>
.form {
    max-width: 600px;
}
.form-group {
    padding-top: 30px; 
}
.select-user {
    width: 200px;
}
.save-user {
    margin-top: 25px;
    width: 160px;
    height: 40px;
    font: 1.3em sans-serif;
}
</style>