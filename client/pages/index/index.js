//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    userInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    phoneNum:false
  },

  // 用户登录示例
  onLoad: function () {
   //访问后端,如果已经绑定手机号 将PhoneNum改成true


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

  addSchedule: function(){
    if(this.data.phoneNum){
      wx.navigateTo({
        url: '../addSchedule/addSchedule',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '未绑定手机号！去绑定我的手机号？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../Login/Login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  findSchedule: function(){
    if(this.data.phoneNum){
      wx.navigateTo({
        url: '../findSchedule/findSchedule',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '未绑定手机号！去绑定我的手机号？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../Login/Login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  myItinerary: function(){
    if(this.data.phoneNum){
      wx.navigateTo({
        url: '../myItinerary/myItinerary',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '未绑定手机号！去绑定我的手机号？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../Login/Login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }

})
