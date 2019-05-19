// components/QueueList/queueList.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isCard: false,
    queueList: []
  },

  /**
     * 生命周期
     */
  lifetimes: {
    attached() {
      var time = require('../../utils/util.js');
      const that = this
      wx.request({
        url: 'https://www.paion.xyz/queue/que/showQueListByOpenid',
        method: 'POST',
        data: {
          openid: app.globalData.openid
        },
        dataType: 'json',
        success: function(res) {
          var newQueList = res.data
            console.log(newQueList[1].que)
            console.log(res.data[1].que)
          for(var i=0; i<=2; i++) {
            newQueList[i].que.registtime = time.formatTime(res.data[i].que.registtime)
          }
          that.setData({
            queueList: newQueList
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
