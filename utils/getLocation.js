var app = getApp()
// onlod时获取用户位置
function getLocation () {
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
                      havePower: true
                    });
                    that.loadingMore()
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
                loadingMore()
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
                  hiddenReAuthorizePop: true
                });
                that.loadingMore()
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
}

// 打开权限设置窗口
function openLocationSetting () {
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
                hiddenReAuthorizePop: true
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
}
/**
 * 重新授权弹窗
 */
function reAuthorize () {
  console.log('重新授权按钮出现')
  var that = this
  that.setData({
    hiddenReAuthorizePop: false
  })
}