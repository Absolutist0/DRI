const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers
  var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (!result[0].open_id) {
    // to do
  }
  
  var des1 = 'scheDesNanhu'  
  
  var des2 = 'scheDesHunnan'
  
  var atimes = ctx.query.atimes
  var btimes = ctx.query.btimes 
  console.log(atimes)
  console.log(btimes)
  var all = await mysql(des1).select('*')
  var nanhunamelist = await mysql(des1).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) // 南湖时间段内总表
  
  //var hunnannamelist = await mysql(des2).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) //浑南时间段内总表

  var formatDate = function (time) {//时间格式改变
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
  }
  // console.log(all)
  // console.log(nanhunamelist)
  // console.log(hunnannamelist)

  ///////////////////////南湖信息处理/////////////////////
  var nanhuallusernum = [] // 时间段内筛选后用户信息
  var userid = nanhunamelist[0].openId
  nanhuallusernum.push({
    openId: nanhunamelist[0].openId,
    nickname : nanhunamelist[0].nickname
  })
  console.log(nanhuallusernum)
  
     for(let i =0 ;i<nanhunamelist.length ;i++){
       var index = 0;
       for (let j = 0; j < nanhuallusernum.length; j++) {
         if (nanhunamelist[i].openId == nanhuallusernum[j].openId) {
           index += 1
         }
       }
       if (index == 0) {
         nanhuallusernum.push({
           openId: nanhunamelist[i].openId,
           nickname: nanhunamelist[i].nickname
         })        
       }
     }
  console.log(nanhuallusernum)
  // // console.log(z)
  // // console.log('ruok')
    var nanhufinallist = []  //南湖总表
  for (let i = 0; i < nanhuallusernum.length ; i++){
    var tmp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', nanhuallusernum[i].openId)//获取用户电话号码
      var timeinfo = []//用户对应时间
    for(let j =0;j < nanhunamelist.length ; j++){//获取时间
      var nowtime = formatDate(nanhunamelist[j].time)
      var nowcapa = nanhunamelist[i].peoplenum
      console.log(nowtime)
      if (nanhunamelist[j].openId == nanhuallusernum[i].openId ) {//ID匹配
        if(nanhunamelist[j].status == 0){//是否满员
            timeinfo.push({
              time : nowtime,
              passenger : nowcapa
            })
            
        }
      }
    }  
    console.log(timeinfo)
    //  console.log(tmp)
     nanhufinallist.push({
        openId: nanhuallusernum[i].openId ,
        nickname: nanhuallusernum[i].nickname ,
        phonenumber : tmp[0].phonenumber ,
        timeinfo : timeinfo,
      })
   }
  // console.log(nanhufinallist)
  // console.log(nanhufinallist[0].timeinfo[0].time) 
  
  
  ctx.state.data = { nanhulist: nanhufinallist }
}
