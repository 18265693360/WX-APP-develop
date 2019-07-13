// pages/movie/movie.js
const axios = require('../../utils/axios');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[],
    movies:[],
    pn: 1,//默认第一页
    size: 12//默认一页12个
  },

  getSwiper(){
    axios.get('/swiper').then(res=>{
      this.setData({
        swiper: res.data
      })
    })
  },

  //第一页 第二页 ...页 的数据 应该加在一起放到一页
  //拼接数据 创建一个新的数组  在进行数组合并操作
  getMovies(oldArr = []){
    axios.get('/movies',{
      pn: this.data.pn,
      size: this.data.size
    }).then(res=>{
      this.setData({
        movies: [...oldArr,...res.data],//数组合并操作
        pn: this.data.pn + 1//多加一页
      })
    })
  },



  /**
   * 生命周期函数--监听页面加载
   * onload上需要id 需要的时候添加
   */
  onLoad: function (options) {
    this.getSwiper();
    this.getMovies();
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
   * 下拉刷新数据
   * 1.第一步页面参数初始化
   */
  onPullDownRefresh: function () {
      this.setData({
        //页面初始化
        swiper:[],
        movies:[],
          pn: 1,
        size: 12
      });
    this.getSwiper();
    this.getMovies()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.getMovies(this.data.movies);//无限加载
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})