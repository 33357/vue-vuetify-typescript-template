import Vue, { VueConstructor } from 'vue'
import defaultConfig from './config'
import ModalOpt from './Modal.vue'
import { MessageOptions } from './types'
import { vuetify } from '@/plugins'

const Modal = Vue.extend(ModalOpt)

const isServer = typeof window === 'undefined'
const instances: any[] = []
const Message: any = function(options: MessageOptions) {
  if (isServer) return
  return new Promise((resolve) => {
    let modal: any = new Modal({
      vuetify,
      el: document.createElement('div'),
      propsData: {
        ...defaultConfig,
        icon: defaultConfig[options.type + 'Icon'] || '',
        ...options
      }
    })
    document.querySelector('.v-application--wrap')?.appendChild(modal.$el)
    modal.open = true

    instances.push(modal)
    modal.$on('close', function(result: boolean, value: any) {
      setTimeout(() => {
        modal.$el?.parentNode?.removeChild(modal.$el)
        modal.$destroy()
        modal = null
      }, 500)

      const index = instances.indexOf(modal)
      if (index !== -1) {
        instances.splice(index, 1)
      }
      return resolve({ result, value })
    })
  })
}

Message.config = function(options: MessageOptions) {
  if (!options || Array.isArray(options) || typeof options !== 'object') return defaultConfig
  for (const key in options) {
    // eslint-disable-next-line no-prototype-builtins
    if (!options.hasOwnProperty(key)) continue
    defaultConfig[key] = options[key]
  }
  return defaultConfig
}

Message.close = function() {
  instances.forEach((modal) => {
    modal.close(false)
  })
};

['alert', 'confirm', 'prompt'].forEach((mode) => {
  Message[mode] = function(content: any, options: any) {
    if (!content && arguments.length < 2) return
    let title = ''
    switch (arguments.length) {
      case 1:
        options = {}
        break
      case 2:
        if (typeof options === 'string') {
          title = options
          options = {}
        }
        break
      default:
        title = arguments[1]
        options = arguments[2]
        break
    }
    return Message({
      title,
      content,
      ...options as object,
      mode: mode
    })
  }
})

Message.install = function(Vue: VueConstructor, options: MessageOptions) {
  Message.config(options)
  Vue.prototype.$message = Message
  Vue.prototype.$alert = Message.alert
  Vue.prototype.$confirm = Message.confirm
  Vue.prototype.$prompt = Message.prompt
}

export default Message
