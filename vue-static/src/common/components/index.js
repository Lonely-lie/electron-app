import vue from 'vue'
import GxxDialog from './gxx_dialog'
import FaceRecognition from './face_recognition'

import prompt from './prompt'
let components = [FaceRecognition]
components.forEach((component) => {
	vue.component(component.name, component)
})
vue.prototype.$dialog = GxxDialog
vue.prototype.$basePrompt = prompt
