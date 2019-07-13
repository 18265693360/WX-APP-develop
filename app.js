//app.js  全局的JS 项目不管运行到那里都会执行
const axios = require('./utils/axios');

// AppID(小程序ID)	wx5fb8c096bd8d713d
// AppSecret(小程序密钥) a43418f59c70505b99205cce53644f11

App({
  globalData: {
    userInfo: null
  },
  login(){
    wx.login({
      success(res){
        console.log(res);
        //这三个参数第一个必要  第二 三参数是为了让小程序与数据紧密结合
        //在实际运用中是后端写好的 没必要
        // appid secret 会让现在的后端获取登录态
        // code.appid.secret
        axios.post('/login',{
          code: res.code,
          appid: 'wx5fb8c096bd8d713d',
          secret:'a43418f59c70505b99205cce53644f11'
          //以上获取总店就是微信服务器的会员卡 token 需要存储起来
          //存起来token  每次请求数据都要拿出来 所以要取出来
        }).then(tokenData =>{
          // wx.setStorageSync('token', 没有引号'tokenData.token');
          wx.setStorageSync('token', tokenData.token);
        })
      }
    })
  },

  onLaunch(){//微信小 程序初始化运行的钩子
    this.login();
  }
});