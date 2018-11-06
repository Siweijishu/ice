const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Mycomment:[ ],
    pagenum: 1
  },
    changePreview(e){
        var self = this;
        var see = e.currentTarget.dataset.see.picture_list;
        let index = e.currentTarget.dataset.index;
        console.log(see);
        console.log(see[index]);
        wx.previewImage({
            current: see[index],
            urls: see,
        })
    },
    del_see(e){
        let index = e.currentTarget.dataset.index;
        let Mycomment = this.data.Mycomment;
        console.log(Mycomment)
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除该商品吗？亲',
            success: function (del) {
                if (del.confirm) {
                    wx.request({
                        url: app.globalData.servsersip + 'api.php/wxfans/del_evaluate',
                        data: {
                            id: Mycomment[index].id
                        },
                        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        header: { // 设置请求的 header
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(res)
                            let delGoods = Mycomment.splice(index, 1);
                            that.setData({
                                Mycomment: Mycomment
                            })
                        }
                    })
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success'
                    })
                }
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      pagenum: 1,
    })
    that.DataonLoad();
  },
  DataonLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.servsersip + 'api.php/wxfans/userevaluate',
      data: {
        uid: app.globalData.uid,
        //   uid:8,
        pagenum: that.data.pagenum
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          console.log(res.data.data)
        if (res.data.data.length > 0) {
          if (that.data.pagenum == 1) {
            var l = []
          } else {
            var l = that.data.Mycomment
          }
          for (var i = 0; i < res.data.data.length; i++) {
            l.push(res.data.data[i])
          }
          that.setData({
            Mycomment: l,
            pagenum: that.data.pagenum + 1,
            Dataloading: "上拉加载更多"
          });
        } else {
          if (that.data.pagenum == 1) {
            wx.showToast({
              title: '没有任何的评价',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              Mycomment: [],
              pagenum: that.data.pagenum + 1
            });
          } else {
            wx.showToast({
              title: '已加载完全部',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              pagenum: that.data.pagenum + 1,
              Dataloading: "已加载完全部"
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
    var that = this
    that.DataonLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})