const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {
  qcloud.auth.validation(req).then(result => {
    if (req.query.des == "南湖") {
      var des = 'scheDesNanhu'
    }
    else {
      var des = 'scheDesHunnan'
    }
    //  console.log('ruok')
    var nowtime = req.query.time
    var newstate = req.query.state
    // console.log(nowtime)
    console.log(newstate)
    var nowid = result.userinfo.openId
    var alltime = getinfo(des, nowid)
    for (let i = 0; i < alltime.length; i++) {
      if (nowtime == formatDate(alltime[i].time)) {
        nowtime = alltime[i].time
        break
      }
    }
    if(newstate == 'false'){
      // console.log('ruok')
      newstate = 0
    }
    else{
      newstate = 1
    }
    console.log(newstate)
    // console.log(des)
    // console.log(nowid)
    // console.log(nowtime)     
    changesta(des, nowid, nowtime,newstate)
  })
}
var formatDate = function (time) {
  var tmp = new Date(time)
  return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
}

async function getinfo(des, nowid) {
  var tmp = await mysql(des).select('time')
  // console.log(tmp)
  return tmp
}
async function changesta(des, nowid, nowtime,newstatus) {
  await mysql(des).update({
    status : newstatus
  }).where('openId', nowid).andWhere('time', nowtime)
  // console.log('right')
}
