// components/storeList/storeList.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Tabindex: {
      type: Number,
      value: 0,
      observer: '_storeListChange'
    },
    offsetAndLimit: {
      type: Array,
      value: [0,8],
      observer: '_loadingMore'
    },
    searchKey: {
      type: String,
      value: '',
      observer: '_search',
      offsetAndLimit: [0,3]
    }
  },

  options: {
    // styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCard: true, // 控制卡片形式
    hasLoading: false, // 控制有没有加载条
    hasErro: false, // 控制有没有加载错误条
    isLoad: false, // 控制加载条状态,加载中或加载完成
    storeClass: '0', // 店铺类型,  0餐饮/1银行/2个人/3其他
    offsetAndLimit: [0, 3], // 分页, 初始页
    storeList: [], 
    key: '', // 搜索的关键字
  },

  /**
   * 生命周期
   */
  lifetimes: {
    attached() {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showStore:(e)=> {
      console.log('卡片被点击了, 卡片内容: ' + e.currentTarget.dataset.detail.storeName)
    },

  _search: function(value) {
    this.setData({
      storeList:[],
      key: value
    })
    var that  = this
    console.log('改变了关键字-----------------------'+that.data.key)
  },

    /**
     * 改变店铺类型
     */
    _storeListChange:function(value) {
      console.log('改变店铺的方法执行了-----------------------')
      this.setData({
        storeList: [],
        storeClass: value
      })
    },
    /**
     * 加载更多店铺列表
     */
    _loadingMore: function(value) {
      const that = this;
      this.setData({
        offsetAndLimit: value,
        hasLoading: true,
        hasErro: false,
        isLoad: false
      })
      console.log("真正用来搜索的关键字是:---"+that.data.key+"--------loadingMore发出了请求"+"_____________"+value)
      wx.request({
        url: 'https://www.paion.xyz/queue/store/showStoreList',
        data: {
          'Location': app.globalData.LocationInfo,
          'offset': value[0],
          'limit': value[1],
          'storeClass': that.data.storeClass,
          'key': that.data.key
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if(res.data == '') {
            // 加载的数据为空
            that.setData({
              hasLoading: true,
              isLoad: true
            })
          }else {
            // 加载的数据不为空,把新数据添加到老数据后
            var newStoreList = (that.data.storeList).concat(res.data)
            that.setData({
              storeList: newStoreList,
              hasLoading: false
            })
          }
        },
        fail: function (res) {
          that.setData({
            hasLoading: false,
            hasErro: true
          })
        }
      })
    }
    
  }
})
