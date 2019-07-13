// pages/movieDetails/movieDetails.js
const axios = require('../../utils/axios');

Page({

  /**
   * 页面的初始数据
   */
  //声明变量
  data: {
    movie:{},
    url:'',
    activeIndex:0,
    guess:[],
    currentTime:0,
    isFirst: true
  },

  // 打印出来地址 传参靠dataset（传参的主要方式） 找currentTarget(事件源) 下面有dataset

  changeUrl(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      url: this.data.movie.links[index],
      activeIndex: Number(index)
    })
  },

  getMovie(id){
    axios.get(`/movies/${id}`).then(res=>{
      this.setData({
        movie: res.data,
        url: res.data.links[0]
      })
    })
  },

  getGuess(id){
    axios.get('/guess',{
      id
    }).then(res=>{
      this.setData({
        guess: res.data.map(item=>{
          //增加 actorStr 字符串数据 join 变字符串
          //下面使用 item  上面item=> 就是声明
          item.actorStr = item.actors.join(" ");
          return item
        })
      })
    })
  },
  //记录电影播放到哪里存储
  //什么时候要传给后端 播放进度 两种情况
  // 一，用户主动离开  二，用户点击猜你喜欢 触发两个钩子函数
  getCurrentTime(e){
    const {currentTime} = e.detail;
    if (this.data.isFirst){
      //不是第一次播放 续播的功能 seek
      const videoCtx = wx.createVideoContext("video");
      videoCtx.seek(Number(this.data.continueTime));
      this.setData({
        isFirst: false
      })
    }
    this.setData({
      currentTime
    })
  },
  //封装的上传进度的函数
  uploadPlayStatus(){
    axios.post('/movie_history',{
      movie: this.data.movie._id,
      //进度
      currentTime: this.data.currentTime,
      //片源
      index: this.data.activeIndex
    })
  },
  jump(){
    this.uploadPlayStatus();
  },

  getHistory(id){
    axios.get(`/movie_history/${id}`).then(res=>{
      this.setData({
        //数据回填
        movie: res.data.movie,
        url: res.data.movie.links[Number(res.data.index)],
        activeIndex: Number(res.data.index),
        continueTime: res.data.continueTime
      });

      //续播功能
      const videoCtx = wx.createVideoContext("viedo");
      videoCtx.play();
      this.getGuess(res.data.movie._id);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options;
    this.getHistory(id);
    // this.getMovie(id);
    //此处id 和上面的id 不同 一个是历史 一个是猜你
    // this.getGuess(id)
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
    this.uploadPlayStatus();
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