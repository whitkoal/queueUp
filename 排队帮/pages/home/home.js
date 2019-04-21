// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInQueue: false,
    userControlQue: false 
  },
  onLoad: function (options) {
    console.log("===========================>>onLoad<<")
  },
  paidui: function () {
    wx.navigateTo({
      url: '../paidui/paidui'
    })
  },
  guanli: function () {
    wx.navigateTo({
      url: '../guanli/guanli'
    })
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
    console.log("===========================>>onShow<<"+this.data.userControlQue)
    if(app.globalData.state == 2) {
      this.setDate({
        userInQueue: true
      })
    }else if(app.globalData.state == 3) {
      this.data.userControlQue = true
      console.log(this.data.userControlQue)
     
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("===========================>>onHide<<")
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
    console.log("===========================>>onPullDownRefresh<<")
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