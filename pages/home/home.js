// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInQueue: false,
    userControlQue: false ,
    buttonSetUpState: true,
    buttonSetUp: "创建队列",
    buttonJoin: "加入队列",
  },

  onLoad: function (options) {
    console.log("===========================>>onLoad<<")
    
  },

  /**
   * 页面跳转
   */
  paidui: function () {
    var that = this
    if (that.data.userInQueue) {
      // 用户在排队
      wx.navigateTo({
        url: '../chaxun/chaxun',
      })
    } else if (that.data.userControlQue) {
      // 用户是队列管理员
      wx.navigateTo({
        url: '../passUser/passUser'
      })
    }else {
      // 用户正常
      wx.navigateTo({
        url: '../paidui/paidui',
      })
    }
  },
  guanli: function () {
    var that = this
      if (that.data.userInQueue) {
        // 用户在排队
        wx.navigateTo({
          url: '../chaxun/chaxun',
        })
      } else if (that.data.userControlQue) {
        // 用户是队列管理员
        wx.navigateTo({
          url: '../passUser/passUser'
        })
      } else {
        // 用户正常
        wx.navigateTo({
          url: '../guanli/guanli',
        })
      }
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("===========================>>onReady<<")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("===========================>>onShow<<home")
    var that = this
    if(app.globalData.state == 2) {
      // 用户正在排队，显示提示信息，并把“加入队列”的button换成“返回队列”
      that.setData({
        userControlQue: false,
        userInQueue: true,
        buttonSetUpState: false,
        buttonJoin: "返回队列"
      })
    }else if(app.globalData.state == 3) {
      // 用户是管理员, 显示提示信息, 并把"加入队列"button换成"管理队列"
      that.setData({
        userControlQue: true,
        userInQueue: false,
        buttonSetUpState: false,
        buttonJoin: "管理队列"
      })
    }else {
      // 用户为空闲状态
      that.setData({
        userControlQue: false,
        userInQueue: false,
        buttonSetUpState: true,
        buttonSetUp: "创建队列",
        buttonJoin: "加入队列"
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("===========================>>onHide<<home")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("===========================>>onUnload<<")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("===========================>>onPullDownRefresh<<home")
    var state = app.globalData.state
    wx.stopPullDownRefresh()
    if(state == 2) {
      // 用户正在排队
      wx.navigateTo({
        url: '../chaxun/chaxun',
      })
    }else if(state == 3) {
      // 用户是队列管理员
      wx.navigateTo({
        url: '../passUser/passUser'
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("===========================>>onReachBottom<<")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("===========================>>onShareAppMessage<<")
  },

 
})