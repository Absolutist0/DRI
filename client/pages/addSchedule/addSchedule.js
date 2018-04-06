var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const date = new Date()

const hours = []
const minutes = []

for (let i = 0; i < 24; i++) {
  hours.push(i.toString() + "时")
}

for (let i = 0; i < 6; i++) {
  minutes.push(i.toString() + "0分")
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    days: ["今天", "明天", "后天"],
    hour: date.getHours(),
    hours: hours,
    minute: parseInt(date.getMinutes() / 10) * 10,
    minutes: minutes,
    places: [{ name: "南湖", id: 0, checked: true, }, { name: "浑南", id: 1, checked: false, }],
    passenger: [{ num: 4, checked: true }, { num: 3, checked: false},
    {num: 2, checked: false }, { num: 1, checked: false}],
    value: [0, date.getHours(), parseInt(date.getMinutes() / 10)],
    destination: 0,
    passNum:0
  },

  selectDate: function (e) {
    const val = e.detail.value
    var curDate = new Date();
    var date = new Date((curDate / 1000 + 86400 * val[0]) * 1000)
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: val[1],
      minute: val[2] * 10,
    })
  },

  selectDestination: function (e) {
    this.setData({ destination: e.detail.value, })
  },

  selectPassenger: function(e){
    this.setData({ passNum: e.detail.value })
  },

  submit: function () {
    util.showBusy('上传中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/addSchedule`,
      data: {
        times: that.data.year + '-' + that.data.month + '-' + that.data.day + ' ' + that.data.hour          + ':' + that.data.minute,
        destination: that.data.destination,
        passNum:that.data.passNum
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

})