class Reg { }

Reg.sourceIpRe = /IP Address:<span id="\b(.*?)">(.*?)<\/span>/g
Reg.ipRe = /\w+\.\w+\.\w+/
Reg.sourcePortRe = /Port:<span id="\b(.*?)">(.*?)\n/g
Reg.sourcePwdRe = /Password:<span id="\b(.*?)">(.*?)\n/g 
Reg.portPwdRe = /\d+/
Reg.sourceEncryRe = /Method:(.*?)<\/h4>/g
Reg.sourceQRRe = /a href="(.*?)"/g
Reg.QRCode = /\w{3}\w{2}\w{3,5}\Wpng/

class ParseUtil {

  static getSourceArray(sourceHtml) {
    var sourceArray = sourceHtml.split("hover-text")
    sourceArray.shift()
    return sourceArray
  }

	static getIp(source) {
		let sourceIp = ParseUtil.getSourceIpStr(source)
		return ParseUtil.getResult(sourceIp, Reg.ipRe)
	}

	static getPort(source) {
		let sourcePort = ParseUtil.getSourcePortStr(source)
		return ParseUtil.getResult(sourcePort, Reg.portPwdRe)	
	}

	static getPwd(source) {
		let sourcePort = ParseUtil.getSourcePwdStr(source)
		return ParseUtil.getResult(sourcePort, Reg.portPwdRe)	
	}

	static getEncryption(source) {
		let sourceEncry = ParseUtil.getSourceEncryption(source)
		let result = sourceEncry.substring(7, sourceEncry.length -5)
		return result
	}

	static getQRCode(source) {
		let sourceQR = ParseUtil.getSourceQRCode(source)
		let result = sourceQR.substring(8, sourceQR.length -1)
		return result
	}

	static getSourceIpStr(source) {
		return ParseUtil.getResult(source, Reg.sourceIpRe)	
	}

	static getSourcePortStr(source) {
		return ParseUtil.getResult(source, Reg.sourcePortRe)
	}

	static getSourcePwdStr(source) {
		return ParseUtil.getResult(source, Reg.sourcePwdRe)
	}

	static getSourceEncryption(source) {
		return ParseUtil.getResult(source, Reg.sourceEncryRe)	
	}

	static getSourceQRCode(source) {
		return ParseUtil.getResult(source, Reg.sourceQRRe)
	}

	static getResult(source, re) {
		var result = ''
		if (source) {
			var resultArray = source.match(re)
			if (resultArray && resultArray.length > 0) {
				result = resultArray[0]
			}
		}
		return result
	}
}

module.exports = ParseUtil