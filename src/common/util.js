// 
//全选
export function checkedAll() {
    var _this = this;
    this.checkboxData.forEach(function(item) {
        _this.checkBox.items[item.id] = _this.checkBox.checked;
    });
}
// 单选
export function checkItem() {
    var unchecked = 0;
    var _this = this;
    _this.checkboxData.forEach(function(item) {
        if (_this.checkBox.items[item.id]) {
            unchecked++;
        }
    });
    _this.checkBox.checked = unchecked >= 4 ? true : false;
}
//模糊搜索
export function searchData() {
    var search = this.search;
    if (search) {
        return this.data3.filter(function(data3) {
            return Object.keys(data3).some(function(key) {
                return String(data3[key]).toLowerCase().indexOf(search) > -1
            })
        })
    }
    return this.data3;
}
// 所有数据api的域名地址
export function familyDoctor() {
    // return 'http://192.168.3.22:8088'
    // return "http://chensheng.premier-tech.cn"
    return "http://39.104.48.112:8088"
}
// 会话过期
export function checkStatus(timr){
   let date2 = new Date()
   let s2 = date2.getTime();
   timr.dateStart= window.sessionStorage.getItem("dateLogin");
   let total = (s2 - timr.dateStart);
   let min=180*60*1000-total
    if(min<=0){
    timr.$alert('会话已过期请重新登录！',{
      callback: action => {
          timr.fullscreenLoading = true;
          setTimeout(() => {
              timr.fullscreenLoading = false;
              timr.$router.push("/login")
          }, 1000);
         
      }
  })
     return
    }
   
}
// 时间格式化代码 
export function getLastDate(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    return data.getFullYear() + '-' + m + "-" + d;
}
export function getLastDate1(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var hour = data.getHours();
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();
    return data.getFullYear() + '-' + m + "-" + d + ' ' + hour + ':' + minutes + ':' + seconds;
}
export function getLastDate2(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var hour = data.getHours();
    var minutes = data.getMinutes();
    return data.getFullYear() + '-' + m + "-" + d + ' ' + hour + ':' + minutes;
}
//清除选框
export function checobox(checoboxs) {
    checoboxs.forEach(function(v, i) {
        v.model = false
    })
}
// axios请求
import axios from "axios";

export function axiosGet() {
    let url = familyDoctor()
    let data = arguments[1]
    if (arguments[1] === undefined) {
        return new Promise((resolve, reject) => {
            axios.get(url + arguments[0]).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    } else {
        let packa = "?"
        for (var key in data) {
            packa += key + "=" + data[key] + "&"
        }
        packa = packa.substring(0, packa.length - 1)
        return new Promise((resolve, reject) => {
            axios.get(url + arguments[0] + packa).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export function axoisPut() {
    console.log('put')
    let url = familyDoctor()
    let data = arguments[1]
    if (arguments[1] === undefined) {
        return new Promise((resolve, reject) => {
            axios.put(url + arguments[0]).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    } else {
        let packa = "?"
        for (var key in data) {
            packa += key + "=" + data[key] + "&"
        }
        packa = packa.substring(0, packa.length - 1)
        return new Promise((resolve, reject) => {
            axios.put(url + arguments[0] + packa).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export function axoisPost() {
    let url = familyDoctor()
    let data = arguments[1]
    if (arguments[1] === undefined) {
        return new Promise((resolve, reject) => {
            axios.post(url + arguments[0]).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    } else {
        let packa = "?"
        for (var key in data) {
            packa += key + "=" + data[key] + "&"
        }
        packa = packa.substring(0, packa.length - 1)
        return new Promise((resolve, reject) => {
            axios.post(url + arguments[0] + packa).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    }
}