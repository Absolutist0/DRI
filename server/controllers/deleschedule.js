const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {      
  qcloud.auth.validation(req).then(result => { 
    var des = req.query.destination     
    //  console.log('ruok')
    var nowtime = req.query.time
    var nowid = result.userinfo.openId          
    deleteinfo(des,nowid,nownum)     
    })
}
// async function getinfo(des,nowid){
//   var tmp = await mysql(des).select('openId')
//   console.log(tmp)
//   return tmp
// }
async function deleteinfo (des,nowid,nowtime){
  await mysql(des).del().where('openId',nowid).andwhere('time',nowtime)
  console.log('fuck')
}
