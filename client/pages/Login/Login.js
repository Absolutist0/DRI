
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
    var that = this
    util.showBusy('查询中...')
    qcloud.request({
      url: `${config.service.host}/weapp/findnumber`,
      data: {        
      },
      login: true,
      success(result) {
        util.showSuccess('查询完成')
      
        var tmp = result.data.data.isexist
        var nownum = result.data.data.phonenum
        that.setData({
          phoneNum: nownum
        })
        console.log(tmp)
        console.log(nownum) 
        if(tmp == true){
          wx.showModal({
            title: '您已绑定手机号',
            content: ' 是否修改手机号：'+ that.data.phoneNum,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  show:"修改手机号"
                })
              } else if (res.cancel) {  
                wx.navigateBack({
                  url: '../index/index'
                })
                console.log('用户点击取消')
              }
            }
          })
        }      
      },
      fail(error) {
        util.showSuccess('未绑定手机号');
      }
    })
    
  },

  input_phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  nextStep: function () {
    
    if (this.data.phoneNum.length == 11) {
      // wx.redirectTo({
      //   url: '../index/index',
      // })
      util.showBusy('上传中...')
      var that = this
      qcloud.request({
        url: `${config.service.host}/weapp/phonenumber`,
        data: {
          phonenumber: that.data.phoneNum,
        },
        login: true,
        success(result) {
          util.showSuccess('上传完成')
          console.log(result)
        },
        fail(error) {
          util.showModel('上传失败', error);
        }
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