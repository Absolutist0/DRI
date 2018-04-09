const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {      
  qcloud.auth.validation(req).then(result => { 
    if (req.query.des == "南湖"){
      var des = 'scheDesNanhu'    
    } 
    else{
      var des = 'scheDesHunnan'  
    }
    //  console.log('ruok')
    var nowtime = req.query.time
    console.log(nowtime)
    var nowid = result.userinfo.openId          
    var alltime = getinfo(des,nowid)
    for (let i = 0; i < alltime.length; i++){
      if (nowtime == formatDate(alltime[i].time) ){
          nowtime = alltime[i].time
          break
      }
    } 
    console.log(des)
    console.log(nowid)
    console.log(nowtime)
    deleteinfo(des,nowid,nowtime)     
    })

}

var formatDate = function (time) {
  var tmp = new Date(time)
  return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
}

async function getinfo(des,nowid){
  var tmp = await mysql(des).select('time')
  console.log(tmp)
  return tmp
}

async function deleteinfo(des,nowid,nowtime){
  await mysql(des).del().where('openId', nowid).andWhere('time',nowtime)
  console.log('fuck')
}
