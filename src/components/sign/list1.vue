<template>  
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading">   
    <div class="goschool-nav">   
      <div class="nav-date">
        <el-button type="text" @click="dialogVisible = true">条件搜索</el-button>
        <template>
          <div class="excel_grid" @click="dateValue = !dateValue">导出EXCEL
          </div>
          <div class="export" v-if="dateValue">
            <div class="block" style="margin-right:30px;">
              <span class="demonstration">起始日期</span>
              <el-date-picker
              v-model="value3"
              type="date"
              placeholder="起始日期"
              >
            </el-date-picker>
          </div>
          <span>至</span>
          <div class="block">
            <span class="demonstration">截止日期</span>
            <el-date-picker
            v-model="value4"
            type="date"
            placeholder="截止日期">
          </el-date-picker>
        </div>
        <div class="export_but">
          <p>将导出此段时间内的<span>{{exportApi.title}}</span>数据</p>
          <el-button type="primary" @click="exportTable">确认</el-button>
          <el-button @click="dateValue = false" class="reset">取消</el-button>
        </div>
      </div>
    </template>
    <el-dialog
    title="按条件查询"
    :visible.sync="dialogVisible">
    <div>
      <div class="tipDate">开始时间(预约时间)</div>
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
<div class="text_phone">
  <span class="font_color">
    寄送报告
  </span>
  <el-radio-group v-model="radio">
    <el-radio label="2" >是</el-radio>
    <el-radio label="1" >否</el-radio>
  </el-radio-group>
</div>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="dialogVisible = false;termSearch(value1,value2)">确 定</el-button>
  <el-button @click="dialogVisible = false">取 消</el-button>
</span>
</el-dialog>
</div>
<div class="search-Input">
  <input type="text" placeholder="体检人姓名/身份证号" v-model="search">
</div>
<div class="search-icon" @click="Serach()">
  <img src="../../assets/images/search.png" height="30" width="30">
</div>
</div>
<!--search end -->
<div class="content">
  <ul  class="listhead">
    <li>体检人姓名</li>
    <li>体检人身份证号</li>
    <li>提交时间</li>
    <li>预约时间</li>
    <li>母亲/监护人</li>
    <li>手机号码</li>
    <li>报告寄送</li>
  </ul>
  <ul  class="listhead font_color" v-for="(item,index) in data3">
    <li>{{item.physicalName}}</li>
    <li>{{item.physicalidcard}}</li>
    <li>{{item.create_time}}</li>
    <li>{{item.order_time}}</li>
    <li>{{item.orderName}}</li>
    <li>{{item.phone}}</li>  
    <li v-show="item.is_express==1?true:false">是</li>
    <li v-show="item.is_express==0?true:false">否</li>
  </ul>
</div>
<div class="all" >
  <span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>

  <!-- 分页 -->
  <template>
    <div class="block" id="signlist1">
      <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      v-if="total <= 5 ? false:true"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</div>      
</template>
<script>
import axios from "axios";
import paging from "./../../common/paging.vue";
import blurseach from "./../../common/blurseach.vue";
import { familyDoctor, getLastDate,checkStatus } from "./../../common/util.js";
import bus from "../../bus";
export default {
  data() {
    return {
      dateValue:false,
      total: 0,
      id: "",
      token:"",
      loginId:"",
      search:"",
      value1: "",
      value2:"",
      value3:"",  //  开始日期
      value4:"",  //  截止日期
      startDate:"",
      endDate:"",
      data3:[],
      radio:'',
      dateStart:"",
      fullscreenLoading:false,
      url:familyDoctor(),
      dialogVisible: false,
      exportApi: { api: "/wcfy/excle/rytjExcle", title: "预约" }
    };
  },
  watch: {
    $route() {
      this.$router.go(0)
    },

  },
  methods: {
     // 导出表格
     exportTable:function(){
      let _this =this;
      checkStatus(_this)
      let begindate = getLastDate(_this.value3);
      let enddate = getLastDate(_this.value4);
      let url=familyDoctor() +_this.exportApi.api;
      if(_this.value3 != "" && _this.value4 != ""){
        _this.fullscreenLoading = true;
           setTimeout(() => {
            _this.fullscreenLoading = false;
            axios.get(url + "?beginDate="+begindate+"&endDate="+enddate+"&token="+_this.token+"&loginId="+_this.loginId+"&orderStatus="+0)
            .then(function(response){

             if(window.navigator.userAgent.indexOf('AppleWebKit') == 36) {
              window.open(response.config.url)
            }else{
              window.location.href = response.config.url
            }
          });
          }, 2000);
        this.dateValue = false;
        return
      }else{
        _this.dateValue = true;
        _this.$message.error('请选择正确日期');
        return
      }
    },
        // 请求数据
        request: function() {
          let url = familyDoctor();
          let _this = this;
          checkStatus(_this)
          axios.post(_this.url+"/wcfy/rytj/findInfoByOrderStatus?loginId="+_this.loginId+"&token="+_this.token,
          {
            orderStatus:0,
            pageSize:5,
            pageNum:1
          }).then(function(response){
            _this.data3 = response.data.data.list;
            _this.total = response.data.data.total;
          })

        },
  // 条件查询
  termSearch:function(){
     let url = familyDoctor();
      let _this = this;
      checkStatus(_this)
      _this.startTime = getLastDate(arguments[0])
      _this.endTime = getLastDate(arguments[1])

     // if(_this.startTime==""||_this.endTime==""||_this.radio==""){
     //    this.dialogVisible = true
     //    this.$message("请选择查询条件")
     //    return
     // }
     axios.post(_this.url+"/wcfy/rytj/findInfoByOrderStatus?loginId="+_this.loginId+"&token="+_this.token,
          {
              orderStatus:0,
              pageSize:5,
              pageNum:1,
              beginDate:_this.startTime,
              endDate:_this.endTime,
              tranckStatus:_this.radio
         }).then(function(response) {
          
        _this.data3 = response.data.data.list;
        _this.total = response.data.data.total;
      });
   },
  // 分页
  handleCurrentChange: function(val) {
    let url = familyDoctor();
    let _this = this;
    checkStatus(_this)
    if(_this.radio!=""||_this.value2!=""||_this.value1!=""){
      axios.post(_this.url+"/wcfy/rytj/findInfoByOrderStatus?loginId="+_this.loginId+"&token="+_this.token,
      {
        orderStatus:0,
        pageSize:5,
        pageNum:val,
        beginDate:_this.startTime,
        endDate:_this.endTime,
        tranckStatus:_this.radio
      }).then(function(response) {
        _this.data3 = response.data.data.list;
        _this.total = response.data.data.total;
      });
    } else{
     axios.post(_this.url+"/wcfy/rytj/findInfoByOrderStatus?loginId="+_this.loginId+"&token="+_this.token,
     {
      orderStatus:0,
      pageSize:5,
      pageNum:val,
      searchKey:_this.search
    }).then(function(response) {
      _this.data3 = response.data.data.list;
      _this.total = response.data.data.total;
    });
  }
},
    // 搜索
    Serach: function() {
      let url = familyDoctor();
      let _this = this;
      checkStatus(_this)
      axios.post(_this.url+"/wcfy/rytj/findInfoByOrderStatus?loginId="+_this.loginId+"&token="+_this.token,
      {
        orderStatus:0,
        pageSize:5,
        pageNum:1,
        searchKey:_this.search
      }).then(function(response) {
        _this.data3 = response.data.data.list;
        _this.total = response.data.data.total;
      });
    }

  },

  created: function() {
   this.token = window.localStorage.getItem("token");
   this.loginId = window.localStorage.getItem("loginId");
   this.id = window.localStorage.getItem("id");
   this.request();
 },
 computed: {
  familyDoctor,
  checkStatus
},
components: {
  blurseach
}
};
</script>
<style lang="css" scoped>
.el-date-editor.el-input,.el-input__icon+.el-input__inner{
  height: 35px;
  width: 230px;
}
.text_phone{
  margin-top:20px;
  text-align: left;
}
.text_phone >span{
  margin-right: 10px;
  margin-left: 2px;
}
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
  width: 100px;
  padding: 0;
  color: white;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 20px;
  float: left;
  background-color: #fb8ca6;
}
.excel{
 height: 50px;
 width: 100px;
 padding: 0;
 color: white;
 font-size: 14px;
 margin-top: 10px;
 margin-left: 20px;
 background-color: #fb8ca6;
 float: left;
 border-radius: 5px;
 text-align: center;
 line-height: 50px;
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
.list_color li{
  color: black;
}
.listhead li:nth-of-type(1),.listhead li:nth-of-type(5){
  width: 10%; 
}
.listhead li:nth-of-type(2){
  width: 18%;  
}
.listhead li:nth-of-type(3),.listhead li:nth-of-type(4){
  width: 17%; 
}
.listhead li:nth-of-type(6){
  width: 15%;  
}
.listhead li:nth-of-type(7){
  width: 11.6%
}
.listhead li:nth-of-type(8){
  width: 11.6%
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
.input_one{
  margin-left: 24px
}
.tipDate{
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  color:  #b7b7b7;
}

.search_grid{
  height:50px;
  display:inline-block;
}

.search_grid input{
  outline:none;
  width:255px;
  height:48px;
  border:1px solid #fb8ca6;
  float:left;
}
.search_grid span{
  display:inline-block;
  height:48px;
  width:50px;
  color:#fff;
  text-align:center;
  border:1px solid #fb8ca6;
  float:left;
  cursor:pointer;
  position: absolute;
  right: -51px;
  top: 0;
}
.search_grid span img{
  margin-top:12px;
}
.excel_grid{
  width:100px;
  height:50px;
  background-color:#fb8ca6;
  color:white;
  font-size:15px;
  text-align:center;
  line-height:50px;
  float:left;
  cursor:pointer;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 5px;
}

/*搜索栏结束*/
/*日期样式*/ 
.export{
  width: 456px;
  height: 220px;
  position: absolute;
  top: 75px;
  left: 0px;
  background-color: #fff;
  z-index: 2;
  box-shadow:0px 0px 6px 3px #dadada;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  line-height:50px;
}
.export>span{
  position: absolute;
  color: #000;
  font-size: 14px;
  top: 50px;
  left: 214px;
}

.export .block{
  width: 45%;
  text-align: left;
  height: 100px;
}
.export .block >div{
  line-height: 20px;
  width: 100%;
}
.export .block >div i{
  left: 0;
}
.export .block span{
  font-size: 14px;
  color: #6a6a6a;
}
.export .block div >input{
  width: 188px;
  padding: 10px 30px;
}
.export .export_but{
  width: 100%;
  text-align: center;
}
.export .export_but > button{
  width: 140px;
  height: 34px;
}
.export .export_but >p{
  color: #6a6a6a;
}
.export .export_but >p >span{
  color: #20a0ff;
}
.el-button{
  line-height: 0px;
}
#app > div.goschool-nav > div.nav-date > div.el-dialog__wrapper > div > div.el-dialog__footer > span> button{
      height: 35px
}
</style>