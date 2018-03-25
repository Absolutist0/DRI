var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    name:"",
    phoneNum:"",
    listShow: {}
  },

  onLoad: function (e) {
    this.data.listShow = app.listShow,
      this.setData({
        'listShow': this.data.listShow,
        index:e.index
      })
  },


  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  getNumber: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  editFriend: function (e) {
    if(this.data.name!=""){
      var name_change = "listShow[" + this.data.index + "].title";
      this.setData({
        [name_change]:this.data.name,
      })
      app.listShow = this.data.listShow;
    }else if(this.data.phoneNum!=""){
      var phoneNum_change = "listShow[" + this.data.index + "].phone";
      this.setData({
        [phoneNum_change]: this.data.phoneNum
      })
      app.listShow = this.data.listShow;
    }
  },

  deleteFriend:function(e){
    this.data.listShow.splice(this.data.index,1);
    this.setData({
      'listShow':this.data.listShow
    })
    app.listShow = this.data.listShow;
  },
  
})