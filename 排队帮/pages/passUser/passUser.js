// pages/passUser/passUser.js
  var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{}],
    queid:null,
    i:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("==============================================>onLoad执行了")
    var that = this
    this.setData({
      queid: app.globalData.queid
    })
    console.log("passUser :" +app.globalData.queid)
    wx.request({
      url: 'https://www.paion.xyz/queue/que/passUser',
      data: {
        queid: app.globalData.queid
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        that.setData({
          list : res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("==============================================>onReady执行了")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("==============================================>onShow执行了")
    var that = this
    // 不断刷新list数据
    var k = 0
    this.data.i = setInterval(function (queid) {
      console.log("k:"+k++)
      wx.request({
        url: 'https://www.paion.xyz/queue/que/passUser',
        data: {
          queid: queid
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            list: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
      1000,
      app.globalData.queid
    )
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("==============================================>onHide执行了")
    var i = this.data.i
    clearInterval(i)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("==============================================>onUnload执行了")
    var i = this.data.i
    clearInterval(i)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

/**
 * 销毁队列
 */
  queGoToDie: function(e) {
    var queid = app.globalData.queid
    var i =this.data.i
    // 将队列管理者变为普通空闲用户
    wx.request({
      url: 'https://www.paion.xyz/queue/user/joinQue',
      method: "POST",
      data: {
        'openid': app.globalData.openid,
        'queid': app.globalData.queid,
        'state': "103"
      },
      success: function (res) {
        if (res.data.msg == "1") {
          wx.request({
            url: 'https://www.paion.xyz/queue/que/alertqueue',
            method: 'POST',
            data: {
              'queid': queid,
              'state': "0"
            },
            success: function (res) {
                console.log("=====================================>>>>队列销毁成功 :"+res.data)
              if (res.data == "1") {
                //提示用户，停止刷新list，并退到首页
                clearInterval(i)
                app.globalData.state = 103      // 103表示用户所在队列被销毁了
                  wx.reLaunch({
                  url: '../home/home'
                })
              } else {
                //未成功改变队列状态
              }
            }
          })
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },

  /**
   * 让排队者通过
   */
  formSubmit: function (e) {
    var that = this
    wx.request({
      url: 'https://www.paion.xyz/queue/user/joinQue',
      method: "POST",
      data: {
        'openid': e.detail.value.openid,
        'queid': app.globalData.queid,
        'state': "102"
      },
      success: function (res) {
        if (res.data.msg == "1") {
          app.globalData.state = 102    // 102表示用户通过了
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },

  /**
   * 加载排队者list
   */
  loadQueuer: function() {
    console.log("loadQueuer函数执行了...")
    var that = this
    wx.request({
      url: 'https://www.paion.xyz/queue/que/passUser',
      data: {
        queid: app.globalData.queid
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },

    })
  }

})