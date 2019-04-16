//app.js


// "pages/home/home", //首页
// "pages/index/index", //登录, 弃用,可以考虑删掉
// "pages/guanli/guanli", //创建队列
// "pages/QRcode/QRcode", //生成二维码
// "pages/pass/pass", // 创建者对顾客的操作页面
// "pages/paidui/paidui", //加入队列
// "pages/chaxun/chaxun", //顾客等位页面,查询剩余人数
// "pages/logs/logs" // 日志, 待添加, 当前无效

App({
  globalData: {
    userInfo: null,
    openid: null,
    queid:null,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    var openid = null;

    function login (){
    //登录获取code
      wx.login({
        success: function (res) {
          //发送请求
          console.log("进入登录");
          wx.request({
            url: 'http://www.paion.xyz/queue/user/login',
            data: {
              code: res.code,//上面wx.login()成功获取到的code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              console.log(res.data.msg)
              if(res.data.msg=="1"){

                wx.setStorageSync("openid", res.data.openid);
                wx.setStorageSync("session_key", res.data.session_key)
                openid = res.data.openid;
                if(res.data.state==2){
                  //用户在某个队列中或管理了某个队列
                  wx.showModal({
                    title: '提示',
                    content: '您在一个队列中，是否进入？',
                    cancelText:"不进入",
                    confirmText:"进入",
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: "../paidui/paidui?id="+openid
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }else if(res.data.msg=="0"){
                wx.showToast({
                  title: '服务器忙！',
                  icon: 'loading',
                  duration: 1500
                })
              }else{
                login();
              }
                
            },
            fail:function(res){
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
    this.globalData.openid = openid;

    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
       
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

 
  
})