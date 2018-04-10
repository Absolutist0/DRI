var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
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

  submitnanhu: function () {
    util.showBusy('查询中...')
    var that = this
    var date = that.data.year + '-' + that.data.month + '-' + that.data.day
    var atime, btime
    if (that.data.timeNo == 0) {
      atime = '06:00'
      btime = '12:00'
    }
    else if (that.data.timeNo == 1) {
      atime = '12:00'
      btime = '18:00'
    }
    else {
      atime = '18:00'
      btime = '23:00'
    }
    qcloud.request({
      url: `${config.service.host}/weapp/nanhuinfo`,
      data: {
        atimes: date + ' ' + atime,
        btimes: date + ' ' + btime,        
        //destination: that.data.destination,
      },
      login: true,
      success(result) {
        util.showSuccess('查询完成')
        var tmp = result.data.data.nanhulist
        var data = []
        for(let i = 0 ; i<tmp.length ; i++){
            data.push({
              title : tmp[i].nickname,
              phone : tmp[i].phonenumber,
              stroke :tmp[i].timeinfo,
              show : false
            })
        }
        var model = JSON.stringify(data);
        console.log(model)
        wx.navigateTo({          
          url: '../toNanHu/toNanHu?model='+model,
        })        
          console.log(result)
        
      },
      fail(error) {
        wx.showModal({
          title: '查询失败',
          content: '所选时间段没有人发布行程',
        })
      }
    })
  },
  submithunnan: function () {
    util.showBusy('查询中...')
    var that = this
    var date = that.data.year + '-' + that.data.month + '-' + that.data.day
    var atime, btime
    if (that.data.timeNo == 0) {
      atime = '06:00'
      btime = '12:00'
    }
    else if (that.data.timeNo == 1) {
      atime = '12:00'
      btime = '18:00'
    }
    else {
      atime = '18:00'
      btime = '23:00'
    }
    qcloud.request({
      url: `${config.service.host}/weapp/hunnaninfo`,
      data: {
        atimes: date + ' ' + atime,
        btimes: date + ' ' + btime,
        //destination: that.data.destination,
      },
      login: true,
      success(result) {
        util.showSuccess('查询完成')
        var tmp = result.data.data.hunnanlist
        var data = []
        for (let i = 0; i < tmp.length; i++) {
          data.push({
            title: tmp[i].nickname,
            phone: tmp[i].phonenumber,
            stroke: tmp[i].timeinfo,
            show: false
          })
        }
        var model = JSON.stringify(data);
        console.log(model)
        wx.navigateTo({
          url: '../toHunNan/toHunNan?model=' + model,
        })
        console.log(result)

      },
      fail(error) {
        wx.showModal({
          title: '查询失败',
          content: '当前时间段没有人发布行程',
        })
      }
    })
  }
})