
Component({
  /**
   * 组件的属性列表
   */
  // 父向子传参需要声明属性
  //observer  查询字符串
  properties: {
      date:{
        type: String,
        observer(newVal){
            if (newVal){
              this.getTimeStr(newVal);
            }
        }
      }
  },
  /**
   * 组件的初始数据
   */
  data: {
      dateStr:""
  },

  /**
   * 组件的方法列表
   */

methods: {
      getTimeStr(time){
        let afterDate = new Date(time);//文章在服务器创建时的事件对象
        let zeroDate = new Date();//今天新的开始 从0开始
        let nowDate = new Date();//现在的时间
        let afterDateTime = Math.round(afterDate.getTime()/1000)
        let nowDateTime = Math.round(nowDate.getTime()/1000);
          //unix时间戳转成秒
          //几分钟前更新
        let disTime = nowDateTime - afterDateTime;
        let zeroDateTime = '';
        let dateStr = '';

           zeroDate.setHours(0);
           zeroDate.setMinutes(0);
           zeroDate.setSeconds(0);
           zeroDate.setMilliseconds(0);
           zeroDateTime = Math.round(zeroDate.getTime()/1000);

           if (disTime > 60 && disTime < (60*60)){
             const min = Math.ceil(disTime / 60 );
               // dateStr:`${min}分钟前` 人家是等号 不是冒号
               dateStr=`${min}分钟前`
           }else if(disTime > 60*60
               &&
               (zeroDateTime -afterDateTime)<0 ){//多少小时前
              const hour = Math.ceil(disTime / (60*60));
                // dateStr: `${hour}小时前`
                dateStr=`${hour}小时前`
           }else if((zeroDateTime - afterDateTime) > 0 && disTime<(60*60*24*30)){
             const day = Math.ceil(disTime / (60*60*24));
               // dateStr: `${day}天前`
               dateStr=`${day}天前`
           }else{
             const month = Math.ceil(disTime/ ( 60*60*34*30))
             dateStr = `${month}月前`;
           }
           this.setData({
             dateStr
           })


        // 文章更新时间
        /*
        * if() 几分钟前
        * else if 几小时前
        * else if 几天前
        * else 几个月前
        * */
      }
  }
});











