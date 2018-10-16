<template>
  <div class="log">
   <div class="homepage">
    <div>
      <img src="../assets/images/title.png" height="150" width="150">
    </div>
  </div>
  <div class="log_img">
   <img src="../assets/images/banner.png">
   <div class="into">
    <div>
      <input type="text" id = "username" v-model="username" auto-complete="off" placeholder="账号"Z>
      <input type="password" id="keydown" placeholder="密码" v-model="pwd" @keyup="show($event)">
    </div>
    <div >
      <el-checkbox class="fl">记住密码</el-checkbox>
      <el-checkbox class="fr" >自动登录</el-checkbox>
    </div>
    <el-button type="primary" class="remember" style="width:100%;background-color:#fb8fa8;margin-top:20px"
    @click="handleLogin();dialogVisible=false" :loading="logining" >登&nbsp;&nbsp;录</el-button>
  </div>
</div>

<div class="foot">Powered by premier</div>
</div>
</template>
<script>
import axios from "axios";
import { familyDoctor } from "../common/util.js";
export default {
  data() {
    return {
      logining: false,
      checked: true,
      username: "",
      dialogVisible: false,
      pwd: "",
      falg: "",
      active:false,
      activee:true,
      a:true,
      b:"",
      c:"",
    };
  },
  methods: {
    show: function(ev) {
      if (ev.keyCode == 13) {
        this.handleLogin();
      }
    },
    handleLogin(){
      let url = familyDoctor();
      let _this=this
      axios.post(url+"/wcfy/login",{
       account: this.username,
       pwd: this.pwd
     }).then(function(response){
      let msg=response.data.message
      if(msg){
        _this.$message(msg)
        return
      }
      let num=response.data.data.roleId
      let date1 = new Date()
      let dateLogin=date1.getTime()
       window.sessionStorage.setItem("dateLogin",dateLogin);
      window.sessionStorage.setItem("token",response.data.data.token);
      window.sessionStorage.setItem("loginId",response.data.data.id);
      window.sessionStorage.setItem("id",response.data.data.roleId);
      window.sessionStorage.setItem("user_name",response.data.data.name);
      window.localStorage.setItem("token",response.data.data.token);
      window.localStorage.setItem("loginId",response.data.data.id);
      window.localStorage.setItem("id",response.data.data.roleId);
      window.localStorage.setItem("user_name",response.data.data.name);
      let roleId = response.data.data.roleId;
      _this.b=response.data.roleId  
      switch(num){
       case 1:
       _this.$router.push("sign/list1/")
       break;
       case 3:
       _this.$router.push("finance/list2/")
       break;
       case 4:
       _this.$router.push("finance/list/")
       break;
       case 5:
       _this.$router.push("sign/list1/")
       break;
     } 
   })             
   }
 },
 computed: {
  familyDoctor
}
};
</script>
<style >
body,
html {
  width: 100%;
  height: 100%;
}
#keydown,
#username {
  height: 30px;
  width: 100%;
  padding-left: 9px;
  border: none;
  border: 1px solid #c0b7b4;
  box-sizing: border-box;
  margin-bottom: 14px;
}
#keydown{
  margin-bottom: 11px;
}
.log {
  width: 100%;
  height: 100%;
}
.homepage {
  width: 100%;
  height: 85px;
  color: #7d7d7d;
  font-size: 16px;
  background-color: white;
  padding-left: 200px;
  box-sizing: border-box;
  font-weight: 600;
  padding-top: 15px;
}
.homepage >div{
  display: inline-block;
  text-align: right;
}
.homepage >div > p{
  font-weight: 100;
  font-size: 14px;
}
.homepage > div > img{
  width: 100%;
  height: 100%;
  display: block;
}
.log_img {
  width:100%;
  /*height:calc(100% - 126px) ;*/
  height: 572px;
  margin-top: 50px;
  margin-bottom: 120px;
  position: relative;
}
.log_img > img {
  height: 100%;
  width: 100%;
  display: block;
}
.into {
  width: 318px;
  height: 254px;
  position: absolute;
  top: 50%;
  margin-top: -129px;
  right: 200px;
  background-color: rgba(255, 255, 255, 0.76);
  padding:65px 45px 0;
  text-align: center;
  box-sizing: border-box;
}
.into  > div{
  width: 100%;
}
.foot {
  padding: 20px 0 ;
  background-color: #494949;
  text-align: center;
  font-size: 12px;
  color: white;
}

#app > div > div.log_img > div > div:nth-child(2) > label.el-checkbox.fl > span.el-checkbox__label,
#app > div > div.log_img > div > div:nth-child(2) > label.el-checkbox.fr > span.el-checkbox__label{
  color: #7d7d7d;
  font-size: 12px;
}
.remember {
  border-color: #fb8fa8!important;
  font-weight: 600;
}
</style>
