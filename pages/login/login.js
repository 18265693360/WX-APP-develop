// pages/login/login.js
const axios = require('../../utils/axios');


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // getCookie(){
  //   wx.request({
  //     success(res) {
  //       res.header //响应头 set-cookie
            //如何在小程序存储set-cookie
            // 用localstorage
  //     }
  //   })
  // },

  login(){
      wx.login({
        success(res){
          console.log(res);
          //axios:get()  //将获得的登录code 用axios 发给后端
        }
    })
  },

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