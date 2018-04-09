const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers
  var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (!result[0].open_id) {
    // to do
  }
  console.log(result)
  var des1 = 'scheDesNanhu'
  var des2 = 'scheDesHunnan'
  var nowid = result[0].open_id
  var nanhusche = await mysql(des1).select('time','peoplenum').where('openId',nowid)
  var hunnansche = await mysql(des2).select('time','peoplenum').where('openId',nowid)
  console.log(nanhusche)
  console.log(hunnansche)
  ctx.state.data = {nanhusche: nanhusche, hunnansche:hunnansche}
}