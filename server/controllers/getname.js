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
  
  var atimes = ctx.query.atimes
  var btimes = ctx.query.btimes 
  var nanhunamelist = await mysql(des1).select('openId','nickname').where('time', '>=', atimes).andWhere('time', '<=', btimes)
  var hunnannamelist = await mysql(des2).select('openId', 'nickname').where('time', '>=', atimes).andWhere('time', '<=', btimes)
  var allusernum = []
  var userid = nanhunamelist[0]
  allusernum.push(userid)
  for (let i =0;i < nanhunamelist.length;i++){
      if(userid != nanhunamelist[i].openId){
        var index = 0;
           for(let j = 0 ;j < allusernum.length; j++ ){
                 if( nanhunamelist[i].openId == allusernum[i].openId){
                   index += 1
                 }                                 
           }
           if(index == 0){
             allusernum.push(nanhunamelist[i])
             userid = nanhunamelist[i]
           }
      }
  }
  console.log(allusernum)
  

  ctx.state.data = { nanhulist: nanhunamelist, hunnanlist: hunnannamelist }
}
async function getnumber (openid) {
  var tmp = await mysql('phonenumber').select('nickname', 'phonenumber').where('openId', openid)
  return tmp
}