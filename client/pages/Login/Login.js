
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp();
Page({

  data: {
    phoneNum: "请输入您的手机号",
    show: "绑定手机"
  },

  onLoad: function(){
    //访问后端判断是否绑定了手机号
    
  },

  input_phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  nextStep: function () {
    
    if (this.data.phoneNum.length == 11) {
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