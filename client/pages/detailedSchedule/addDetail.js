var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const date = new Date()

const years = []
const months = []
const days = []
const hours = []
const minutes = []

for (let i = date.getFullYear(); i < date.getFullYear() + 5; i++) {
  years.push(i + "年")
}

for (let i = 1; i <= 12; i++) {
  months.push(i + "月")
}

for (let i = 1; i <= 31; i++) {
  days.push(i + "日")
}

for (let i = 0; i < 24; i++) {
  hours.push(i + "时")
}

for (let i = 0; i < 60; i++) {
  minutes.push(i + "分")
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    year: date.getFullYear(),
    years: years,
    month: date.getMonth() + 1,
    months: months,
    day: date.getDate(),
    days: days,
    hour: date.getHours(),
    hours: hours,
    minute: date.getMinutes(),
    minutes: minutes,
    places: [{ name: "南湖", id: 0, checked: true, }, { name: "浑南", id: 1, checked: false, }],
    destination: 0,
    value: [0, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
  },

  selectDate: function (e) {
    const val = e.detail.value
    this.setData({
      year: date.getFullYear() + val[0],
      month: val[1] + 1,
      day: val[2] + 1,
      hour: val[3],
      minute: val[4],
    })
  },

  selectDestination: function (e) {
    this.setData({ destination: e.detail.value, })
  },

  submit: function () {
    util.showBusy('上传中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/addSchedule`,
      data: {
        times: that.data.year + '-' + that.data.month + '-' + that.data.day + ' ' + that.data.hour + ':' + that.data.minute,
        destination: that.data.destination,
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