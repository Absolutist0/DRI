var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    listShow: [
      // {
      //   title: "kobe",
      //   phone: 12580,
      //   stroke: [{
      //     time: "",
      //     passenger: "2"
      //   }, {
      //     time: "",
      //     passenger: "1"
      //   }],
      //   show: false
      // }, {
      //   title: "love",
      //   phone: 12580,
      //   stroke: [{
      //     time: "2018-4-10 19:10",
      //     passenger: "2"
      //   }, {
      //     time: "",
      //     passenger: "1"
      //     },{
      //       time: "",
      //       passenger: "1"
      //   }, {
      //     time: "",
      //     passenger: "1"
      //   }
      //   ],
      //   show: false
      // }

    ]
  },

  phoneNumTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['呼叫'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNum,
          })
        }
      }
    })
  },

  showContent: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var key = "listShow[" + index + "].show";
    var val = this.data.listShow[index].show;
    this.setData({
      [key]: !val
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.model)
    var bean = JSON.parse(options.model);
    console.log(bean)
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
          listShow: bean
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          contentHeight: (res.windowHeight - 72 * res.screenWidth / 750)
        });
      }
    })
  },

  onTabItemTap: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },

})