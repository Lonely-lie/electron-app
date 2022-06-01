// 首先引入Mock
const Mock = require('mockjs')

Mock.mock('/oauth/token', {
	//输出数据
	name: 'hello request' //随机生成姓名
	//还可以自定义其他数据
})
