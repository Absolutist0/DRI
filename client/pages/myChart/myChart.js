var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    listData: []
  },
  onLoad: function () {
    util.showBusy('查询中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/userScheInfo`,
      login: true,
      success(result) {
        util.showSuccess('上传完成')
        const data = []
        var nanhu = result.data.data.schesNanhu
        if (!nanhu) {
          nanhu = []
        }
        var hunnan = result.data.data.schesHunnan
        if (!hunnan) {
          hunnan = []
        }
        var index = 1
        for (let i = 0; i < nanhu.length; i++) {
          data.push({ code: index, place: "南湖", time: nanhu[i]})
          index++;
        }
        for (let i = 0; i < hunnan.length; i++) {
          data.push({ code: index, place: "浑南", time: hunnan[i] })
          index++;
        }
        that.setData({
          listData: data,
        })
      },
      fail(error) {
        util.showModel('上传失败', error);
      }
    })
  }

})