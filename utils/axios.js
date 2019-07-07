//不用this
// const obj = {
//     sendMsg(url,data,method){
//         return new Promise((resolve, reject)=>{
//             wx.request({
//                 url,
//                 data,
//                 method,//模式 get post
//                 success(res) {
//                     resolve(res.data)
//                 },
//                 fail: err => {
//                     reject(err)
//                 }
//             })
//         })
//     },
//     get(url, data){
//         return
//     }
// };

//为了方便继续下面页面的数据请求 封装axios 习惯axios写法
//用class 封装
class Axios {
    constructor(options){
        this.baseURL = options.baseURL || 'https://movie.yaojunrong.com';
    }
    sendMsg(url, data,method){
        const _this = this;
        return new Promise((resolve ,reject)=>{
            wx.request({
                url: _this.baseURL + url,
                data,
                method,
                success(res) {
                    resolve(res.data)
                },
                fail: err=>{
                    reject(err)
                }
            })
        })
    }
    get(url, data){
        return this.sendMsg(url, data, 'GET')
    }
    post(url, data){
        return this.sendMsg(url, data, 'POST')
    }
}

const axios = new Axios({
     baseURL: "https://movie.yaojunrong.com"
});


//忘记导出了 所以axios.get is not a function
module.exports = axios;

