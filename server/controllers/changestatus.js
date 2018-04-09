const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {
  qcloud.auth.validation(req).then(result => {
    var des = req.query.destination
    //  console.log('ruok')
    var nowtime = req.query.time
    var nowid = result.userinfo.openId
    changesta(des, nowid, nownum)
  })
}
// async function getinfo(des,nowid){
//   var tmp = await mysql(des).select('openId')
//   console.log(tmp)
//   return tmp
// }
async function changesta(des, nowid, nowtime,newstatus) {
  await mysql(des).update({
    status : newstatus
  }).where('openId', nowid).andwhere('time', nowtime)
  console.log('right')
}
