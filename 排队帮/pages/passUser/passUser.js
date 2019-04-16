// pages/passUser/passUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      queid: wx.getStorageSync("queid")
    })
    wx.request({
      url: 'http://www.paion.xyz/queue/que/passUser',
      data: {
        queid: that.data.queid
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)

      },
      fail: function (res) { },
      complete: function (res) { },

    })
  },

  formSubmit: function (e) {

    wx.request({
      url: 'http://www.paion.xyz/queue/user/joinQue',
      method: "POST",
      data: {
        'openid': e.detail.value.openid,
        'queid': e.detail.value.queid,
        'state': "1"
      },
      success: function (res) {
        if (res.data.msg == "1") {
          console.log("passUser成功! !!");
          that.list.setData(res.data);
          //刷新页面,获取新的List..这里怎么刷新我不会

        } else {
          console.log(res.data.msg)
        }
      },
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

  }
})