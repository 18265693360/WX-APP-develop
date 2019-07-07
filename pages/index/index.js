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
    },
    onShow(){//在页面显示

    }
});