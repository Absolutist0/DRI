const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  const { 'x-wx-skey': skey } = ctx.headers
  var result = await mysql('cSessionInfo').select('open_id').where({ skey })
  if (!result[0].open_id) {
    // to do
  }
  var des ='phonenumber'
  var nowid = result[0].open_id
  var tmp = await mysql(des).select('phonenumber').where('openId', nowid)
  console.log(tmp)
  var res = true
  if (tmp.length == 0) {
    res = false
  }
  if (tmp.length == 1) {
    res = true
  }
  var phonenum = tmp[0].phonenumber
   ctx.state.data = { isexist: res ,phonenum : phonenum }
}