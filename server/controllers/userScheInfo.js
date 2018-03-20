const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers
  var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (!result[0].open_id) {
    // to do
  }
  var schesNanhu = await mysql('scheDesNanhu').select('*').where('openId', result[0].open_id)
  var schesHunnan = await mysql('scheDesHunnan').select('*').where('openId', result[0].open_id)

  var formatDate = function (time) {
    var tmp = new Date(time)
    return tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate() + ' ' + tmp.getHours() + ':' + tmp.getMinutes()
  }

  const resultNanhu = []
  for (let i = 0; i < schesNanhu.length; i++) {
    resultNanhu.push(formatDate(schesNanhu[i].time))
  }

  const resultHunnan = []
  for (let i = 0; i < schesHunnan.length; i++) {
    resultHunnan.push(formatDate(schesHunnan[i].time))
  }

  ctx.state.data = {
    schesNanhu: resultNanhu,
    schesHunnan: resultHunnan,
  }
}