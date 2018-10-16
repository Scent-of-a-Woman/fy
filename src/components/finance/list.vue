<template>
	<div id="app" v-loading.fullscreen.lock="fullscreenLoading">
		<div style="height:71px; background-color:white;width:100%;position: relative;" class="nav-date"> 

			<el-button type="text" @click="dialogVisible = true" class="searchDate">条件搜索</el-button>
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
<!--右边侧栏 -->
<div class="contain">
	<div class="content">
		<ul class="listhead">
			<li>姓名</li>
			<li>支付宝交易号</li>
			<li>交易金额</li>
			<li>交易信息</li>
			<li>支付宝帐号</li>
			<li>交易完成时间</li>
		</ul>
		<ul class="listhead font_color" v-for="item in data3">
			<li>{{item.badyname}}</li>
			<li>{{item.tradeNo}}</li>
			<li>66</li>
			<li>入园体检缴费</li>
			<li>{{item.buyerLogonId}}</li>
			<li>{{item.peTime}}</li>
		</ul>
	</div>
	<div class="all">
		<div class="total">
			<span>总收款：<i>{{totalAmount}}</i>&nbsp;元</span>
		</div>
		<span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>
		<template>
			<div class="block" id="sign_page">
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
<script>
import {searchData,familyDoctor,getLastDate,checkStatus} from "./../../common/util.js"
import blurseach from "./../../common/blurseach.vue"
import axios from "axios"
import bus from '../../bus'
export  default{
	data(){
		return{
			dialogVisible: false,
			data3:[],
			total:"0",
			token:"",
			loginId:"",
			value1:"",
			value2:"",
			startTime:"",
			endTime:"",
			radio:"",
			 value3:"",  //  开始日期
      value4:"",  //  截止日期
			totalAmount:"",
			fullscreenLoading:false,
			dateValue:false,
			exportApi: { api: "/wcfy/excle/accountExcle", title: "体检" }

		}
	},
	created:function(){
		this.token = window.localStorage.getItem("token");
		this.loginId = window.localStorage.getItem("loginId");
		this.requestData()
	},
	watch: {
		$route() {
			this.$router.go(0)
		}
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
            axios.get(url + "?beginDate="+begindate+"&endDate="+enddate+"&token="+_this.token+"&loginId="+_this.loginId)
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
		// 数据请求
		requestData:function(){
			let _this=this
			checkStatus(_this)
			let url=familyDoctor()
			axios.post(url + "/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,{
				is_express:0,
				pageNum:1,
				pageSize:5
			}).then(response=>{
				_this.data3=response.data.data.list
				_this.total=response.data.data.total
				_this.totalAmount=response.data.data.total*66
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
				is_express:0,
				pageSize:5,
				pageNum:1,
				beginDate:_this.startTime,
				endDate:_this.endTime,
			}).then(function(response) {
				console.log(response)
				_this.data3 = response.data.data.list;
				_this.total = response.data.data.total;
				_this.totalAmount=response.data.data.total*66
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
					is_express:0,
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
				axios.post(url+"/wcfy/account/findAccount?loginId="+_this.loginId+"&token="+_this.token,
				{
					is_express:0,
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
	},
	components:{

	}
}
</script>
<style scoped>
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
.font_color li{
	color: #5f5f5f;
}
.list_color li{
	color: black;
}
.listhead li:nth-of-type(1){
	width: 8.9%; 
}
.listhead li:nth-of-type(2){
	width: 29%; 
}
.listhead li:nth-of-type(3){
	width: 10%;  
}
.listhead li:nth-of-type(4){
	width: 14%; 
}
.listhead li:nth-of-type(5){
	width: 20%;  
}
.listhead li:nth-of-type(6){
	width: 16.9%
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
	margin-top: 10px;
	text-align: center;
}
.all  span i{
	color: #fb8ca6;
}
.content_list li{
	font-size: 16px;
}
.tipDate{
	height: 25px;
	line-height: 25px;
	font-size: 15px;
	color:  #b7b7b7;
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
  width: 180px!important;
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
#app > div.goschool-nav > div.nav-date > div.el-dialog__wrapper > div > div.el-dialog__footer > span> button{
      height: 35px
}
.el-date-editor.el-input{
	width: 230px!important;
}
.searchDate:hover{
	border-color: #fb8ca6;
}
</style>