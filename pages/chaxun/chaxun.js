// pages/chaxun/chaxun.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIndex : 0,
    interval : null,
    err: false,
    ready: false,
    complete: false,
    queName:"无效"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var interval = this.data.interval
    wx.request({
      url: 'https://www.paion.xyz/queue/user/userIndex',
      data: {
        'openid': app.globalData.openid,
        'queid': app.globalData.queid
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        
        if (res.data.msg == 1) {
          that.setData({
            userIndex: res.data.userIndex,
            queName:res.data.queName
          });
          if (res.data.state == 102) {
            clearInterval(interval)
            that.setData({
              complete: true,
              ready: false,
              err:false
            })
          }
          if (res.data.userIndex <= 2 && res.data.userIndex > 0) {
            that.setData({
              ready: true,

              complete:false,
              err:false
            })
          }
          console.log("用户实时 :" + that.data.userIndex)
        } else {
          that.setData({
            err: true,

            ready:false,
            complete:false
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var interval = this.data.interval
    this.data.interval = setInterval(function (openid, queid) {
      wx.request({
        url: 'https://www.paion.xyz/queue/user/userIndex',
        data: {
          'openid': openid,
          'queid': queid
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {

          if(res.data.msg == 1) {
            that.setData({
              userIndex: res.data.userIndex
            });
            if(res.data.state == 102) {
              clearInterval(interval)
              that.setData({
                complete: true,
                
                ready: false,
                err:false
              })
            }
            if(res.data.userIndex <= 2 && res.data.userIndex >0) {
              that.setData({
                ready: true,

                complete:false,
                err:false
              })
            }
          console.log("用户实时 :" + that.data.userIndex)
          }else{
            that.setData({
              err : true,

              ready:false,
              complete:false
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
      1500,
      app.globalData.openid,
      app.globalData.queid
    )
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var interval = this.data.interval
    clearInterval(interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var interval = this.data.interval
    clearInterval(interval)
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
    * 提交表单,退出队列
    */
  exitQue: function (e) {
    var interval = this.data.interval
    var openid = app.globalData.openid
    wx.request({
      url: 'https://www.paion.xyz/queue/user/joinQue',
      method: "POST",
      data: {
        'openid': openid,
        'queid': "0",
        'state': "1"
      },
      success: function (res) {
        if (res.data.msg == "1") {
          console.log("退出队列成功! !!");
          app.globalData.state = "1"
          app.globalData.queid = "0"
          clearInterval(interval)
          wx.reLaunch({
            url: '../home/home'
          })
        } else {
          console.log(res.data.msg)
        }

      },
    })
  },
 
 /**
  * 查询用户当前位置的方法
  */
  // showUserIndex : function (openid, queid){
  //   wx.request({
  //     url: 'https://www.paion.xyz/queue/user/userIndex',
  //     data: {
  //       'openid': openid,
  //       'queid': queid
  //     },
  //     header: {},
  //     method: 'POST',
  //     dataType: 'json',
  //     success: function (res) {
  //       console.log(res.data.userIndex)
  //       that.setData({
  //         userIndex: res.data.userIndex
  //       });
  //     },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // }


})