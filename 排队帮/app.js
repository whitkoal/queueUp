App({
  globalData: {
    userInfo: null,
    openid: null,
    session_key:null,
    queid:null,
    state:0,
    LocationInfo: '中国,北京,北京市,朝阳区'
  },
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    /**
     *  登录
     */
    function login() {
      //登录获取code
      wx.login({
        success: function (res) {
          //发送请求
          console.log("进入登录");
          wx.request({
            url: 'https://www.paion.xyz/queue/user/login',
            data: {
              code: res.code,//上面wx.login()成功获取到的code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.msg == "1") {
                //成功获取(注册了)到用户信息
                that.globalData.openid = res.data.openid
                that.globalData.session_key = res.data.session_key
                that.globalData.queid = res.data.queid
                that.globalData.state = res.data.state
                if (res.data.state == 2) {
                  //用户在某个队列中正在排队
                  // wx.showModal({
                  //   title: '提示',
                  //   content: '您在一个队列中，是否进入？',
                  //   cancelText: "不进入",
                  //   confirmText: "进入",
                  //   success(res) {
                  //     if (res.confirm) {
                        wx.navigateTo({
                          url: "../chaxun/chaxun"
                        })
                  //     } else if (res.cancel) {
                  //       console.log('用户点击取消')
                  //     }
                  //   }
                  // })
                } else if (res.data.state == 3) {
                  // 用户是某个队列的管理员
                  wx.navigateTo({
                    url: "../passUser/passUser"
                  })
                }
              } else if (res.data.msg == "0") {
                wx.showToast({
                  title: '服务器忙！',
                  icon: 'loading',
                  duration: 1500
                })
              } else {
                //login();
              }

            },
            fail: function (res) {
              wx.showToast({
                title: '服务器异常！',
                icon: 'loading',
                duration: 1500
              })
            }

          })

        }
      })
    }
    login();

    // wx.getSetting({
    //   success: res => {
    //     if (true) {
    //       wx.openSetting({
    //         success(res) {
    //           console.log(res.authSetting)
    //           // res.authSetting = {
    //           //   "scope.userInfo": true,
    //           //   "scope.userLocation": true
    //           // }
    //         }
    //       }),
    //       wx.getUserInfo({
    //         success: res => {
    //           this.globalData.userInfo = res.userInfo
    //           console.log("res.userInfo::" + res.userInfo)
              
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // }),
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })
  },  
  
 
  
})