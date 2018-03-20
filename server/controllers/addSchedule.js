const qcloud = require('../qcloud.js')
const { mysql } = require('../qcloud.js')

module.exports = async (req, res) => {
  qcloud.auth.validation(req).then(result => {
    // result : {
    //   loginState: 0  // 1表示登录成功，0表示登录失败
    //   userinfo: { // 用户信息 }
    // }
    var des;
    if (result.loginState == 0) {
      //to do
    }
    if (req.query.destination == 0) {
      des = 'scheDesNanhu'
    }
    else {
      des = 'scheDesHunnan'
    }
    mysql(des).insert({
      openId: result.userinfo.openId,
      time: req.query.times,
    }).returning('*').then (res => {
      //console.log(res)
    })
  })
}
