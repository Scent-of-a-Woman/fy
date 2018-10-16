<template>
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
   <div class="goschool-nav">   
    <div class="search-Input">
      <input type="text" v-model="search" placeholder="体检人姓名/身份证号">
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
      <li>失效时间</li>
      <li>手机号码</li>
      <li>操作</li>
    </ul>
    <ul  class="listhead font_color" v-for="(item,index) in data3">
      <li>{{item.physicalName}}</li>
      <li>{{item.physicalidcard}}</li>
      <li>{{item.create_time}}</li>
      <li>{{item.order_time}}</li>
      <li>{{item.phone}}</li>  
      <li>
          <div class="Sure" @click="SureData(item,index)">确定</div>
          <div class="Return" @click="returnData(item,index)">驳回</div>
      </li>
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
        :page-size="5"
        v-if="total <= 5 ? false:true"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </template>
</div>
</div>
</div>
</template>

<script >
import axios from "axios";
import {familyDoctor,getLastDate2,checobox,checkStatus} from "./../../common/util.js";
export default {
  data() {
    return {
      search: "",
      disabled:false,
      dialogVisible:false,
      url:familyDoctor(),
      data3: [],
      id:"",
      radio:'',
      total: 0,   // 分页总数
      value1:'',
      token:"",
      loginId:"",
      fullscreenLoading:false
    };
  },
  created: function() {
    this.token = window.localStorage.getItem("token");
    this.loginId = window.localStorage.getItem("loginId");
    this.id=window.localStorage.getItem("id")
    this.request();
  },
  watch:{
    $route() {
      this.$router.go(0)
    },
    dialogVisible:function(){
      this.radio = ''
    }
  },
  methods: {
    //数据交互
    request: function() {
      let _this = this;
       checkStatus(_this)
      let url=familyDoctor()
      axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:2,
        status:0,
        pageNum:1,
        pageSize:5
      }).then(function(response) {
        console.log(response)
        let listArray = response.data.data.list;
        _this.data3 = listArray;
        _this.total = response.data.data.total;
        _this.value1 = ''
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
           order_Status:1,
          }).then(response => {
            console.log(response)
               this.$message({
                message:response.data.message,
                type: 'success'
              });
              this.request();
            });
        }).catch(() => {
          this.request();
        });
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
              this.request();
            });
        }).catch(() => {
          this.request();
        });
    },
    // 分页
    handleCurrentChange: function(val) {
      let _this = this;
       checkStatus(_this)
      let url=familyDoctor()
      if (!_this.search) {
       axios.post(_this.url+"/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,
       {
         order_type:2,
         status:0,
         pageNum:val,
         pageSize:5
       }).then(function(response){
        _this.data3=response.data.data.list
        _this.total = response.data.data.total
      })
     } else {
       axios.post(_this.url+"/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,
       {
         order_type:2,
         status:0,
         pageNum:1,
         pageSize:5,
         searchKey:_this.search
       }).then(function(response) {
        _this.data3 = response.data.data.list;
        _this.total = response.data.data.total;
      });
     }
    }, 
    // 搜索
    Search:function(){
      let _this = this;
       checkStatus(_this)
      let url=familyDoctor()
      axios.post(url + "/wcfy/Reservation/findAllByOrderType?loginId="+_this.loginId+"&token="+_this.token,{
        order_type:2,
        status:0,
        pageNum:1,
        searchKey:_this.search,
        pageSize:5
      }).then(function(response) {
        _this.total=response.data.data.total
        _this.data3 = response.data.data.list;
      });
      // let s = _this.$refs.checkboxs;
      // checobox(s);
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
.listhead li:nth-of-type(1){
  width: 12%; 
}
.listhead li:nth-of-type(2){
  width: 25%;  
}
.listhead li:nth-of-type(3),.listhead li:nth-of-type(4){
  width: 15%; 
}
.listhead li:nth-of-type(5){
  width: 16.8%;  
}
.listhead li:nth-of-type(6){
  width: 15%;  
  margin-right:0;
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
#make > div{
  margin-left: 39px;
  margin-top: 22px;
  position: absolute;
}
.tick{
  height: 162px;
  width: 5%;
  margin-left: 1%;
  float: left;
  background-color: white;
  text-align: center;
}
#set_time{
  width: 230px;
  height: 27px;
}

#tick > div > div.el-dialog__body > div:nth-child(2){
  margin-top: 20px
}
.text_phone{
  margin-top:20px;
  text-align: left;
}
.text_phone >span{
  margin-right: 10px;
  margin-left: 2px;
}
.text_intro p{
  width: 60.14px;
  float: left;
}
.text_intro p:last-of-type{
 line-height: 23px
}
.text_intro textarea{
  width: 208px;
  resize: none;
  padding: 3px 10px;
  border-color: #bfcbd9
}
.el-button--primary{
  float: left
}
</style>