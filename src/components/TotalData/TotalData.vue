<template>
<div id="app"  v-loading.fullscreen.lock="fullscreenLoading">
	<div class="school-check">
		<div class="data-icon">
			<div class="icon-img">
				<img src="../../assets/images/ry.png">
			</div>
			<div class="tip">入园体检</div>
		</div>
		<div class="today">
			<ul class="data-ul">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name">今日预约</li>
						<li class="data-num"><span>{{totaldata.rytjOrderToday}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style">今日完成</li>
						<li class="data-num text-style"><span>{{totaldata.rytjCompleteToday}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="total-data">
			<ul class="data-ul totallist">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name font-style">总预约</li>
						<li class="data-num font-style"><span>{{totaldata.rytjOrderTotal}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style font-style">总完成</li>
						<li class="data-num text-style font-style"><span>{{totaldata.rytjCompleteTotal}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="heart-check">
		<div class="data-icon">
			<div class="icon-img">
				<img src="../../assets/images/xx.png">
			</div>
			<div class="tip">先心筛查</div>
		</div>
		<div class="today">
			<ul class="data-ul">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name">今日预约</li>
						<li class="data-num"><span>{{totaldata.xtxOrderToday}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style">今日完成</li>
						<li class="data-num text-style"><span>{{totaldata.xtxCompleteToday}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="total-data">
			<ul class="data-ul totallist">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name font-style">总预约</li>
						<li class="data-num font-style"><span>{{totaldata.xtxOrderTotal}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style font-style">总完成</li>
						<li class="data-num text-style font-style"><span>{{totaldata.xtxCompleteTotal}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="tang-check">
		<div class="data-icon">
			<div class="icon-img">
				<img src="../../assets/images/ts.png">
			</div>
			<div class="tip">唐氏筛查</div>
		</div>
		<div class="today">
			<ul class="data-ul">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name">今日预约</li>
						<li class="data-num"><span>{{totaldata.tsOrderToday}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style">今日完成</li>
						<li class="data-num text-style"><span>{{totaldata.tsCompleteToday}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="total-data">
			<ul class="data-ul totallist">
				<li class="list">
					<ul class="list-ul">
						<li class="data-name font-style">总预约</li>
						<li class="data-num font-style"><span>{{totaldata.tsOrderTotal}}</span></li>
					</ul>
				</li>
				<li class="list">
					<ul class="list-ul">
						<li class="data-name text-style font-style">总完成</li>
						<li class="data-num text-style font-style"><span>{{totaldata.tsCompleteTotal}}</span></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>		
</div>
</template>
<script>
import axios from 'axios'
import {familyDoctor,checkStatus} from "../../common/util.js"
import iniTimg from '../../assets/images/image.png'
export default{
	data(){
		return{
		  token:"",
          loginId:"",
		  totaldata:[],
		   fullscreenLoading:false
		}
	},
	created: function() {
		 this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
		this.requestData();
	
	},
	watch: {
		$route() {
			this.$router.go(0)
		}
	},
	methods:{
		//  正则
		// judge:function(val){
		// 	let reg=/^1\d{10}$/
		// 	if(reg.test(val)&&val!=null){
		// 		return
		// 	}else{
		// 		this.$message("请输入正确的手机号码");
		// 	}
		// }
		requestData:function(){

			let url = familyDoctor();
			checkStatus(this)
			axios.post(url + "/wcfy/data/dataStatistics?loginId="+this.loginId+"&token="+this.token).then(response=>{
				this.totaldata=response.data.data
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
.school-check,.heart-check,.tang-check{
	width: 100%;
	height: 185px;
	padding-top: 45px;
	background-color: white;
}
.heart-check,.tang-check{
	margin-top: 10px;
}
.data-icon{
	width: 18.5%;
	height: 130px;
	float: left;
	padding-top: 20px;
	border-right:1px solid #dcdcdc; 
}
.icon-img{
	height: 75px;
	width: 75px;
	margin: auto;
}
.tip{
	text-align: center;
	color: #888;
	font-size: 16px;
	margin-top: 10px;
}
.today{
	width: 40.3%;
	height: 150px;
	float: left;
	border-right:1px solid #dcdcdc; 
}
.total-data{
	width: 40.2%;
	height: 150px;
	float: left;
}
.data-ul{
	width: 225px;
	height: 70px;
	margin:auto;
	margin-top: 40px;
}
.list,.data-name,.data-num{
	float: left;
}
.list{
	width: 50%;
}
.list-ul{
	height: 70px;
}
.list-ul li{
	width: 100%;
	height: 35px;
	text-align: center;
}
.data-name{
	font-size: 16px;
	color: #888;
	line-height: 35px;
}
.data-num{
	
}
.data-num span{
	display: block;
	width: 80%;
	margin: auto;
	font-size: 30px;
	font-family: "\96B6\4E66"!important;
	color: #fb8ca6;
	font-weight: 700;
	white-space: nowrap;
	text-align: center;
}
.text-style{
	text-align: right
}
.totallist{
	width: 300px;
}
.font-style{
	text-align: center;
}
.heart-check li.data-num{
	color: #7ecef4;
}
.tang-check li.data-num{
	color:  #2bbd70;
}
</style>
