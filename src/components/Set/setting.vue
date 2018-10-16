<template>
	<div id="app" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="school-check">
			<div class="setinfo">
				<span></span>
				<h6>入园体检</h6>
			</div>
			<div class="setting">
				<div class="setdate">
					<div>星期</div>
					<ul>
						<li v-for="(item,index) in week" @click="vacWeek(item)" v-bind:class="{ active: item.isActive }">
							{{item.num}}
						</li>
					</ul>
				</div>
				<div class="settime">
					<ul class="am">
						<li>上午</li>
						<li>
							<el-time-select
							class="startTime"
							placeholder="起始时间"
							v-model="value1"
							:picker-options="{
							start: '08:30',
							step: '00:30',
							end: '11:30'}">
						</el-time-select>
					</li>
					<li>
						<span>至</span>
						<el-time-select
						placeholder="结束时间"
						class="endTime"
						v-model="value2"										
						:picker-options="{
						start: '08:30',
						step: '00:30',
						end: '11:30',
						minTime: value1
					}">
				</el-time-select>
			</li>
			<li>
				<input type="text" name="" placeholder="人数" maxlength=3 v-model="SorderMCount"> 
			</li>
		</ul>
		<ul class="pm">
			<li>下午</li>
			<li>
				<el-time-select
				class="startTime"
				placeholder="起始时间"
				v-model="value3"
				:picker-options="{
				start: '14:00',
				step: '00:30',
				end: '17:00'
			}">
		</el-time-select>
	</li>
	<li>
		<span>至</span>
		<el-time-select
		placeholder="结束时间"
		class="endTime"
		v-model="value4"										
		:picker-options="{
		start: '14:00',
		step: '00:30',
		end: '17:00',
		minTime: value3
	}">
</el-time-select>
</li>
<li>
	<input type="text" name="" placeholder="人数" maxlength=3 v-model="SorderACount">
</li>
</ul>
</div>
<div class="sure_select">
	<div @click="SstorageSet">保存</div>
</div>
</div>
<div class="setstatus">
	<ul class="setStatus">
		<li>
			<div>已设置 : </div>
			<div>{{Schooldata.orderDays}}</div>
		</li>
		<li>
			<div>上午 : </div>
			<div>{{Schooldata.orderMTime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{Schooldata.orderMCount}}</div>
		</li>
		<li>
			<div>下午 : </div>
			<div>{{Schooldata.orderATime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{Schooldata.orderACount}}</div>
		</li>
		<li @click="rest" class="rest">重置</li>
	</ul>
</div>
</div>
<div class="heart-check">
	<div class="setinfo">
		<span></span>
		<h6>先心筛查</h6>
	</div>
	<div class="setting">
		<div class="setdate">
			<div>星期</div>
			<ul class="service">
				<li v-for="(item,index) in weeks" @click="vacWeek(item)" v-bind:class="{ active: item.isActive }">
					{{item.num}}
				</li>
			</ul>
		</div>
		<div class="settime">
			<ul class="am">
				<li>上午</li>
				<li>
					<el-time-select
					class="startTime"
					placeholder="起始时间"
					v-model="value5"
					:picker-options="{
					start: '08:30',
					step: '00:30',
					end: '11:30'}">
				</el-time-select>
			</li>
			<li>
				<span>至</span>
				<el-time-select
				placeholder="结束时间"
				class="endTime"
				v-model="value6"										
				:picker-options="{
				start: '08:30',
				step: '00:30',
				end: '11:30',
				minTime: value5
			}">
		</el-time-select>
	</li>
	<li>
		<input type="text" name="" placeholder="人数" maxlength=3 v-model="XorderMCount">
	</li>
</ul>
<ul class="pm">
	<li>下午</li>
	<li>
		<el-time-select
		class="startTime"
		placeholder="起始时间"
		v-model="value7"
		:picker-options="{
		start: '14:00',
		step: '00:30',
		end: '17:00'
	}">
</el-time-select>
</li>
<li>
	<span>至</span>
	<el-time-select
	placeholder="结束时间"
	class="endTime"
	v-model="value8"										
	:picker-options="{
	start: '14:00',
	step: '00:30',
	end: '17:00',
	minTime: value7
}">
</el-time-select>
</li>
<li>
	<input type="text" name="" placeholder="人数" maxlength=3 v-model="XorderACount">
</li>
</ul>
</div>
<div class="sure_select">
	<div @click="XstorageSet">保存</div>
</div>
</div>
<div class="setstatus">
	<ul class="setStatus">
		<li>
			<div>已设置 : </div>
			<div>{{xxdata.orderDays}}</div>
		</li>
		<li>
			<div>上午 : </div>
			<div>{{xxdata.orderMTime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{xxdata.orderMCount}}</div>
		</li>
		<li>
			<div>下午 : </div>
			<div>{{xxdata.orderATime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{xxdata.orderACount}}</div>
		</li>
		<li @click="restxx" class="rest">重置</li>
	</ul>
</div>
</div>
<div class="tang-check">
	<div class="setinfo">
		<span></span>
		<h6>唐氏筛查</h6>
	</div>
	<div class="setting">
		<div class="setdate">
			<div>星期</div>
			<ul class="service">
				<li v-for="(item,index) in weekss" @click="vacWeek(item)" v-bind:class="{ active: item.isActive }">
					{{item.num}}
				</li>
			</ul>
		</div>
		<div class="settime">
			<ul class="am">
				<li>上午</li>
				<li>
					<el-time-select
					class="startTime"
					placeholder="起始时间"
					v-model="value9"
					:picker-options="{
					start: '08:30',
					step: '00:30',
					end: '11:30'}">
				</el-time-select>
			</li>
			<li>
				<span>至</span>
				<el-time-select
				placeholder="结束时间"
				class="endTime"
				v-model="value10"										
				:picker-options="{
				start: '08:30',
				step: '00:30',
				end: '11:30',
				minTime: value9
			}">
		</el-time-select>
	</li>
	<li>
		<input type="text" name="" placeholder="人数" maxlength=3 v-model="TorderMCount">
	</li>
</ul>
<ul class="pm">
	<li>下午</li>
	<li>
		<el-time-select
		class="startTime"
		placeholder="起始时间"
		v-model="value11"
		:picker-options="{
		start: '14:00',
		step: '00:30',
		end: '17:00'
	}">
</el-time-select>
</li>
<li>
	<span>至</span>
	<el-time-select
	placeholder="结束时间"
	class="endTime"
	v-model="value12"										
	:picker-options="{
	start: '14:00',
	step: '00:30',
	end: '17:00',
	minTime: value11
}">
</el-time-select>
</li>
<li>
	<input type="tel" name="" placeholder="人数" maxlength=3 v-model="TorderACount">
</li>
</ul>
</div>
<div class="sure_select">
	<div @click="TstorageSet">保存</div>
</div>
</div>
<div class="setstatus">
	<ul class="setStatus">
		<li>
			<div>已设置 : </div>
			<div>{{tsdata.orderDays}}</div>
		</li>
		<li>
			<div>上午 : </div>
			<div>{{tsdata.orderMTime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{tsdata.orderMCount}}</div>
		</li>
		<li>
			<div>下午 : </div>
			<div>{{tsdata.orderATime}}</div>
		</li>
		<li>
			<div>人数 : </div>
			<div>{{tsdata.orderACount}}</div>
		</li>
		<li @click="restts" class="rest">重置</li>
	</ul>
</div>
</div>	

</div>
</template>
<script>
	import axios from 'axios'
	import {familyDoctor,axoisPost,axoisPut,checkStatus} from "./../../common/util.js"

	export default{
		data(){
			return{
				fullscreenLoading:false,
				token:"",
				loginId:"",
				value1:"",
				value2:'',
				value3:"",
				value4:"",
				value5:"",
				value6:"",
				value7:"",
				value8:'',
				value9:"",
				value10:"",
				value11:"",
				value12:"",
				SorderACount:"",
				SorderMCount:"",
				XorderACount:"",
				XorderMCount:"",
				TorderACount:"",
				TorderMCount:"",
				week:[{
					num:'一',
					isActive:false
				},{
					num:'二',
					isActive:false
				},{
					num:'三',
					isActive:false
				},{
					num:'四',
					isActive:false
				},{
					num:'五',
					isActive:false
				},{
					num:'六',
					isActive:false
				},{
					num:'日',
					isActive:false
				}],
				weeks:[{
					num:'一',
					isActive:false
				},{
					num:'二',
					isActive:false
				},{
					num:'三',
					isActive:false
				},{
					num:'四',
					isActive:false
				},{
					num:'五',
					isActive:false
				},{
					num:'六',
					isActive:false
				},{
					num:'日',
					isActive:false
				}],
				weekss:[{
					num:'一',
					isActive:false
				},{
					num:'二',
					isActive:false
				},{
					num:'三',
					isActive:false
				},{
					num:'四',
					isActive:false
				},{
					num:'五',
					isActive:false
				},{
					num:'六',
					isActive:false
				},{
					num:'日',
					isActive:false
				}],
				Schooldata:{

				},//入园体检
				xxdata:{

				},//先心
				tsdata:{

				}//唐氏筛查
			}
		},
		methods:{		
			vacWeek:function(item){
				item.isActive = !item.isActive
			},
		// 查询设置
		searchSet:function(){
			let url=familyDoctor()
			let _this=this
			checkStatus(_this)
			axios.post(url+"/wcfy/Service/findAllService?loginId="+this.loginId+"&token="+this.token).then(function(response){
				_this.Schooldata=response.data.data[2]
				_this.SorderACount=_this.Schooldata.orderACount
				_this.SorderMCount=_this.Schooldata.orderMCount
				_this.xxdata=response.data.data[0]
				_this.XorderACount=_this.xxdata.orderACount
				_this.XorderMCount=_this.xxdata.orderMCount
				_this.tsdata=response.data.data[1]
				_this.TorderACount=_this.tsdata.orderACount
				_this.TorderMCount=_this.tsdata.orderMCount
				_this.value1=_this.Schooldata.orderMTime.split("-")[0]
				_this.value2=_this.Schooldata.orderMTime.split("-")[1]
				_this.value3=_this.Schooldata.orderATime.split("-")[0]
				_this.value4=_this.Schooldata.orderATime.split("-")[1]
				_this.value5=_this.xxdata.orderMTime.split("-")[0]
				_this.value6=_this.xxdata.orderMTime.split("-")[1]
				_this.value7=_this.xxdata.orderATime.split("-")[0]
				_this.value8=_this.xxdata.orderATime.split("-")[1]
				_this.value9=_this.tsdata.orderMTime.split("-")[0]
				_this.value10=_this.tsdata.orderMTime.split("-")[1]
				_this.value11=_this.tsdata.orderATime.split("-")[0]
				_this.value12=_this.tsdata.orderATime.split("-")[1]
			})
		},
		// 保存设置
		SstorageSet:function(){
			let url=familyDoctor()
			let _this=this
			checkStatus(_this)
			let m_time1=_this.value1
			let m_time2=_this.value2
			let a_time1=_this.value3
			let a_time2=_this.value4
			let order_m_time=m_time1+"-"+m_time2
			let order_a_time=a_time1+"-"+a_time2
			let order_days=""
			_this.week.forEach(function(item,i){
				if(item.isActive){
					order_days += item.num+","
				}		
			})
			order_days = order_days.substr(0,order_days.length-1)
			if(order_m_time=="-"){
				order_m_time=""
			}
			if(order_a_time=="-"){
				order_a_time=""
			}
			if(order_days==""){
				this.$message("请设置服务周期！")
				return
			}
			if(_this.value1&&_this.value2){
				if(_this.SorderMCount==""){
					this.$message("请设置！")
					return
				}
			}
			
			if(_this.value1==undefined||_this.value2==undefined||_this.value1==""||_this.value2==""){
					this.$message("请设置！")
					return
			}
			if(_this.value3&&_this.value4){
				if(_this.SorderACount==""){
					this.$message("请设置！")
					return
				}
			}
			// if(a_time1){
			// 	console.log(a_time2)
			// 	if(a_time2==""){
			// 		this.$message("请设置正确的服务配置！")
			// 		return
			// 	}
			// }
			// if(a_time2){
			// 	console.log(a_time2)
			// 	if(a_time1==""){
			// 		this.$message("请设置正确的服务配置！")
			// 		return
			// 	}
			// }
			let reg=/^[0-9]\d*$/;
			if(_this.SorderMCount==null||_this.SorderMCount==""){
				_this.SorderMCount=0
			}
			if(_this.SorderACount==null||_this.SorderACount==""){
				_this.SorderACount=0
			}
			if (!reg.test(_this.SorderMCount)) {		
				this.$message("请填写正确服务人数！")
				return;
			}
			if (!reg.test(_this.SorderMCount)) {	
				this.$message("请填写正确服务人数！")
				return;
			}
			axios.post(url+"/wcfy/Service/Options_Service?loginId="+_this.loginId+"&token="+_this.token,
			{
				order_a_time:order_a_time,
				order_a_count:_this.SorderACount,
				order_m_time:order_m_time,
				order_m_count:_this.SorderMCount,
				order_days:order_days,
				id:3
			}).then(function(response){
				console.log(response)
				_this.$message({
					message: response.data.message
				});
				_this.searchSet()
			})
		},
		XstorageSet:function(){
			let url=familyDoctor()
			let _this=this
			checkStatus(_this)
			let m_time1=_this.value5
			let m_time2=_this.value6
			let a_time1=_this.value7
			let a_time2=_this.value8
			let  order_m_time=m_time1+"-"+m_time2
			let order_a_time=a_time1+"-"+a_time2
			let order_days=""
			_this.weeks.forEach(function(item,i){
				if(item.isActive){
					order_days += item.num+","
				}		
			})
			order_days = order_days.substr(0,order_days.length-1)
			if(order_m_time=="-"){
				order_m_time=""
			}
			if(order_a_time=="-"){
				order_a_time=""
			}
			if(order_days==""){
				this.$message("请设置服务周期！")
				return
			}
			if(a_time1){
				if(a_time2==""){
					this.$message("请设置正确的服务配置！")
					return
				}
			}
			if(a_time2){
				if(a_time1==""){
					this.$message("请设置正确的服务配置！")
					return
				}
			}
			let reg=/^[0-9]*$/
			if (!reg.test(_this.XorderACount)) {
				this.$message("请填写正确服务人数！")
				return;
			}
			if (!reg.test(_this.XorderMCount)) {
				this.$message("请填写正确服务人数！")
				return;
			}
			axios.post(url+"/wcfy/Service/Options_Service?loginId="+_this.loginId+"&token="+_this.token,
			{
				order_a_time:order_a_time,
				order_a_count:_this.XorderACount,
				order_m_time:order_m_time,
				order_m_count:_this.XorderMCount,
				order_days:order_days,
				id:1
			}).then(function(response){

				_this.$message({
					message: response.data.message
				});
				_this.searchSet()
			})
		},
		TstorageSet:function(){
			let url=familyDoctor()
			let _this=this
			checkStatus(_this)
			let m_time1=_this.value9
			let m_time2=_this.value10
			let a_time1=_this.value11
			let a_time2=_this.value12
			let order_m_time=m_time1+"-"+m_time2
			let order_a_time=a_time1+"-"+a_time2
			let order_days=""
			_this.weekss.forEach(function(item,i){
				if(item.isActive){
					order_days += item.num+","
				}		
			})
			order_days = order_days.substr(0,order_days.length-1)
			if(order_m_time=="-"){
				order_m_time=""
			}
			if(order_a_time=="-"){
				order_a_time=""
			}
			if(order_days==""){
				this.$message("请设置服务周期！")
				return
			}
			let reg=/^[0-9]*$/
			if(a_time1){
			
				if(a_time2==""){
					this.$message("请设置正确的服务配置！")
					return
				}
			}
			if(a_time2){
				if(a_time1==""){
					this.$message("请设置正确的服务配置！")
					return
				}
			}
			if(a_time1&&a_time2){

			}
			if (!reg.test(_this.TorderACount)) {
				this.$message("请填写服务人数！")
				return;
			}
			if (!reg.test(_this.TorderMCount)) {
				this.$message("请填写服务人数！")
				return;
			}
			axios.post(url+"/wcfy/Service/Options_Service?loginId="+_this.loginId+"&token="+_this.token,
			{
				order_a_time:order_a_time,
				order_a_count:_this.TorderACount,
				order_m_time:order_m_time,
				order_m_count:_this.TorderMCount,
				order_days:order_days,
				id:2
			}).then(function(response){

				_this.$message({
					message: response.data.message
				});
				_this.searchSet()
			})
		},
		// 清空配置
		rest:function(){
			let _this=this
			checkStatus(_this)
			let url=familyDoctor()
			this.$confirm("此操作将清空该服务配置, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				axios.post(url+"/wcfy/Service/emptyService?loginId="+this.loginId+"&token="+this.token,{
					id:3
				}).then(function(response){
					_this.$message({
						message: response.data.message
					});
					_this.searchSet()
				})
			})
		},
		restxx:function(){
			let _this=this
			checkStatus(_this)
			let url=familyDoctor()
			this.$confirm("此操作将清空该服务配置, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				axios.post(url+"/wcfy/Service/emptyService?loginId="+this.loginId+"&token="+this.token,{
					id:1
				}).then(function(response){
					_this.$message({
						message: response.data.message
					});
					_this.searchSet()
				})
			})
		},
		restts:function(){
			let _this=this
			checkStatus(_this)
			let url=familyDoctor()
			this.$confirm("此操作将清空该服务配置, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				axios.post(url+"/wcfy/Service/emptyService?loginId="+this.loginId+"&token="+this.token,{
					id:2
				}).then(function(response){
					_this.$message({
						message: response.data.message
					});
					_this.searchSet()
				})
			})

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
		this.searchSet()
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
	height: 220px;
	padding-top: 20px;
	background-color: white;
}
.heart-check,.tang-check{
	margin-top: 10px;
}
.setinfo{
	height: 30px;
	width: 95%;
	margin: auto;
	margin-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
}
.setting{
	width: 95%;
	margin: auto;
	overflow: hidden;
}
span{
	display: block;;
	height: 20px;
	width: 6px;
	background-color: #fb8ca6;
	float: left;
}
h6{
	height: 20px;
	line-height: 20px;
	margin-left: 12px;
	font-size: 16px;
}
.setdate{
	height: 89px;
	width: 42%;
	float: left;
	border-right: 1px solid #fb8ca6;
	margin-top: 5px;
}
.settime{
	height: 100px;
	width: 49%;
	float: left;
}
.sure_select{
	width:8%;
	height: 98px;
	float:left;
	position:relative;
}
.sure_select div{
	height:40px;
	width:80px;
	line-height:40px;
	text-align:center;
	position:absolute;
	top:50%;
	right: 0;
	margin-top:-20px;
	background-color:#fb8ca6;
	color:white;
	cursor: pointer;
}
.setdate div{
	height: 36px;
	line-height: 36px;
	float: left;
	margin-right: 10px;
	color: #888;
	font-size: 16px;
	margin-top: 25px;
}
.setdate ul{
	height: 36px;
	margin-top: 25px;
}
.setdate ul li{
	float: left;
	height: 34px;
	width: 34px;
	border-radius: 10px;
	border: solid 1px #fb8ca6;
	color: #fb8ca6;
	text-align: center;
	line-height: 34px;
	margin-right: 10px;
}
.setdate ul li:hover{
	background-color: #fb8ca6;
	color: white;
	cursor: pointer;
}
.am li span,.pm li span{
	display:block;
	height:40px;
	width: 15%;
	line-height: 40px;
	background-color:white; 
}
.startTime,.endTime{
	width: 113px;
	height: 40px;
}
.am,.pm{
	overflow: hidden;
}
.pm{
	margin-top: 10px;
}
.am li input,.pm li input{
	height: 38px;
	border-radius: 5px;
	border: solid 1px #bfcbd9;
	width: 49px;
	outline:none;
	overflow:hidden;
	text-align: center;
}
.am>li,.pm>li{
	float: left!important;
}
.el-date-editor.el-input {
	width: 110px;
	height: 40px;
	padding: 0;
}
.settime .am li:nth-of-type(1),.pm li:nth-of-type(1){
	height: 40px;
	width: 60px;
	margin-left: 10px;
	line-height: 40px;
	text-align: center;	
	margin-right:5px;
}
.settime .am li:nth-of-type(2),.pm li:nth-of-type(2){
	margin-right:5px;
}
.settime .am li:nth-of-type(3),.pm li:nth-of-type(3){
	width: 150px;
}
.settime .am li:nth-of-type(4),.pm li:nth-of-type(4){
	margin-left:2%;
}
.setstatus{
	height: 40px;
	line-height: 40px;
	width: 95%;
	margin: auto;
}
.setStatus{
	margin-top: 15px;
	overflow: hidden;
	height: 40px;
}
.setStatus li{
	float: left;
	height: 40px;
}
.setStatus li div{
	float: left;
	height:40px;
}
.setstatus div:nth-of-type(1){
	color: #888;
	margin-right: 10px;
}
.setstatus li div:nth-of-type(2){
	color: #fb8ca6;
	margin-right: 10px;
}
.rest{
	float: right!important;
	width: 80px;
	text-align: center;
	line-height: 40px;
	background-color: #fb8ca6;
	color: white;
	margin-right: 8px;
	cursor: pointer;
}
.class-a{
	background-color: black
}
.active{
	background-color: #fb8ca6;
	color: #fff!important;
}
</style>