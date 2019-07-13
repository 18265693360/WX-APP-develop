//index.js
//获取应用实例
const app = getApp();
//引入 封装的axios get post 方法
const axios = require('../../utils/axios');

Page({
   data:{
       swiper:[],
       news:[]
   },
    getSwiper(){
       //将数据放入data
       const _this = this;
       axios.get('/swiper_news').then(res=>{
           // this.setDate({ 错了
           this.setData({
               swiper: res.data
           })
       }).catch(e => console.log(e))
       // wx.request({
       //     url: "https://movie.yaojunrong.com/swiper_news",
       //
       //     //在ajax里面this的指向会发生变化
       //     //谁去调用 sucess函数 就是request后的对象{}
       //     //如何解决 用const _this = this 保存起来this 就可以将数据写入data
       //     success(res){
       //         //数据绑定 保证this指向wx
       //         _this.setData({
       //             swiper: res.data.data
       //         });
       //     },
       //     fail(err){
       //         console.log(err);
       //     },
       //     completed(){
       //         console.log('无论成功还是失败都会继续前进');
       //     }
       // })
    },
    getNews(){
       axios.get('/news',{size:10}).then(res=>{
           // this.setDate({ 又一次
           this.setData({
               news: res.data.map(item=>{
                   item.timeStr = new Date(item.update_time).toLocaleString();
                   return item
               })
           })
       })
    },
    onLoad(){ //在当前页面加载完成后 会主动执行里面的钩子
       this.getSwiper();
       this.getNews();
       // this.setStorage();
    },
    onShow(){//在页面显示

    },
    // setStorage(){
    //   wx.setStorageSync('JJ','zhihui');
    // },
    // // getDate(){
    //    getData(){
    //     console.log(wx.getStorageSync('JJ'));
    // }

    // login(){
    //     wx.request({
    //         success(res) {
    //             const cookie = res.header.set-cookie;
    //             wx.setStorageSync('cookie', 'cookie');
    //             //还要设置axios 每次请求都要带上
    //         }
    //     })
    // },

    //获取微信登录认证
    // getData(){
    //    wx.login({
    //        //微信服务器发的登录认证 相当于会员卡 发给开发者服务器
    //        //从总店得到认证 可以拿着会员卡去分店买东西
    //        code: "0431rW6b1AJFgx0Qsd6b1wU17b11rW6P",
    //        success(res) {
    //            console.log(res);
    //        }
    //    })
    // }


















});