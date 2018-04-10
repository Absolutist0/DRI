const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers
  var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (!result[0].open_id) {
    // to do
  }

  // var des1 = 'scheDeshunnan'

  var des2 = 'scheDesHunnan'

  var atimes = ctx.query.atimes
  var btimes = ctx.query.btimes
  console.log(atimes)
  console.log(btimes)
  // var all = await mysql(des1).select('*')  
  var selfId = result[0].open_id
  var hunnannamelist = await mysql(des2).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) //浑南时间段内总表

  var formatDate = function (time) {//时间格式改变
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
  }
  // console.log(all)
  // console.log(hunnannamelist)
  // console.log(hunnannamelist)

  ///////////////////////南湖信息处理/////////////////////
  var hunnanforeign = []
  for (let i = 0; i < hunnannamelist.length; i++) {//去除本机信息
    if (hunnannamelist[i].openId != selfId) {
      hunnanforeign.push(hunnannamelist[i])
    }
  }
  var hunnanallusernum = [] // 时间段内筛选后用户信息
  var userid = hunnanforeign[0].openId
  hunnanallusernum.push({
    openId: hunnanforeign[0].openId,
    nickname: hunnanforeign[0].nickname
  })
  console.log(hunnanallusernum)

  for (let i = 0; i < hunnanforeign.length; i++) {
    var index = 0;
    for (let j = 0; j < hunnanallusernum.length; j++) {
      if (hunnanforeign[i].openId == hunnanallusernum[j].openId) {
        index += 1
      }
    }
    if (index == 0) {
      hunnanallusernum.push({
        openId: hunnanforeign[i].openId,
        nickname: hunnanforeign[i].nickname
      })
    }
  }
  console.log(hunnanallusernum)
  // // console.log(z)
  // // console.log('ruok')
  var hunnanfinallist = []  //南湖总表
  for (let i = 0; i < hunnanallusernum.length; i++) {
    var tmp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', hunnanallusernum[i].openId)//获取用户电话号码
    var timeinfo = []//用户对应时间
    for (let j = 0; j < hunnannamelist.length; j++) {//获取时间
      var nowtime = formatDate(hunnannamelist[j].time)
      var nowcapa = hunnannamelist[i].peoplenum
      console.log(nowtime)
      if (hunnannamelist[j].openId == hunnanallusernum[i].openId) {//ID匹配
        if (hunnannamelist[j].status == 0) {//是否满员
          timeinfo.push({
            time: nowtime,
            passenger: nowcapa
          })

        }
      }
    }
    console.log(timeinfo)
    //  console.log(tmp)
    hunnanfinallist.push({
      openId: hunnanallusernum[i].openId,
      nickname: hunnanallusernum[i].nickname,
      phonenumber: tmp[0].phonenumber,
      timeinfo: timeinfo,
    })
  }
  // console.log(hunnanfinallist)
  // console.log(hunnanfinallist[0].timeinfo[0].time) 


  ctx.state.data = { hunnanlist: hunnanfinallist }
}

// const qcloud = require('../qcloud.js')
// const { mysql } = require('../qcloud.js')

// module.exports = async (ctx, next) => {
//   const { 'x-wx-skey': skey } = ctx.headers
//   var result = await mysql('cSessionInfo').select('open_id').where({ skey })
//   if (!result[0].open_id) {
//     // to do
//   }

//   var des1 = 'scheDeshunnan'

//   var des2 = 'scheDesHunnan'

//   var atimes = ctx.query.atimes
//   var btimes = ctx.query.btimes

//   // var hunnannamelist = await mysql(des1).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) // 南湖时间段内总表

//   var hunnannamelist = await mysql(des2).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) //浑南时间段内总表

//   var formatDate = function (time) {//时间格式改变
//     var tmp = new Date(time)
//     return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
//   }
//   var hunnanforeign = []
//   for (let i = 0; i < hunnanforeign.length; i++) {//去除本机信息
//     if (hunnanforeign[i].openId != selfId) {
//       hunnanforeign.push(hunnanforeign[i])
//     }
//   }
//   var hunnanallusernum = [] // 时间段内筛选后用户信息
//   var userid1 = hunnanforeign[0].openId
//   hunnanallusernum.push({
//     openId: hunnanforeign[0].openId,
//     nickname: hunnanforeign[0].nickname
//   })
  
//   for (let i = 0; i < hunnanforeign.length; i++) {
//     var index = 0;
//     for (let j = 0; j < hunnanallusernum.length; j++) {
//       if (hunnanforeign[i].openId == hunnanallusernum[j].openId) {
//         index += 1
//       }
//     }
//     if (index == 0) {
//       hunnanallusernum.push({
//         openId: hunnanforeign[i].openId,
//         nickname: hunnanforeign[i].nickname
//       })
//     }
//   }

//   var hunnanfinallist = []  //浑南总表
//   for (let i = 0; i < hunnanallusernum.length; i++) {
//     var temp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', hunnanallusernum[i].openId)//获取用户电话号码
//     var timeinfo1 = []//用户对应时间
//     for (let j = 0; j < hunnannamelist.length; j++) {//获取时间
//       var nowtime1 = formatDate(hunnannamelist[j].time)
//       var nowcapa1 = hunnannamelist[i].peoplenum
//       if (hunnannamelist[j].openId == hunnanallusernum[i].openId) {//ID匹配
//         if (hunnannamelist[j].status == 0) {//是否满员
//           timeinfo1.push({
//             time: nowtime1,
//             passenger: nowcapa1
//           })
//         }
//       }
//     }
//     console.log(timeinfo1)
//     //  console.log(tmp)
//     hunnanfinallist.push({
//       openId: hunnanallusernum[i].openId,
//       nickname: hunnanallusernum[i].nickname,
//       phonenumber: temp[0].phonenumber,
//       timeinfo: timeinfo1
//     })
//   }
//   console.log(hunnanfinallist)
//   console.log(hunnanfinallist[0].timeinfo[0].time)
//   ////////////////////////浑南结束/////////////////////
//   ctx.state.data = { hunnanlist: hunnanfinallist }
// }

