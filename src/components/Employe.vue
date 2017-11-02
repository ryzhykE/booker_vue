<template>
    <div class="row admin-main">
         <div class="col-lg-5 manu-left">
            <div v-if="error !== ''" class="alert alert-danger">
                {{ error }}
            </div>   
            <div class="authors"> 
                <h6>Users List:</h6>
            <table class="table table-bordered">
                <thead>
                <tr class="success header-th">
                    <th>Login</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user, index) in users" :value="user.id" class="tr-list">
                    <td>{{user.login}}</td>
                    <td>{{user.email}}</td>
                    <td><button class="btn btn-warning" @click="eddUser(user.id)">Edit user</button></td>
                    <td><button class="btn alert-danger" v-on:click="test(user.id)">Remove</button></td>
                </tr>
                </tbody>
            </table>
            </div>
             <router-link to="/employeelist/adduser/">
                <button class="btn btn-success">Add a new Employee</button>
            </router-link>
             <router-link to="/"><button class="btn btn-info">Back</button></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "EmployeeList",
        data() {
            return {
                error: "",
                loginU: '',
                addUser: "",
                editUser: "",
                editUserName: "",
                user: {},
                users: [] 
            };
    
        },
        methods: {
            eddUser: function(user){
                var self = this
                self.$router.push({ path: '/employeelist/edituser/'+ user })
            },
            test:function(str){
      var self = this
      alert(str)
      
    },
            getUsersList: function() {
                var self = this;
                self.addUser = "";
                axios
                    .get(getUrl() + "user/")
                    .then(function(response) {
                    if (response.status == 200){
                         self.users = response.data;  
                        return true
                    }
                    else {
                        self.error = response.data
                        return false
                    }     
                })
                
            },  
            checkUserFun: function() {
                var self = this;
                if (localStorage["user"]) {
                    self.user = JSON.parse(localStorage["user"]);
                    axios
                        .get(getUrl() + "user/" + self.user.id +'/')

                        .then(function(response) {
                            if (response.status == 200){
                                if(self.user.hash === response.data.hash)
                                {
                                    if (response.data.id_role == "1") {
    
                                       self.user.role = response.data.role;
    
                                      } else {
    
                                         self.$router.push("/");
                                     }
                                }
                            }
                            else {
                                self.$router.push("/");
                            }
                        })
    
                } else {
                    self.$router.push("/");
    
                }
            }
        },
    
        created() {
            this.checkUserFun()
            this.getUsersList()
        }    
    };
</script>

<style scoped>

    .admin-main {
        background-image: url(/static/img/admin.jpg);
        min-height: 550px;
    }
    .manu-left {
        background-image: url(/static/img/admin-left.jpg);
        min-height: 550px;  
    }    
    h6 {
        font: 1.7em sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        color: #49060e;
    }
    .header-th th {
        text-align: center;
        font: 1.3em sans-serif;

    }
    .tr-list td {
        font: 1.3em sans-serif;
    }
    

   
</style>