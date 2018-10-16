<template>
	<div id="app" v-loading.fullscreen.lock="fullscreenLoading">
		<div style="height:81px; background-color:white;width:100%;position: relative;" class="nav-date">   
			<el-button type="text" @click="dialogVisible = true" class="searchDate">条件搜索</el-button>
      <el-dialog
      title="按条件查询"
      :visible.sync="dialogVisible"
     >
      <div>
        <div class="tipDate">开始时间</div>
        <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div>
      <div class="tipDate">结束时间</div>
      <el-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false;termSearch(value1,value2)">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>

</div>

<div class="contain">
 <div class="content">
  <ul class="listhead">
   <li>支付宝交易号</li>
   <li>交易金额</li>
   <li>交易信息</li>
   <li>支付宝账号</li>
   <li>交易完成时间</li>
 </ul>
 <ul class="font_color listhead" v-for="item in data3">
   <li>{{item.tradeNo}}</li>
   <li>{{item.receiptAmount}}</li>
   <li>快递费</li>
   <li>{{item.buyerLogonId}}</li>
   <li>{{item.gmtPayment}}</li>
 </ul>
</div>
<div class="total">
  <span>总收款：<i>{{totalAmount}}</i>&nbsp;元</span>
</div>
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
<script>
import axios from "axios";
import { familyDoctor, getLastDate,checkStatus } from "./../../common/util.js";
import bus from "../../bus";
export default {
  data() {
    return {
      dialogVisible: false,
      value2: "",
      total: 0, //总页数
      totalAmount: "0", //总收款
      data3: [],       //展示数据
      url: familyDoctor(), // 统一api
      id:"",
       fullscreenLoading:false,
      value1:"",
      token:"",
      loginId:"",           //院长id
      startTime:"",
      endTime:""
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
    this.requestData()
  },
  methods: {
    requestData: function() {
      let _this = this;
       checkStatus(_this)
      let url = familyDoctor();
      axios.post(url + "/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,{
        is_express:1,
        pageNum:1,
        pageSize:5
      }).then(response=>{
        _this.data3=response.data.data.list
        _this.total=response.data.data.total
        _this.totalAmount=response.data.data.total*11
      })
    },
    // 搜索
    termSearch:function(){
      let url = familyDoctor();
      let _this = this;
       checkStatus(_this)
        _this.startTime = getLastDate(arguments[0])
      _this.endTime = getLastDate(arguments[1])
        if(_this.startTime==""||_this.endTime==""){
        this.dialogVisible = true
        this.$message("请选择查询条件")
        return
     }
     
      axios.post(url+"/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,
      {
        is_express:1,
        pageSize:5,
        pageNum:1,
        beginDate:_this.startTime,
        endDate:_this.endTime,
      }).then(function(response){
        _this.data3 = response.data.data.list;
        _this.total = response.data.data.total;
        _this.totalAmount=response.data.data.total*11
      });
    },
    // 分页
    handleCurrentChange:function(val){
      let url = familyDoctor();
      let _this = this;
       checkStatus(_this)
      if(_this.radio!=""||_this.value2!=""||_this.value1!=""){
        axios.post(url+"/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,
        {
          is_express:1,
          pageSize:5,
          pageNum:val,
          beginDate:_this.startTime,
          endDate:_this.endTime,
          tranckStatus:_this.radio
        }).then(function(response) {
          // console.log(response)
          _this.data3 = response.data.data.list;
          _this.total = response.data.data.total;
        });
      } else{
        axios.post(url+"/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,
        {
          is_express:1,
          pageSize:5,
          pageNum:val
        }).then(function(response) {
          _this.data3 = response.data.data.list;
          _this.total = response.data.data.total;
        });
      }
    }
  },
  computed: {
    familyDoctor,
     checkStatus
  }
};
</script>
<style scoped>
.nav-date .el-button--text{
  height: 50px;
  width: 147px;
  padding: 0;
  color: white;
  font-size: 14px;
  margin-top: 15px;
  margin-left: 20px;
  background-color: #fb8ca6;
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
.listhead li:nth-of-type(2){
   width: 12%;
}
.listhead li:nth-of-type(3){
  width: 19%; 
}
.listhead li:nth-of-type(1){
  width: 30%;  
}
.listhead li:nth-of-type(4),.listhead li:nth-of-type(5){
  width: 19%; 
}
.total {
  margin:30px 0 10px 0;
  text-align: center;
  font-size: 15px;
}
.total span{
  margin: 0 20px;
}
.total span i {
  color: #fb8ca6;
  font-style: normal;
}
.total > div{
  margin-top: 8px;
}
.all {
  width:100%;
  float: left;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
}
.all span {
  display: inline-block;
  margin: auto;
  width: 70%;
  text-align: center;
}
.all .shou,.all .tui{
  width: 15%;
}
.all .tui{
  margin-left: 2%
}
.all span i {
  color: #fb8ca6;
}
.tipDate{
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  color:  #b7b7b7;
}
.el-date-editor.el-input{
  width: 230px!important;
}
.searchDate:hover{
  border-color: #fb8ca6;
}
</style>