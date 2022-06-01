import layouts from '@/view/layouts'
import home from '@/view/pages/home'
import example from '@/view/layouts/example'
export default [
	{
		path: '',
		// redirect: '/home'
		redirect: '/example'
	},
	{
		path: '/example',
		name: 'example',
		component: example
	},
	{
		path: '/home',
		name: 'home',
		component: layouts,
		redirect: '/home/index',
		children: [
			// 首页
			{
				path: 'index',
				name: 'Index',
				component: home,
				meta: {
					title: '首页',
					icon: 'home',
					affix: true
				}
			}
		]
	}
]
