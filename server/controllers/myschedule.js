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
  var nowid = result[0].open_id
  var nanhusche = await mysql(des1).select('time','peoplenum','status').where('openId',nowid)
  var hunnansche = await mysql(des2).select('time','peoplenum','status').where('openId',nowid)
  const date = new Date()
  
  var nowdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  console.log(nowdate)
  
  var formatDate = function (time) {
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' +       tmp.getHours() + ':' + tmp.getMinutes()
  }
  var changestate = function (status){
    var state = true
    if(status == 0){
      state = false
    }
    return state
  }
  var resultNanhu = []
  for (let i = 0; i < nanhusche.length; i++) {
    var Datea = new Date(nowdate)
    var Dateb = new Date(formatDate(nanhusche[i].time))
    if (Datea <= Dateb) {
      resultNanhu.push({
        time :formatDate(nanhusche[i].time),
        peoplenum : nanhusche[i].peoplenum,
        status : changestate(nanhusche[i].status)
        })
    }
  }
  
  var resultHunnan = []
  for (let i = 0; i < hunnansche.length; i++) {
    var Datea = new Date(nowdate)
    var Dateb = new Date(formatDate(hunnansche[i].time))
    if (Datea <= Dateb) {
      resultHunnan.push({
        time: formatDate(hunnansche[i].time),
        peoplenum: hunnansche[i].peoplenum,
        status: changestate(hunnansche[i].status)
      })
     
    }
  }
  console.log(result)
  console.log(resultNanhu)
  console.log(resultHunnan)
  ctx.state.data = { nanhusche: resultNanhu, hunnansche: resultHunnan}
}