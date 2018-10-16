<template>
<div id="app" v-loading.fullscreen.lock="fullscreenLoading">
   <div class="goschool-nav">   
      <div class="search-Input">
          <input type="text" placeholder="体检人姓名/身份证号" v-model="search">
      </div>
     <div class="search-icon">
        <img src="../../assets/images/search.png" height="30" width="30" @click="Search()">
      </div>
  </div>
<div class="content">
  <ul  class="listhead">
        <li>体检人姓名</li>
        <li>体检人身份证号</li>
        <li>提交时间</li>
        <li>体检时间</li>
        <li>预约人姓名</li>
        <li>手机号码</li>
        <li>操作</li>
   </ul>
   <ul  class="listhead font_color" v-for="(item,index) in data3">
        <li>{{item.physicalName}}</li>
        <li>{{item.physicalidcard}}</li>
        <li>{{item.create_time}}</li>
        <li>{{item.order_time}}</li>
        <li>{{item.orderName}}</li>
        <li>{{item.phone}}</li> 
        <li>
           <div class="Sure" @click="SureData(item,index)">确定</div>
          <div class="Return" @click="returnData(item,index)">驳回</div>
         
      </li> 
   </ul>
</div>
<!-- 分页 -->
<div class="all" >
  <span>共&nbsp;<i style="font-style: normal;">{{total}}</i>&nbsp;条</span>
  <template>
    <!-- 分页 -->
    <div class="block" id="vaccine_list1">
      <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      v-if="total<=5?false:true"
      ref = "fenye">
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</template>
<script>
import axios from "axios"
import {familyDoctor,checobox, checkStatus} from "./../../common/util.js"
export default {
  data() {
    return {
      centerDialogVisible: false,
      search: "",
      value: [],
      id:"",
      disabled:false,
      total: "0",    //总页数
      isShow: false,
      data3: [],
      loginId:"",
      token:"",
      currentPage:1,
       fullscreenLoading:false,
      checkBox: {
        checked: false,
        items: []
      },
    };
  },
  watch:{
    $route() {
      this.$router.go(0)
    }

},
  created: function() {
     this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.id=window.localStorage.getItem("id")
    this.requestData();
  },
  methods: {
    //数据交互
    requestData: function() {
      let _this = this;
       checkStatus(_this)
      let url = familyDoctor();
      axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:1,
        status:0,
        pageNum:1,
        pageSize:5
      }).then(function(response) {
        
        let listArray = response.data.data.list;
        _this.data3 = listArray;
        _this.total = response.data.data.total;
      })
    },
    //驳回
    returnData: function(item, index) {
      let _this = this;
       checkStatus(_this)
      let url = familyDoctor();
      this.$confirm("此操作将驳回该体检人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          axios.post(url + "/wcfy/Reservation/updateStatus?loginId="+_this.loginId+"&token="+_this.token,{
            id:item.id,
            order_Status:2
          }).then(response => {
            console.log(response)
               this.$message({
                message:response.data.message,
                type: 'success'
              });
              this.requestData();
            });
        }).catch(() => {
          this.requestData();
        });
    },
    //确定
    SureData: function(item, index) {
      let _this = this;
       checkStatus(_this)
      let url = familyDoctor();
      this.$confirm("体检人是否完成体检, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          axios.post(url + "/wcfy/Reservation/updateStatus?loginId="+_this.loginId+"&token="+_this.token,{
            id:item.id,
            order_Status:1
          }).then(response => {
            console.log(response)
               this.$message({
                message:response.data.message,
                type: 'success'
              });
              this.requestData();
            });
        }).catch(() => {
          this.requestData();
        });
    },
    //分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
       checkStatus(_this)
      if(!_this.search){
         axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:1,
        status:0,
        pageNum:val,
        pageSize:5
      }).then(function(response) {
          _this.data3 = response.data.data.list;
          _this.total = response.data.data.total;
        });
      }else{
        axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:1,
        status:0,
        pageNum:val,
        pageSize:5,
        searchKey:_this.search
      }).then(function(response) {
        _this.data3 = response.data.data.list;
        _this.total=response.data.data.total;
      });
     }

   },
    // 搜索
    Search: function() {
      let url = familyDoctor();
      let _this = this;
       checkStatus(_this)
      axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:1,
        status:0,
        pageNum:1,
        pageSize:5,
        searchKey:_this.search
      }).then(function(response) {
        _this.data3 = response.data.data.list;
        _this.total=response.data.data.total
      });
    }
  },
  computed: {
    familyDoctor,
     checkStatus
  },
  components: {

  }
};
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
  width: 11%; 
}
.listhead li:nth-of-type(2){
  width: 20%;  
}
.listhead li:nth-of-type(3),.listhead li:nth-of-type(4){
  width: 14%; 
}
.listhead li:nth-of-type(6){
  width: 15%;  
}
.listhead li:nth-of-type(7){
  width: 13.6%;
  cursor: pointer;
}
.Sure,.Return{
 width: 50%;
 float: left;
 color: #fb8ca6
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
.all span i {
  color: #fb8ca6;
}
.dialog-footer{
  display: block;
  width: 100%;
  height: 100%;
}
</style>
