// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    storeList: [],
    Tabindex: 1, // 卡片导航栏的索引
    offsetAndLimit: [0, 6], // 触底分页加载
    key: '', // 搜索关键字
    hasStoreList: false, // 是否显示店铺列表
    hasTop10: false, // 是否显示Top10
    hiddenReAuthorizePop: true, // 最初隐藏位置授权button
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getLocation()
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

searchStore(e) {
  console.log('-----------------------search触发了-------------------')
  const that = this
  let key = e.detail.value.toLowerCase();
  this.setData({
    storeList: [],
    key: e.detail.value,
    offsetAndLimit: that.data.offsetAndLimit, // 初始化分页, 必须先设置好key然后再改变分页触发请求
    hasTop10: false, // 是否显示TOP10
    hasStoreList: true,
  })
  this.loadingMore()
},

/**
* 页面上拉触底事件的处理函数
*/
lower: function () {
  console.log("--------------------------------触底了---------------------------------")
  const offset = this.data.offsetAndLimit[0] + 6;
  const limit = this.data.offsetAndLimit[1];
  this.setData({
    hasLoadingMore: true,
    offsetAndLimit: [offset, limit]
  })
  this.loadingMore()
},

// 获取用户位置
getLocation: function () {
  var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
  var mapUtil = new QQMapWX({ key: 'QE3BZ-T6HWD-JNV4I-PBKA5-GJK3H-FKFNR' });
  var that = this;
  wx.getSetting({
    success(res) {
      console.log("查看用户是否授权")
      if (!res.authSetting['scope.userLocation']) {
        // 用户未授权
        wx.authorize({  //询问用户是否授权
          scope: 'scope.userLocation',
          success() {
            //用户已授权
            wx.getLocation({
              type: 'wgs84', // 默认GPS坐标，也可传入gcj02
              altitude: false, // 是否返回高度, 会减慢接口返回速度
              success: function (res) {
                mapUtil.reverseGeocoder({
                  location: {
                    latitude: res.latitude,
                    longitude: res.longitude
                  },
                  success: function (res) {
                    app.globalData.LocationInfo = res.result.ad_info.name
                    // 用户已授权并且全局地址已产生
                    console.log('newhome转换之后------' + app.globalData.LocationInfo)
                    that.setData({
                      havePower: true,
                      hasTop10: true
                    });
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              },
              fail(res) {
                console.log('在已授权情况下,未成功获取用户位置')
                wx.showToast({
                  title: '获取位置信息失败',
                  icon: 'none'
                })
                that.reAuthorize();
              }
            })
          },
          fail(res) {
            //用户未授权,弹窗提示用户重新授权
            console.log('getLocation失败了!')
            wx.showToast({
              title: '获取位置信息失败',
              icon: 'none'
            })
            that.reAuthorize();
          }
        })
      } else {
        // 用户已授权
        wx.getLocation({
          type: 'wgs84', // 默认GPS坐标，也可传入gcj02
          altitude: false, // 是否返回高度, 会减慢接口返回速度
          success: function (res) {
            mapUtil.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function (res) {
                app.globalData.LocationInfo = res.result.ad_info.name
                // 用户已授权并且全局地址已产生
                that.setData({
                  havePower: true,
                  hiddenReAuthorizePop: true,
                  hasTop10: true
                });
              },
              fail: function (res) {
                console.log(res);
              }
            })
          },
          fail(res) {
            console.log('在已授权情况下,未成功获取用户位置')
            wx.showToast({
              title: '获取位置信息失败',
              icon: 'none'
            })
            that.reAuthorize();
          }
        })
      }
    }
  })
},
openLocationSetting: function () {
  var that = this;
  wx.getSetting({
    success: function (res) {
      if (res.authSetting && !res.authSetting["scope.userLocation"]) {
        //未授权则打开授权设置界面
        wx.openSetting({
          success: function (res) {
            if (res.authSetting && res.authSetting["scope.userLocation"]) {
              //允许授权,则自动获取定位，并关闭二确弹窗，否则返回首页不处理
              that.setData({
                hiddenReAuthorizePop: true,
                hasTop10: true
              })
              that.getLocation();
              wx.showToast({
                title: '您已授权获取位置信息',
                icon: 'none'
              })
            } else {
              //未授权就弹出弹窗提示用户重新授权      
              that.reAuthorize();
            }
          }
        })
      } else {
        that.getLocation();
      }
    }
  })
},
/**
 * 重新授权弹窗
 */
reAuthorize: function () {
  console.log('重新授权按钮出现')
  var that = this
  that.setData({
    hiddenReAuthorizePop: false
  })
},

/**
  * 加载更多店铺列表
  */
loadingMore: function () {
  const that = this;
  this.setData({
    hasLoading: true,
    hasErro: false,
    isLoad: false
  })
  console.log("真正用来搜索的关键字是:---" + that.data.key + "--------loadingMore发出了请求" + "_____________search页")
  wx.request({
    url: 'https://www.paion.xyz/queue/store/showStoreList',
    data: {
      'Location': app.globalData.LocationInfo,
      'offset': that.data.offsetAndLimit[0],
      'limit': that.data.offsetAndLimit[1],
      'storeClass': that.data.Tabindex,
      'key': that.data.key
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.data == '') {
        // 加载的数据为空
        that.setData({
          hasLoading: true,
          isLoad: true
        })
      } else {
        // 加载的数据不为空,把新数据添加到老数据后
        var newStoreList = (that.data.storeList).concat(res.data)
        that.setData({
          storeList: newStoreList,
          hasLoading: false
        })
        console.log(that.data.storeList)
      }
    },
    fail: function (res) {
      that.setData({
        hasLoading: false,
        hasErro: true
      })
    }
  })
},

})