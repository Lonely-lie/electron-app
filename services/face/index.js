const path = require("path")
const ffi = require("ffi-napi");
const { ipcMain, dialog } = require('electron')
var ref = require("ref-napi");
var StructType = require('ref-struct-di')(ref)
var ArrayType = require('ref-array-di')(ref)

function Face(resourcePath, log, config) {
	let struct = {}
	const constant = require('./constant')
	structInit()
	const methodToC = require('./methods.js')(struct)
	let faceMethods = null
	let handle = null
	process.env.PATH += `${path.delimiter}${path.join(resourcePath, 'dll/ArcFace')}`
	let dllUrl = path.join(resourcePath, 'dll/ArcFace/libarcsoft_face_engine.dll')
	// 初始化方法
	if (faceMethods == null) faceMethods = new ffi.Library(dllUrl, methodToC)
	// 私有-初始化结构体
	function structInit() {
		struct.MRECT = StructType({
			left: ref.types.int,
			top: ref.types.int,
			right: ref.types.int,
			bottom: ref.types.int
		})
		struct.ASF_MultiFaceInfo = StructType({
			faceRect: ArrayType(struct.MRECT),
			faceOrient: ArrayType(ref.types.int),
			faceNum: ref.types.int,
			faceID: ArrayType(ref.types.int)
		})
	}
	function getImgBuf(imageData) {
		let l = imageData.length / 4;
		let array = []
		for (let i = 0; i < l; i++) {
			let r = imageData[i * 4 + 0];
			let g = imageData[i * 4 + 1];
			let b = imageData[i * 4 + 2];
			array.push(b)
			array.push(g)
			array.push(r)
		}
		return new Buffer.from(array)
	}
	// 激活
	function activationFace() {
		let ret = null
		if (config.face.faceDllModal === 'inline') {
			ret = faceMethods.ASFActivation(config.face.AppId, config.face.SDKKey)
			log.info('在线激活人脸------------', ret);
		} else {
			let filePath = config.license;
			ret = faceMethods.ASFOfflineActivation(filePath)
			log.info('离线激活激活人脸---------', ret);
		}
		if (!constant.success.includes(ret)) {
			dialog.showMessageBox({ type: 'warning', message: '人脸激活失败！' })
			log.error('人脸激活失败------------------', ret);
			return { flag: false, code: ret }
		}
		return { flag: true, code: ret }
	}
	// 初始化引擎
	function initEngine() {
		if (handle) return 0
		let VOID = ref.alloc(ref.refType(ref.types.int))
		let mode = constant.mode
		let result = faceMethods.ASFInitEngine(mode.image, mode.detectFaceOrientPriority, mode.detectFaceScaleVal, mode.detectFaceMaxNum, mode.fun2, VOID)
		log.info('初始化引擎结果-----------------', result);
		handle = VOID.deref()
		log.info(handle, '-------引擎初始化句柄')
		if (!constant.success.includes(result)) {
			dialog.showMessageBox({ type: 'warning', message: '人脸初始化引擎失败！' })
			return { flag: false, code: result }
		}
		return { flag: true, code: result }
	}
	// 暴露方法
	this.init = function () {
		if ((this.activeResult = activationFace()).flag) {
			this.initResult = initEngine()
		}
		listen()
	}

	// 建立监听
	function listen() {
		// 激活
		ipcMain.on('face_active', (event) => {
			event.returnValue = activationFace()
		})
		// 初始化引擎
		ipcMain.on('face_initEngine', (event) => {
			event.returnValue = initEngine()
		})
		ipcMain.on('face_checkFace', (event, imageData, width, height) => {
			let detectedFaces = new struct.ASF_MultiFaceInfo({
				faceRect: [{
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				}],
				faceOrient: [0],
			})
            imageData = Object.values(JSON.parse(imageData))
			let ASFDetectFacesResult = faceMethods.ASFDetectFaces(handle, width, height, constant.format, getImgBuf(imageData), detectedFaces.ref(), constant.ASF_DETECT_MODEL_RGB)
			log.info('人脸识别状态码-------------',ASFDetectFacesResult);
			log.info('人脸识别个数-------------',detectedFaces.faceNum);
			if (ASFDetectFacesResult==0 && detectedFaces.faceNum>0) {
				let item = detectedFaces.faceRect[0]
				event.returnValue = {
					faceNum:detectedFaces.faceNum,
					faceOne:{
						x:item.left,
						y:item.top,
						width:item.right - item.left,
						height:item.bottom - item.top,
					}
				}
			}
			event.returnValue = null
		})
	}
}

module.exports = Face;

