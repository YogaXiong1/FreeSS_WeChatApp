var ParseUtil = require('../utils/parseUtil.js')
var Base64Encode = require('../utils/base64.js')


class Ladder {
	constructor(ip, port, pwd, encry, QR) {
		this.ip = ip
		this.port = port
		this.pwd = pwd
		this.encryption = encry
		this.QRCode = QR
  }

    toURL() {
        //        服务器:端口:协议:加密方式:混淆方式:base64（密码）？obfsparam= Base64(混淆参数)&remarks=Base64(备注)
      let parts = this.encryption + ':' + this.pwd + '@'+ this.ip + ':' + this.port
      // let bstr = btoa(parts)
      let bstr = Base64Encode(parts)
      return 'ss://' + bstr
        // let parts = "\(encryption):\(password)@\(ip):\(port)".base64(urlSafe: false)
        // return URL(string: "ss://\(parts)")!
    }

    static getLaddersWithSourceHtml(sourceHtml) {
      var ladders = new Array()
      let sourceArray = ParseUtil.getSourceArray(sourceHtml)
      for (var s of sourceArray) {
        let ip = ParseUtil.getIp(s)
        let port = ParseUtil.getPort(s)
        let pwd = ParseUtil.getPwd(s)
        let encryption = ParseUtil.getEncryption(s)
        let QRCode = ParseUtil.getQRCode(s)

        let ladder = new Ladder(ip, port, pwd, encryption, QRCode)
        ladders.push(ladder)
      }
      return ladders
    }
}

module.exports = Ladder