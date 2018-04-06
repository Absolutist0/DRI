//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    phoneNum:"",
    userInfo: false,
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  // 用户登录示例
  onLoad: function () {

    if (this.data.logged) return
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {

          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } 
        else {
/*
          wx.navigateTo({
            url: '../Login/Login',
          })
*/
          util.showBusy('正在登录')
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },
            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
      

        }//else
      },
      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },//onLoad

})
