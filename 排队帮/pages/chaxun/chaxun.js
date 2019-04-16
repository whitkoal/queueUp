// pages/chaxun/chaxun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIndex : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync("openid")
    var queid  = wx.getStorageSync("queid")
    wx.request({
      url: 'http://www.paion.xyz/queue/user/userIndex',
      data: {
        'openid': openid,
        'queid': queid
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.userIndex)
        that.setData({
          userIndex: res.data.userIndex
        });
      },
      fail: function(res) {},
      complete: function(res) {},
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  formSubmit: function (e) {
    var openid = wx.getStorageSync("openid")
    var queid = wx.getStorageSync("queid")
    wx.request({
      url: 'http://www.paion.xyz/queue/user/joinQue',
      method: "POST",
      data: {
        'openid': openid,
        'queid': "0",
        'state': "1"
      },
      success: function (res) {
        if (res.data.msg == "1") {
          console.log("tuichu队列成功! !!");
          wx.navigateTo({
            url: '../home/home'
          })
        } else {
          console.log(res.data.msg)
        }

      },
    })
  }
})