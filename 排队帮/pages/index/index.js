//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
 

  //登录获取code
  // login: function () {
  //   wx.login({
  //     success: function (res) {
  //       //发送请求
  //       wx.request({
  //         url: 'http://www.paion.xyz/queue/user/login', 
  //         data: {
  //           code: res.code,//上面wx.login()成功获取到的code
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/json' //默认值
  //         },
  //         success: function (res) {
  //           wx.setStorageSync("openid", res.data.openid);
  //           wx.setStorageSync("session_key", res.data.session_key)
  //          // wx.setStorageSync("session_key", res.data.session_key);
  //           // wx.setStorage({
  //           //   key: '',
  //           //   data: '',
  //           // })
  //           var openid = res.data.openid
  //           console.log('openid是 ： '+openid);
  //           console.log('data是 ： '+res.data);
  //           console.log('session_key是 : '+res.data.session_key);
  //         }
  //       })
  //       wx.switchTab({
  //         url: '../home/home',
  //       })
  //       wx.navigateTo({
  //         url: '../home/home'
  //       })
  //     }
  //   })
  // }
  
})
