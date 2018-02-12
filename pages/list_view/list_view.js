// pages/list_view/list_view.js
var Ladder = require('../../utils/model.js')
var Config = require('../../utils/config.js')

Page({

  data: {
  },

  onLoad: function (options) {
    wx.startPullDownRefresh({
      complete: function (res) {
        wx.stopPullDownRefresh()
      },
    })
  },

  onPullDownRefresh: function () {
    loadData(
      (res) => {
        this.setData({
          ladders: res
        })
      },
      (res) => {
        console.log(res)
      }
    )
  },

  onShareAppMessage: function () {
  
  },

  toQRCode: function (item) {
    let ladder = this.data.ladders[item.currentTarget.id]
    let img = Config.URL + ladder.QRCode
    let ssURL = ladder.toURL()
    wx.navigateTo({
      url: '../../pages/qrcode/qrcode?img=' + img + '&' + 'ssURL=' + ssURL,
    })

  }
})

function loadData(success, fail) {
  wx.request({
    url: Config.URL,
    success: function (res) {
      let ladders = Ladder.getLaddersWithSourceHtml(res.data)
      success(ladders)
    },
    fail: function (res) {
      fail(res)
    }
  })
}