// pages/history/history.js
//获取数据要用axios
const axios = require('../../utils/axios');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[]
  },

  //将数据取过来 观影记录
  getHistory(){
    axios.get('/movie_history').then(res=>{
      var str = '';
      this.setData({
        history:res.data.map(item=>{
          item.percent = Number(item.continueTime) * 100 /
              ((item.movie.mins)*60);
          if (item.continueTime < 60){
            str = '观看不足一分钟'
          } else {
            str = `已观看${Math.round(item.continueTime/60)}`
          }
          item.str = str;
          return item;
        })
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory();
  },

  jump(e){
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/movie_history/movie_history?id=${id}`
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})