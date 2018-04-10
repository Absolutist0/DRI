//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({

    userInfo: {},
    logged: false,

    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

    list_HunNan:[
      {
      title: "kobe",
      phone: 12580,
      stroke: [{
        time: "",
        passenger: "2"
      }, {
        time: "",
        passenger: "1"
      }],
      show: false
    }, {
      title: "love",
      phone: 12580,
      stroke: [{
        time: "",
        passenger: "2"
      }, {
        time: "",
        passenger: "1"
      }],
      show: false
    }
    
    ],

    list_NanHu:[
    //   {
    //   title: "Carry",
    //   phone: 12580,
    //   stroke: [{
    //     time: "",
    //     passenger: "3"
    //   }, {
    //     time: "",
    //     passenger: "2"
    //   }],
    //   show: false
    // }
    ]
})