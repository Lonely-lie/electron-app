var ref = require("ref-napi");




module.exports = function methodToC(struct) {
	return {
		// 在线激活
		ASFActivation: ['long', ['string', 'string']],
		// // // 离线激活
		// ASFOfflineActivation: ['long', ['string']],
		// 初始化引擎
		ASFInitEngine: ['long', ['uint', 'int', 'int', 'int', 'int', ref.refType(ref.refType(ref.types.void))]],

		//检测人脸信息
		ASFDetectFaces: ['long', [ref.refType(ref.types.void), 'int', 'int', 'int', ref.refType(ref.types.uchar), ref.refType(struct.ASF_MultiFaceInfo), 'int']]
	}
}
