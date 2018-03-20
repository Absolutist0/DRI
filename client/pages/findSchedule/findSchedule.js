var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const date = new Date()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    timeNo: 0,
    time: "上午",
    days: ["今天", "明天", "后天"],
    times: ["上午", "下午", "晚上"],
    places: [{ name: "南湖", id: 0, checked: true, }, { name: "浑南", id: 1, checked: false, }],
    destination: 0,
  },

  selectDate: function (e) {
    const val = e.detail.value
    var curDate = new Date();
    var date = new Date((curDate / 1000 + 86400 * val[0]) * 1000)
    var tmp_time
    if (val[1] == 0) {
      tmp_time = "上午"
    }
    else if (val[1] == 1) {
      tmp_time = "下午"
    }
    else {
      tmp_time = "晚上"
    }
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      time: tmp_time,
      timeNo: val[1],
    })
  },

  selectDestination: function (e) {
    this.setData({ destination: e.detail.value, })
  },

  submit: function () {
    util.showBusy('查询中...')
    var that = this
    var date = that.data.year + '-' + that.data.month + '-' + that.data.day
    var atime, btime, ctime
    if (that.data.timeNo == 0) {
      atime = '06:00'
      btime = '06:00'
      ctime = '12:00'
    }
    else if (that.data.timeNo == 1) {
      atime = '12:00'
      btime = '12:00'
      ctime = '18:00'
    }
    else {
      atime = '18:00'
      btime = '18:00'
      ctime = '23:00'
    }
    qcloud.request({
      url: `${config.service.host}/weapp/findSchedule`,
      data: {
        atimes: date + ' ' + atime,
        btimes: date + ' ' + btime,
        ctimes: date + ' ' + ctime,
        destination: that.data.destination,
      },
      login: true,
      success(result) {
        util.showSuccess('查询完成')
        var tmp = result.data.data.bestTime
        console.log(result)
        var adate = ''
        var bdate = ''
        var cdate = ''
        if (tmp.length >= 1) {
          adate = tmp[0]
        }
        if (tmp.length >= 2) {
          bdate = tmp[1]
        }
        if (tmp.length >= 3) {
          cdate = tmp[2]
        }
        wx.navigateTo({
          url: '../showResult/showResult?adate=' + adate + '&bdate=' + bdate + '&cdate=' + cdate + '&num=' + tmp.length,
        })
      },
      fail(error) {
        util.showModel('上传失败', error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})