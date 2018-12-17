//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
  },
  onGotUserInfo: function(e) {
    let hidden = true;
    this.setData({
      hidden: hidden,
    })
    var that = this
    if (e.detail.errMsg == 'getUserInfo:ok') {
      var userInfo = e.detail.userInfo
      userInfo.openid = app.globalData.myopenid
      userInfo.codes = that.data.codes
      wx.request({
        url: app.globalData.servsersip + 'api.php/wxfans/saveWxfans',
        data: userInfo,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data)
          app.globalData.uid = res.data.data
          wx.request({
            url: app.globalData.servsersip + 'api.php/wxfans/findWxfans',
            data: {
              openid: app.globalData.myopenid,
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function(ress) {
              app.globalData.userInfo = ress.data.data
              if (that.data.types == 0) {
                wx.reLaunch({
                  url: '../index/index',
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var types = 0
    var scene = decodeURIComponent(options.scene)
    var codes = 0
    if (scene != 'undefined') {
      codes = scene
    }
    if (options.types != undefined) {
      types = options.types;
    }
    this.setData({
      types: types,
      codes: codes
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})