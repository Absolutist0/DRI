var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phoneNum:'',
    listShow: {}
  },


  onLoad:function(){
    this.data.listShow = app.listShow,
    this.setData({
      'listShow':this.data.listShow
    })
  },


  getName: function(e){
    this.setData({
      name:e.detail.value
    })
  },

  getNumber:function(e){
    this.setData({
      phoneNum:e.detail.value
    })
  },

  addFriend:function(){
    var newfriend={
      title:this.data.name,
      phone:this.data.phoneNum,
      show:false
    };
    this.setData({
      'listShow':this.data.listShow.concat(newfriend)
    });
    app.listShow = this.data.listShow
  },
  
  
})