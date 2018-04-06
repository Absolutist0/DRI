var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    listData: [{
      time:"4.5 21:46",
      destination:"浑南",
      isTouchMove: false
    },{
      time:"4.5 21:46",
      destination: "南湖",
      isTouchMove: false
    }],
    startX:0,
    startY:0
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.listData.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      listData: this.data.listData
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      that.data.listData.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      listData: that.data.listData
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.listData.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      listData: this.data.listData
    })
  }
  
  /*
  onLoad: function () {
    util.showBusy('查询中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/userScheInfo`,
      login: true,
      success(result) {
        util.showSuccess('查询完成')
        const data = []
        var nanhu = result.data.data.schesNanhu
        if (!nanhu) {
          nanhu = []
        }
        var hunnan = result.data.data.schesHunnan
        if (!hunnan) {
          hunnan = []
        }
        var nname=result.data.data.nickname
        if(!nname){
          util.showSuccess('fuck')
          nname=[]
        }
        var index = 1
        for (let i = 0; i < nanhu.length; i++) {
          data.push({ name: nname[i], place: "南湖", time: nanhu[i]})
          index++;
        }
        for (let i = 0; i < hunnan.length; i++) {
          data.push({ name: nname[(nanhu.length)+i], place: "浑南", time: hunnan[i] })
          index++;
        }
        that.setData({
          listData: data,
        })
      },
      fail(error) {
        util.showModel('查询失败', error);
      }
    })
  }
  */

})