import WxValidate from '../../utils/WxValidate.js';
var app = getApp()
Page({
 
   /**
    * 页面的初始数据
    */
   data: {},
 
    onLoad: function (options) {
    /**
     * 4-1(先初始化表单)
     */
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
      if(!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }
      /**
       * 这里添写验证成功以后的逻辑
       * 
       */
      var openid = app.globalData.openid
      console.log("创建队列时提交的openid是 : " + openid);
       wx.request({
         url: 'https://www.paion.xyz/queue/que/creatqueue',
         method: "POST",
         data: {
           'leaderopenid': openid,
           'leaderwxname': e.detail.value.leaderwxname,
           'quename': e.detail.value.quename,
           'state': "1",
           'introduce': e.detail.value.introduce
         },
         success: function (res) {
           console.log("创建队列成功! !!");
           app.globalData.queid = res.data.id
           app.globalData.state = 3
           wx.redirectTo({
             url: '../passUser/passUser',
           })
         },
       })
     //验证通过以后->
     this.submitInfo(params);
   },

   /**
     * 表单-提交
     */
   submitInfo(params) {
       // form提交
       let form = params;
       console.log('将要提交的表单信息：', form);
  
       wx.showToast({
           title: '提交成功！',
         })
    },

   /**
     * 表单-验证字段
     */
   initValidate() {
  
       /**
       * 4-2(配置规则)
       */
       const rules = {
         leaderwxname: {
               required: true,
               rangelength: [2, 20]
        },
         quename: {
             required: true,
              rangelength: [2, 30]
        
  },
         introduce: {
             required: false,
           rangelength: [0, 100]
        
  }

  
}
     // 验证字段的提示信息，若不传则调用默认的信息
     const messages = {
       leaderwxname: {
             required: '请输入姓名',
             rangelength: '请输入2~20个字符'
        },
       quename: {
           required: '请输入队列名',
          rangelength: '请输入2~30个字符'
      
},
       introduce: {
           required: '请输入简介',
         rangelength: '请输入0~100个字符'
      
},

     }
     // 创建实例对象
     this.WxValidate = new WxValidate(rules, messages)
     
     
   }
 });