const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hiddenReAuthorizePop: true, //是否隐藏重新获取位置的button
    havePower: false, //用户是否授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cardCur: 0,
    isSwiper: true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      method: 'shop'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      method: 'guanli'
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    iconList: [{
      icon: 'roundadd',
      color: 'red',
      badge: 0,
      name: '创建',
      method: 'guanli'
    }, {
      icon: 'ticket',
      color: 'olive',
      badge: 1,
      name: '当前小票',
      method: 'ticket'
    }, {
      icon: 'friendadd',
      color: 'blue',
      badge: 3,
      name: '我的队列',
      method: 'myQueue'
    }, {
      icon: 'search',
      color: 'orange',
      badge: 0,
      name: '搜索',
      method: 'search'
    }, {
      icon: 'footprint', // form
      color: 'brown',
      badge: 0,
      name: '记录',
      method: 'logs'
    },{
      icon: 'shop',
      color: 'purple',
      badge: 0,
      name: '成为商家',
      method: 'shop'      
    }, {
      icon: 'community',
      color: 'yellow',
      badge: 22,
      name: '消息',
      method: 'notice'
    }, {
      icon: 'apps',
      color: 'cyan',
      badge: 0,
      name: '更多',
      method: 'more' 
    }],

    tabList: [{
      name: '餐饮',
      to: '',
      color: 'red'
    },{
      name: '银行',
        to: '',
        color: 'red'
    },{
      name: '个人',
        to: '',
        color: 'red'
    },{
      name: '其他',
        to: '',
        color: 'red'
    }],
    gridCol: 4,
    skin: false,
    Tabindex: 0, // 卡片导航栏的索引 店铺类型,  0餐饮/1银行/2个人/3其他
    offsetAndLimit:[0,3], // 触底分页加载
    isCard: true, // 控制卡片形式
    hasLoading: false, // 控制有没有加载条
    hasErro: false, // 控制有没有加载错误条
    isLoad: false, // 控制加载条状态,加载中或加载完成
    storeClass: '0', // 店铺类型,  0餐饮/1银行/2个人/3其他
    offsetAndLimit: [0, 6], // 分页, 初始页
    storeList: [],
    key: '', // 搜索的关键字
    avatarUrl: '/images/logo.png', // 默认头像
  },
  onLoad() {
    this.towerSwiper('swiperList');
  },
  
  onShow() {
  this.getLocation();
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  tapSwiper: function(e) {
    console.log('第 '+ e.currentTarget.dataset.index + ' 个Sweiper被点击了!')

  },

  tapClick: function(e) {
    console.log("宫格被点击了..." + e.currentTarget.dataset.method);
    var navigateUrl = '../'+e.currentTarget.dataset.method + '/' +e.currentTarget.dataset.method;
    wx.navigateTo({
      url: navigateUrl,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 左侧抽屉控制
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 商店列表导航栏
   */
  tabSelect(e) {
    this.setData({
      Tabindex: e.currentTarget.dataset.id, // colorui
      TabCur: e.currentTarget.dataset.id, // colorui
      offsetAndLimit: [0,3], // 切换列表类型时初始化分页
      storeList: [],
    })
    this.loadingMore()
  },

  // 打开抽屉时获取用户信息
  getUserInfo: function(e) {
    console.log(e.detail)
    this.setData({
      avatarUrl: e.detail.userInfo.avatarUrl,
      nickName: e.detail.userInfo.nickName,
      gender: e.detail.userInfo.gender
    })
  },

  //onlod时获取用户位置
  getLocation: function() {
  var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
  var mapUtil = new QQMapWX({ key: 'QE3BZ-T6HWD-JNV4I-PBKA5-GJK3H-FKFNR'});
    var that = this;
    wx.getSetting({
      success(res) {
        console.log("查看用户是否授权")
        if(!res.authSetting['scope.userLocation']) {
          // 用户未授权
          wx.authorize({  //询问用户是否授权
            scope: 'scope.userLocation',
            success() {
              //用户已授权
              wx.getLocation({
                type: 'wgs84', // 默认GPS坐标，也可传入gcj02
                altitude: false, // 是否返回高度, 会减慢接口返回速度
                success: function(res) {
                  mapUtil.reverseGeocoder({
                    location: {
                      latitude: res.latitude,
                      longitude: res.longitude
                    },
                    success: function(res) {
                      app.globalData.LocationInfo = res.result.ad_info.name
                      // 用户已授权并且全局地址已产生
                      console.log('newhome转换之后------'+app.globalData.LocationInfo)
                      that.setData({
                        havePower: true
                      });
                      that.loadingMore()  
                    },
                    fail: function(res) {
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
        }else{
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
  },
  openLocationSetting:function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting && !res.authSetting["scope.userLocation"]) {
          //未授权则打开授权设置界面
          wx.openSetting({
            success: function(res) {
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
      }else{
        that.getLocation();
      }
      }
    })
  },
  /**
   * 重新授权弹窗
   */
  reAuthorize:function() {
    console.log('重新授权按钮出现')
    var that = this
    that.setData({
      hiddenReAuthorizePop: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function () {
    console.log("--------------------------------触底了---------------------------------")
    const offset = this.data.offsetAndLimit[0] + 3;
    const limit = this.data.offsetAndLimit[1];
    this.setData({
      offsetAndLimit: [offset, limit]
    })
    this.loadingMore()  
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
    console.log("真正用来搜索的关键字是:---" + that.data.key + "--------loadingMore发出了请求" + "_____________")
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