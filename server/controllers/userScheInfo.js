const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers

   var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (result[0].open_id) {
    
    // to do
  }
  var schesNanhu = await mysql('scheDesNanhu').select('*')//.where('openId', result[0].open_id)
  var schesHunnan = await mysql('scheDesHunnan').select('*')//.where('openId', result[0].open_id)
  const date = new Date()
  var nowdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() 
  console.log(nowdate)
  var formatDate = function (time) {
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
  }
  var judgeDate = function(time) {
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() 
  }

  const resultNanhu = []
  const resultnickname=[]
  for (let i = 0; i < schesNanhu.length; i++) {
    var Datea = new Date(nowdate)
    var Dateb = new Date(judgeDate(schesNanhu[i].time))
    if( Datea <= Dateb ){
    resultNanhu.push(formatDate(schesNanhu[i].time))
    resultnickname.push(schesNanhu[i].nickname)
    }
  }

  const resultHunnan = []
  for (let i = 0; i < schesHunnan.length; i++) {
    var Datea = new Date(nowdate)
    var Dateb = new Date(judgeDate(schesHunnan[i].time))
    if (Datea <= Dateb) {
    resultHunnan.push(formatDate(schesHunnan[i].time))
    resultnickname.push(schesHunnan[i].nickname)
    }
  }

  ctx.state.data = {
    schesNanhu: resultNanhu,
    schesHunnan: resultHunnan,
    nickname:resultnickname,
  }
}