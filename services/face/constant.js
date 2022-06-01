const constant = {
    ASF_FACE_DETECT: 1,
    ASF_FACERECOGNITION: 4,
    ASF_AGE: 8,
    ASF_GENDER: 16,
    ASF_FACE3DANGLE: 32,
    ASF_LIVENESS: 128,
    ASF_IR_LIVENESS: 1024,
    ASF_CompareModel: 2,
    ASF_DETECT_MODEL_RGB: 1,
    // 成功code
    success: [90114, 0],
	format:513, // 支持的颜色空间颜色格式
    // 检测模式
    mode: {
        image: 0xFFFFFFFF, // 图片
        video: 0x00000000, // 视频
        // 检测角度  一般为0度
        detectFaceOrientPriority: 1,
        // 识别的最小人脸比例 image 推荐32
        detectFaceScaleVal: 32,
        // 最大检测人脸数
        detectFaceMaxNum:5,
        // 启用的功能组合
        fun:[
            0x00000001, // 人脸检测
            0x00000004, // 人脸特征
            0x00000008, // 年龄
            0x00000010, // 性别
            0x00000400, // IG活体
            0x00000080, // RGB活体
            0x00000020, // 3D角度
        ],
        fun2:0x00000001|0x00000004|0x00000400|0x00000080
    }

}
module.exports = constant
