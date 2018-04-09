const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {
  var des = 'phonenumber'      
  var tmp =  await mysql(des).select('openId')
  var id = 0 
  console.log(tmp) 
  qcloud.auth.validation(req).then(result => {     
     console.log('ruok')
      var nownum = req.query.phonenumber
      var nowid = result.userinfo.openId   
      for (let i = 0; i <tmp.length ; i++){
        if(nowid == tmp[i].openId){
           id += 1
           break
        }
      }
      if(id == 0){
      mysql(des).insert({
        openId: result.userinfo.openId,
        nickname: result.userinfo.nickName,
        phonenumber: nownum,
      }).returning('*').then(res => {
        console.log(res)
      })
      }
      else{
        update(des,nowid,nownum)
      }
    
  })
}
async function update (des,nowid,nownum){
  await mysql(des).update({
    phonenumber: nownum
  }).where('openId',nowid)
  console.log('fuck')
}
