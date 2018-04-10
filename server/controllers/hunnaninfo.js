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

  var nanhunamelist = await mysql(des1).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) // 南湖时间段内总表

  var hunnannamelist = await mysql(des2).select('*').where('time', '>=', atimes).andWhere('time', '<=', btimes) //浑南时间段内总表

  var formatDate = function (time) {//时间格式改变
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
  }

  ///////////////////////南湖信息处理/////////////////////
  // var nanhuallusernum = [] // 时间段内筛选后用户信息
  // var userid = nanhunamelist[0].openId
  // nanhuallusernum.push({
  //   openId: nanhunamelist[0].openId,
  //   nickname: nanhunamelist[0].nickname
  // })
  // for (let i = 0; i < nanhunamelist.length; i++) { //筛选信息
  //   if (userid != nanhunamelist[i].openId) {
  //     var index = 0;
  //     for (let j = 0; j < nanhuallusernum.length; j++) {
  //       if (nanhunamelist[i].openId == nanhuallusernum[i].openId) {
  //         index += 1
  //       }
  //     }
  //     if (index == 0) {
  //       nanhuallusernum.push({
  //         openId: nanhunamelist[i].openId,
  //         nickname: nanhunamelist[i].nickname
  //       })
  //       userid = nanhunamelist[i].openId
  //     }
  //   }
  // }
  // // console.log(z)
  // // console.log('ruok')
  // var nanhufinallist = []  //南湖总表
  // for (let i = 0; i < nanhuallusernum.length; i++) {
  //   var tmp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', nanhuallusernum[i].openId)//获取用户电话号码
  //   var timeinfo = []//用户对应时间
  //   for (let j = 0; j < nanhunamelist.length; j++) {//获取时间
  //     var nowtime = formatDate(nanhunamelist[j].time)
  //     var nowcapa = nanhunamelist[i].peoplenum
  //     console.log(nowtime)
  //     if (nanhunamelist[j].openId == nanhuallusernum[i].openId) {//ID匹配
  //       if (nanhunamelist[j].status == 0) {//是否满员
  //         timeinfo.push({
  //           time: nowtime,
  //           capacity: nowcapa
  //         })

  //       }
  //     }
  //   }
  //   console.log(timeinfo)
  //   //  console.log(tmp)
  //   nanhufinallist.push({
  //     openId: nanhuallusernum[i].openId,
  //     nickname: nanhuallusernum[i].nickname,
  //     phonenumber: tmp[0].phonenumber,
  //     timeinfo: timeinfo,
  //   })
  // }
  // console.log(nanhufinallist)
  // console.log(nanhufinallist[0].timeinfo[0].time)


  /////////////////////浑南信息处理//////////////////////////
  var hunnanallusernum = [] // 时间段内筛选后用户信息
  var userid1 = hunnannamelist[0].openId
  hunnanallusernum.push({
    openId: hunnannamelist[0].openId,
    nickname: hunnannamelist[0].nickname
  })
  for (let i = 0; i < hunnannamelist.length; i++) { //筛选信息
    if (userid1 != hunnannamelist[i].openId) {
      var index1 = 0;
      for (let j = 0; j < hunnanallusernum.length; j++) {
        if (hunnannamelist[i].openId == hunnanallusernum[j].openId) {
          index1 += 1
        }
      }
      if (index1 == 0) {
        hunnanallusernum.push({
          openId: hunnannamelist[i].openId,
          nickname: hunnannamelist[i].nickname
        })
        userid1 = hunnannamelist[i].openId
      }
    }
  }

  var hunnanfinallist = []  //浑南总表
  for (let i = 0; i < hunnanallusernum.length; i++) {
    var temp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', hunnanallusernum[i].openId)//获取用户电话号码
    var timeinfo1 = []//用户对应时间
    for (let j = 0; j < hunnannamelist.length; j++) {//获取时间
      var nowtime1 = formatDate(hunnannamelist[j].time)
      var nowcapa1 = hunnannamelist[i].peoplenum
      if (hunnannamelist[j].openId == hunnanallusernum[i].openId) {//ID匹配
        if (hunnannamelist[j].status == 0) {//是否满员
          timeinfo1.push({
            time: nowtime1,
            passenger: nowcapa1
          })
        }
      }
    }
    console.log(timeinfo1)
    //  console.log(tmp)
    hunnanfinallist.push({
      openId: hunnanallusernum[i].openId,
      nickname: hunnanallusernum[i].nickname,
      phonenumber: temp[0].phonenumber,
      timeinfo: timeinfo1
    })
  }
  console.log(hunnanfinallist)
  console.log(hunnanfinallist[0].timeinfo[0].time)
  ////////////////////////浑南结束/////////////////////
  ctx.state.data = { hunnanlist: hunnanfinallist }
}
