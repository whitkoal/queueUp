// pages/leftSwiperDel/index.js
import WxValidate from '../../utils/WxValidate.js';
Page({
  data: {
    showModalStatus: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initValidate();
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  submitForm(e) {
    /**
  * 4-3(表单提交校验)
  */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    var openid = wx.getStorageSync("openid");//这里有一个待处理问题，如果未获取到用户openid就会报500
    //所以这里要先判断有没有openid，没有就去登录
    console.log("创建队列时提交的openid是 : " + openid);
        wx.request({
          url: 'http://www.paion.xyz/queue/user/joinQue',
          method: "POST",
          data: {
            'openid': openid,
            'queid': e.detail.value.queid,
            'state': "2"
          },
          success: function (res) {
            if (res.data.msg == "1") {
              console.log("加入队列成功! !!");
              wx.setStorageSync("queid", e.detail.value.queid);
              wx.navigateTo({
                url: '../chaxun/chaxun'
              })
            } else {
              console.log(res.data.msg)
            }

          },
        })

      

    
    //验证通过以后->
    this.submitInfo(params);
  },
  /**
    * 提交表单
    */
  submitInfo(params) {
    // form提交
    let form = params;
    console.log('将要提交的表单信息：', form);

    wx.showToast({
      title: '提交成功！！！！',
    })

  },
  initValidate() {
    const rules = {
      queid: {
        required: true,
        rangelength: [1, 11],
        number:true
      }
    }
  
       const messages = {
    queid: {
      required: '请输入队列码',
      rangelength: '只能输入1-11个数字',
      number:'只能输入数字'
    },
  }
     // 创建实例对象
     this.WxValidate = new WxValidate(rules, messages)


}
})