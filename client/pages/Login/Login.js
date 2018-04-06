
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp();
Page({

  data: {
    userInfo: app.userInfo,
    logged: false,
    phoneNum: '',
  },

  input_phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  nextStep: function () {
    
    if (this.data.phoneNum.length == 11) {

      util.showBusy('正在登录')
      qcloud.request({
        url: config.service.requestUrl,
        login: true,
        success(result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result.data.data,
            logged: true
          })
          app.logged = this.data.logged;
        },
        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        }
      })
      wx.redirectTo({
        url: '../index/index',
      })


    }
     else {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})