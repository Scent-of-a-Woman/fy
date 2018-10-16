<template>
  <el-row class="container" >
    <!--头部-->
    <div class="header">
      <div class="nav">
        <div class="logo">
          <div class="company_name">
             <img src="../assets/images/title.png" height="50" width="168">
          </div>
        </div>
        <div class="info">
         <!--  <div class="info_img">
            <img :src="user_img=='null'||user_img== null ? iniTimg:user_img">
          </div> -->
          <div class="info_name">
            {{user_name}}&nbsp;
            <!-- <span>{{user_hospital}}</span> -->
            <img  @click="logout" src="../assets/images/3.png" height="20" width="20">
          </div>
        </div>
      </div>
    </div>
    <!--中间-->
    <div class="page_content">
      <el-col  class="main" style="width:86%">
        <!--左侧导航--> 
        <aside :class="{showSidebar:!collapsed}">
          <!--导航菜单-->
          <el-menu :default-active="routerPath" router :collapse="collapsed" >
            <template v-for="(item,index) in $router.options.routes" ref="reference" v-if="item.menuShow.indexOf(markId)>=0">
              <el-submenu v-if="true" :index="(index+1)+''">
                <template slot="title">
                  <img :src="item.iconCls=='null'||item.iconCls== null ? iniTimg:item.iconCls"  height="30" width="30">
                  <span slot="title" style="margin-left:20px">{{item.name}}</span>
                </template>
                 <el-menu-item v-for="(term,index1) in item.children"
                :index="term.path"
                v-if="term.menuShow.indexOf(markId)>=0"
                :class="$route.path==term.path?'is-active':''"
                @click="fresh(term.path)">
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
       </aside>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </div>
  <!-- 底部 -->
  <div class="footer">
    <div>Powered by premier</div>
  </div>
</el-row>
</template>
<script>
import bus from "../bus";
import iniTimg from "../assets/images/image.png";

export default {
  name: "home",
  data() {
    return {
      iniTimg: iniTimg, //默认图片
      collapsed: false,
      markId: "666",
      user_img: "",
      user_name: "",
      user_hospital: "",
      doctorGroupId: "",
      data3: [],
      routerPath:'',
      
    };
  },
  created: function() {
    this.saveMark();
    this.routerPath = this.$route.path
  },
  methods: {
    saveMark() {
      this.markId = window.localStorage.getItem("id");
      this.user_name = window.localStorage.getItem("user_name");
      this.user_hospital = window.localStorage.getItem("user_hospital");
      this.user_img = window.localStorage.getItem("user_img");
      this.doctorGroupId = window.localStorage.getItem("doctorGroupId");
      if (this.markId == 3 || this.markId == 11) {
        this.user_hospital = "武昌卫计委";
      } else {

        this.user_hospital = window.localStorage.getItem("user_hospital");
      }
    },
    
    //折叠导航栏
    showMenu(i, status){
      // this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    },
    // 注销登录
    logout() {
      var _this = this;
      this.$alert("确认退出吗?", "提示", {})
      .then(() => {
        sessionStorage.removeItem("access-user");
        _this.$router.push("/login");
      })
      .catch(() => {});
    },
    // 侧边栏刷新
    fresh: function(a) {
      let b = Math.floor(Math.random() * (100 - 1) + 1);
      this.routerPath = this.$route.path
      this.$router.push({ path: a, query: { s: b } })
    }
  }
};
</script>
<style>
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #bfcbd9!important; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#bfcbd9!important;
}

input:-ms-input-placeholder{
  color: #bfcbd9!important;
}

input::-webkit-input-placeholder{
  color: #bfcbd9!important;
}

* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑"!important;
}
.font_color{
  color: #989898;
  font-size: 15px;
}
a {
  text-decoration: none;
}
i {
  font-style: normal;
}
ul,
li {
  list-style: none;
}
.el-input__inner {
  font-size: 14px!important;
}
body,
html {
  width: 100%;
  background-color: #f5f5f5;
}
html {
  overflow: scroll;
}
#app > div.warp-breadcrum.el-col.el-col-24 > div {
  font-size: 14px;
}
.el-tabs__item.is-active{
  color: #49c7c4!important;
}
/*.el-tabs__active-bar{
  background-color: #49c7c4!important;
}*/
.el-pager li.active{
  border-color: #fb8ca6!important;
  background-color: #fb8ca6!important;
}
.el-pager li:hover {
  color: black!important;
}
.el-dialog__header{
  width: 85%;
  margin: auto;
  padding: 25px 0 10px 0!important;
  border-bottom: 1px solid #ccc;

}
.el-dialog__title{
  float: left;
  display: block;
  margin-bottom: 5px;
  color: #ccc!important
}
.el-dialog__headerbtn{
  display: none;
}
.header {
  width: 100%;
  height: 75px;
  padding-top:20px;
  background-color: white;
}
.nav {
  height: 100%;
  width: 84%;
  margin: auto;
  clear: both;
  position: relative;
  background-color: white;
}
.logo {
      margin-top: 3px;
  width: 400px;
  float: left;
}
.logo_img {
  width: 50px;
  height: 50px;
  display: inline-block;
  float: left;
}
.logo_img > img{
  display: block;
  width: 100%;
  height: 100%;
}
.company_name {
  height: 50px;
  width: 181px;
  float: left;
  font-size: 16px;
  text-align: right;
  color: white
}
.company_name > p {
  font-size: 14px;
}
.info {
  height: 100%;
  float: right!important;
  line-height: 60px;
}
.info_img {
  float: left;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  margin-top: 5px;
}
.info_img > img {
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 50%;
}
.info_name{
  display: inline-block;
  font-size: 16px;
  margin-right: 35px;
}
.info_name > span{
  font-size: 14px;
}
.info_name >img{
  cursor: pointer;
    height: 20px;
  width: 20px;
  right: 0;
  top: 19px;  
  position: absolute;
}
.page_content {
  width: 100%;
  margin: 0px auto;
  position: relative;
  overflow: hidden;
}
.el-submenu__title{
  font-size: 16px;
}
.el-menu .el-menu-item,
.el-submenu .el-submenu__title {
  height: 60px !important;
  line-height: 60px !important;
  width: 100%;
}
.el-submenu__icon-arrow {
  top: 55% !important;
}
.container aside .el-submenu .el-menu-item {
  height: 60px;
  line-height: 60px;
  width: 100%;
  padding-right: 0px;
  padding-left: 74px !important;
  background-color: #696969;
}
.el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  background-color: #fb8ca6 !important;
}
.footer {
  width: 100%;
  height: 90px;
  line-height: 90px;
  float: left;
  background-color: white;
  text-align: center;
  margin-top: 10px;
  color: #b7b7b7;  
}
.search-icon img{
  position: absolute;
  top:50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
  cursor: pointer;
}
/*条件查询*/

.el-dialog--small{
  height: 330px!important;
  width: 270px!important;
}
.el-dialog__body{
  padding: 10px 20px!important;
}
.el-dialog__footer{
  text-align: center!important;
}
.el-date-editor.el-input{
  width: 230px;
  margin-bottom: 10px;
}
/*分页*/
.block {
  width: 100%;
  height: 35px;
  float: left;
}
.block .el-pagination {
  padding: 0;
  height: 55px;
  margin: auto;
  margin-bottom: 20px;
}
.all{
  margin-bottom: 10px;
}
.block .el-pagination .el-pager li {
  height: 35px;
  width: 35px;
  padding: 0;
  line-height: 35px;
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  height: 35px;
  width: 35px;
}

.am li .el-input__inner,
.pm li .el-input__inner{
	height:40px!important;
  padding-left: 5px;
}

.el-submenu__title:hover {
      background-color: #fb8ca6!important;
    }
</style>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    padding: 0px;
  }
  .main {
    width: 85%;
    margin-left: 8%;
    margin-top: 10px;
  }

  aside {
    float: left;
    width: 18%;
    &::-webkit-scrollbar {
      display: none;
    }
    .showSidebar {
      width: 10%;
    }
    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #535353;
    }
    .el-submenu .el-menu-item {
      min-width: 100%;
    }
    .el-menu {
      width: 100%;
      float: left;
    }
    .el-menu--collapse {
      min-width: 100%;
    }
    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover {
      background-color: #fb8ca6!important;
    }
  }
  .content-container {
    float: left;
    width: 79%;
    margin-left: 10px;
  }
}
</style>
