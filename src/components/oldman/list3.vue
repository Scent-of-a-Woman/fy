<template>
	<div id="app" v-loading.fullscreen.lock="fullscreenLoading">    
   <div class="goschool-nav">   
    <div class="search-Input">
      <input type="text" placeholder="体检人姓名/身份证号" v-model="search">
    </div>
    <div class="search-icon" @click="Search()">
      <img src="../../assets/images/search.png" height="30" width="30">
    </div>
  </div>
  <div class="content">
   <ul  class="listhead">
    <li>体检人姓名</li>
    <li>体检人身份证号</li>
    <li>提交时间</li>
    <li>体检时间</li>
    <li>手机号码</li>
  </ul>
  <ul  class="listhead font_color" v-for="(item,index) in data3">
    <li>{{item.physicalName}}</li>
    <li>{{item.physicalidcard}}</li>
    <li>{{item.create_time}}</li>
    <li>{{item.order_time}}</li>
    <li>{{item.phone}}</li>  
  </ul>
</div>
<!-- 分页 -->
<div class="all" >
  <span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>
  
  <template>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
      layout="prev, pager, next"
      :total="total"
      v-if="total <= 5 ? false:true"
      :page-size="5"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</template>
<script >
  import {familyDoctor,checkStatus} from "./../../common/util.js"
  import axios from "axios"

  export default{
    data(){
     return{
      search:"",
      total:0,
      loginId:"",
      token:"",
      data3:[],
      fullscreenLoading:false
    }
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  },
  created:function(){
   this.token = window.localStorage.getItem("token");
   this.loginId = window.localStorage.getItem("loginId");
   this.requestData()
 },
 methods:{
  //数据请求
  requestData:function(){
    let  _this=this
    checkStatus(_this)
    let url = familyDoctor();
    axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
      order_type:2,
      status:2,
      pageNum:1,
      pageSize:5
    }).then((response)=>{
     _this.data3=response.data.data.list
     _this.total=response.data.data.total
   })
  },
      // 分页
      handleCurrentChange:function(val){
        let url = familyDoctor();
        let _this=this
        if(!_this.search){
          axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
            order_type:2,
            status:2,
            pageNum:val,
            pageSize:5
          }).then(function(response){
 _this.data3=response.data.data.list
})
}else{
  axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
    order_type:2,
    status:2,
    pageNum:val,
    pageSize:5,
    searchKey:_this.search
  }).then(function(response) {
  _this.total=response.data.data.total
  _this.data3 = response.data.data.list;
});
}

},
        // 搜索
        Search:function(){
          let url = familyDoctor();
          let _this = this;
          axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
            order_type:2,
            status:2,
            pageNum:1,
            pageSize:5,
            searchKey:_this.search
          }).then(function(response) {
            _this.total=response.data.data.total
            _this.data3 = response.data.data.list;
          })
        }
      },
      computed: {
        familyDoctor,
        checkStatus
      } 
    }
  </script>
  <style scoped>
  .goschool-nav{
    height:70px;
    position: relative;
    background-color:white;
  }
  .nav-date{
    height: 70px;
  }
  .nav-date .el-button--text{
    height: 50px;
    width: 147px;
    padding: 0;
    color: white;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 20px;
    background-color: #fb8ca6;
  }
  .search-Input{
    position: absolute;
    top: 50%;
    right: 70px;
    margin-top: -25px;
    float: left;

  }
  .search-Input input{
   height: 48px;
   width: 433px;
   outline: none;
   padding-left: 10px;
   border: solid 1px #e5e5e5;
   border-radius: 5px 0px 0px 5px;
 }
 .search-icon{  
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -25px;
  background-color: #fb8ca6;
  border-radius: 0px 5px 5px 0px;
}
.listhead{
  width: 100%;
  height: 70px;
  margin-top: 10px;
}
.listhead li{
  float: left;
  height: 70px;
  line-height: 70px;
  text-align: center;
  white-space: nowrap;
  font-size: 14px;
  color: #fb8ca6;
  background-color: #ffffff;
  margin-right:0.2%;
}
.font_color li{
  color: #5f5f5f;
}
.listhead li:nth-of-type(1),.listhead li:nth-of-type(5){
  width: 14.5%; 
}
.listhead li:nth-of-type(2){
  width: 30%;  
}
.listhead li:nth-of-type(3),.listhead li:nth-of-type(4){
  width: 20%; 
}
.all {
  width: 100%;
  float: left;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
}
.all span {
  display: block;
  margin: auto;
  width: 70%;
  text-align: center;
}
.all  span i{
  color: #fb8ca6;
}
</style>