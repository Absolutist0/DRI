// var qcloud = require('../../vendor/wafer2-client-sdk/index')
// var config = require('../../config')
// var util = require('../../utils/util.js')
// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//       userInfo:{},
//       listShow: [
//         { title: "1", content: "123", show: false }       
//       ],
//   },
//   creategroup: function () {
//     var newarray = [{
//       title: "name",
//       content: "123",
//       show: false
//     }];
//     this.setData({
//       'listShow': this.data.listShow.concat(newarray)
//     });
//   },
//   showContent: function (e) {
//     var index = parseInt(e.currentTarget.dataset.index);
//     var key = "listShow[" + index + "].show";
//     var val = this.data.listShow[index].show;
//     console.log(val);
//     this.setData({
//       [key]: !val
//     })

//   },
//   remove: function (e) {

//     var dataset = e.target.dataset;
//     var Index = dataset.index; 

//     this.data.listShow.splice(Index, 1);

//     this.setData({
//       listShow: this.data.listShow
//     });
//   },
//   edit: function (e) {
//     var dataset = e.target.dataset;
//     var Index = dataset.index; 
//     this.data.list[Index].title = 'newname';
//     this.setData({
//       listShow: this.data.listShow
//     });
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function() {
//     var that = this;
//     wx.getUserInfo({
//       success: function (res) {
//         that.setData({
//           userInfo: res.userInfo,
//         })
//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    friends: [{
      id: 1,
      name: "张三三",
      group: 1
    }, {
      id: 2,
      name: "李四四",
      group: 1
    }, {
      id: 3,
      name: "王五五",
      group: 2
    }, {
      id: 4,
      name: "赵六六",
      group: 3
    }, {
      id: 5,
      name: "孙七七",
      group: 3
    }, {
      id: 6,
      name: "钱八八",
      group: 3
    }
    ],
    groups: [{
      id: 1,
      name: "我的好友",
      hidden: true,
      count: 2
    }, {
      id: 2,
      name: "我的朋友",
      hidden: true,
      count: 1
    }, {
      id: 3,
      name: "我的好友的好友",
      hidden: true,
      count: 3
    }],
    expanded: false,
  },
  groupclick: function (e) {
    var id = e.currentTarget.id, groups = this.data.groups;
    for (var i = 0, len = groups.length; i < len; ++i) {
      if (groups[i].id == id) {
        groups[i].hidden = !groups[i].hidden;
      }
    }
    this.setData({
      groups: groups
    });

  },
  /*submit: function () {
     util.showBusy('上传中...')
     var that = this
     qcloud.request({
       url: `${config.service.host}/weapp/friendremark`,
       data: {
         remark: friends,
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
   },*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('上传中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/friendremark`,
      data: {
        remark: that.data.friends
      },
      login: false,
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
