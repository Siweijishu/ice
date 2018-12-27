// pages/us/profit/profit.js
const app = getApp();
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

// for (let i = 1; i <= 31; i++) {
//     days.push(i)
// }


Page({

  /**
   * 页面的初始数据
   */
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
    pagenum:1,
    show: false, //判断显示 
    list: [{
        peoName: "朱小明", //这个必须存在才能显示下面数据
        money: "40", //价格
        day: "2018-12-13", //显示日期时间

      },
      {
        peoName: "王大锤", //这个必须存在才能显示下面数据
        money: "40", //价格
        day: "2018-12-13", //显示日期时间
      },
    ],
    moomNum: "全部",
    times:""
  },
  // 选择时间
  bindChange(e) {
    const val = e.detail.value;
    let _this = this;
    console.log(val)
    console.log(e)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      //day: this.data.days[val[2]],
      moomNum: this.data.years[val[0]] + "年-" + this.data.months[val[1]] + "月", //+ this.data.days[val[2]] + "日",
      times: this.data.years[val[0]] + "-" + this.data.months[val[1]],
      pagenum:1
    })
    this.DataonLoad();
  },
  select_moode() {
    let _this = this;
    let show = _this.data.show;
    show = !show;
    // console.log(show)
    _this.setData({
      show: show
    })
  },
  // sel(e){
  //     let idx = e.currentTarget.dataset.idx;
  //     let _this=this;
  //     let moods = _this.data.moods;
  //     let moomNum = _this.data.moomNum;
  //     for (let i=0;i<moods.length;i++){
  //         moods[i].selLook=false;
  //     }
  //     moods[idx].selLook=true;
  //     moomNum = moods[idx].mood
  //     _this.setData({
  //         moods: moods,
  //         moomNum: moomNum
  //     })
  //     this.select_moode();
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      pagenum: 1
    });
    that.DataonLoad();
  },
  DataonLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.servsersip + 'api.php/wxfans/dprice',
      data: {
        t_id: app.globalData.uid,
        pagenum: that.data.pagenum,
        times: that.data.times
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data.length > 0) {
          if (that.data.pagenum == 1) {
            var l = []
          } else {
            var l = that.data.list
          }
          for (var i = 0; i < res.data.data.length; i++) {
            l.push(res.data.data[i])
          }
          that.setData({
            list: l,
            pagenum: that.data.pagenum + 1
          });
        } else {
          if (that.data.pagenum == 1) {
            wx.showToast({
              title: '没有信息记录',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              list: [],
              pagenum: that.data.pagenum + 1
            });
          } else {
            wx.showToast({
              title: '已加载完全部信息',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              pagenum: that.data.pagenum + 1
            });
          }
        }
        // that.setData({
        //   collectList: collectList,
        // })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
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
    this.DataonLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})