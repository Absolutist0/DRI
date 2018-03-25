const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')
module.exports = async (req, res) => {
  qcloud.auth.validation(req).then(result => {
    // result : {
    //   loginState: 0  // 1表示登录成功，0表示登录失败
    //   userinfo: { // 用户信息 }
    // }
    var id = '10492'
    var des = 'scheRemark'
    console.log('ruok')
    for (let i = 0; i < req.query.remark.length; i++){
    mysql(des).insert({
      ID: result.userinfo.openId,
      nickname: req.query.remark[0].name
    }).returning('*').then(res => {
      //console.log(res)
    })
     }
  })
}
/*module.exports = async (ctx, next) => {
  if (ctx.state.$wxInfo.loginState === 1) {
    const query = ctx.query
    const id = 10492 
    const { mysql } = require('../qcloud')
    await mysql('friendsremark').insert({ 
      id: id,
      friendsremark: req.query.remark[0].name
       }).returning('*').then(res => {
    })
  } else {
    ctx.state.code = -1
  }
}*/
