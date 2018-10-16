import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/Login'
// import Dashboard from '@/components/Dashboard'
//签约管理
import list1 from '@/components/sign/list1'
import list from '@/components/sign/list'
//计免疫苗
import vlist1 from '@/components/vaccine/list1'
import vlist2 from '@/components/vaccine/list2'
import vlist3 from '@/components/vaccine/list3'
//老年人体检
import olist1 from '@/components/oldman/list1'
import olist2 from '@/components/oldman/list2'
import olist3 from '@/components/oldman/list3'
//社区医院
import introduce from '@/components/hospital/introduce'
//队长管理
import flist from '@/components/finance/list'
import flist2 from '@/components/finance/list2'
//团队信息
import TotalData from '@/components/TotalData/TotalData'
//个人信息
import setting from '@/components/Set/setting'
// 数据统计
import total from '@/components/count/total'
import details from '@/components/count/details'
//懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
//图片加载
import demo1 from '../assets/images/title3.png'
import demo2 from '../assets/images/title1.png'
import demo3 from '../assets/images/title2.png'
import demo4 from '../assets/images/title6.png'
import demo5 from '../assets/images/title4.png'
import demo6 from '../assets/images/title5.png'
import demo7 from '../assets/images/11.png'
import demo8 from '../assets/images/title6.png'
import demo9 from '../assets/images/13.png'
import demo10 from '../assets/images/tf.png'
import demo11 from '../assets/images/total.png'
Vue.use(Router)
let router = new Router({
    routes: [
        {
            path: '/login',
            name: '登录',
            menuShow: "",
            component: Login,
        },
        {
            path: '/',
            component: Home,
            name: '入园体检',
            iconCls: demo1,
            menuShow: "1345",
            children: [
                { path: '/sign/list1/', component: list1, name: '预约', menuShow: "135" },
                { path: '/sign/list/', component: list, name: '已完成', menuShow: "135" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '先心筛查',
            menuShow: "1345",
            iconCls: demo2,
            children: [
                { path: '/vaccine/list1/', component: vlist1, name: '预约', menuShow: "135" },
                { path: '/vaccine/list2/', component: vlist2, name: '完成', menuShow: "135" },
                { path: '/vaccine/list3/', component: vlist3, name: '失效', menuShow: "135" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '唐氏筛查',
            menuShow: "1345",
            iconCls: demo3,
            children: [
                { path: '/oldman/list1/', component: olist1, name: '预约', menuShow: "135" },
                { path: '/oldman/list2/', component: olist2, name: '完成', menuShow: "135" },
                { path: '/oldman/list3/', component: olist3, name: '失效', menuShow: "135" }
            ]
        },
       {
            path: '/',
            component: Home,
            name: '服务设置',
            menuShow: "1345",
            iconCls: demo8,
            children: [
                { path: '/Set/setting/', component: setting, name: '设置管理', menuShow: "13" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '寄送管理',
            menuShow: "1345",
            iconCls: demo5,
            children: [
                { path: '/hospital/introduce/', component: introduce, name: '寄送服务', menuShow: "1345" },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '数据统计',
            menuShow: "1345",
            iconCls: demo6,
            children: [
                { path: '/TotalData/TotalData', component: TotalData, name: '数据详情', menuShow: "1345" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '对账管理',
            iconCls: demo10,
            menuShow: "1345",
            children: [
                { path: '/finance/list/', component: flist, name: '体检费', menuShow: "134" },
                { path: '/finance/list2/', component: flist2, name: '快递费', menuShow: "3" }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '更多功能',
            menuShow: "1345",
            iconCls: demo9,
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('id');
        next()
    } else {
        let user = JSON.parse(window.sessionStorage.getItem('id'))
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})
export default router