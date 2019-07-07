// pages/articleDetails/articleDetails.js
const axios = require('../../utils/axios');
const wxParse = require('../../wxParse/wxParse')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      res:{},
      content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options;
    this.getData(id);
  },

  // 获得副文本 innertext 小程序不认识 就会要组件 rich-text
  getData(id){
    axios.get(`/news/${id}`).then(res=>{
      this.setData({
        res: res.data
      });
      wxParse.wxParse('content', 'html', res.data.content, this)
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
  onShareAppMessage: function (from, target) {
      return{
        //这是data 上的数据 当前页面上的数据 访问+data  vue不用data
        title: this.data.res.title,
        path:"/pages/articleDetails/articleDetails?id="+
        this.data.res._id,
        imageUrl: this.data.res.img
        //必须绝对路径 完整的路径  '/'开头
      }
  }
})