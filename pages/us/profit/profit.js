// pages/us/profit/profit.js
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

for (let i = 1; i <= 31; i++) {
    days.push(i)
}


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

        show:false,//判断显示 
        list:[
            {
                peoName: "朱小明",//这个必须存在才能显示下面数据
                pay: [
                    {
                        money: "40",//价格
                        day: "2018-12-13",//显示日期时间
                    },
                    {
                        money: "500",//价格
                        day: "2018-12-14",//显示日期时间
                    }
                ]//收益
            },
            {
                peoName: "王大锤",//这个必须存在才能显示下面数据
                pay: [
                    {
                        money: "40",//价格
                        day: "2018-12-13",//显示日期时间
                    },
                    {
                        money: "500",//价格
                        day: "2018-12-14",//显示日期时间
                    }
                ]//收益
            },
        ],
        moomNum:"全部",
    },
    // 选择时间
    bindChange(e) {
        const val = e.detail.value;
        let _this=this;
        console.log(val)
        console.log(e)
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]],
            moomNum: this.data.years[val[0]] + "年-" + this.data.months[val[1]] + "月-" + this.data.days[val[2]] + "日"
        })
    },
    select_moode(){
        let _this=this;
        let show = _this.data.show;
        show =! show;
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

    }
})