import Vue, { VueConstructor, PluginObject } from 'vue'
import defaultConfig from './config'
import { ToastOptions } from '@/plugins/Toast/types'
import ToastOpt from './Snackbar.vue'
import { vuetify } from '@/plugins'

const isServer = typeof window === 'undefined'
let message: any

const Message = Vue.extend(ToastOpt)

function openMessage(options: any) {
  if (isServer) return
  if (!message) {
    message = new Message({
      vuetify,
      el: document.createElement('div')
    })
    document.querySelector('.v-application--wrap')?.appendChild(message.$el)
  }
  return message.message(options)
}

function closeMessage(id: string) {
  if (!message) return
  message.close(id)
}

const Toast: PluginObject<any> = {
  config(options: ToastOptions) {
    if (!options || Array.isArray(options) || typeof options !== 'object') return defaultConfig
    for (const key in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (!options.hasOwnProperty(key)) continue
      defaultConfig[key] = options[key]
    }
    return defaultConfig
  },
  message(options: ToastOptions | string) {
    if (!options) return
    options = typeof options === 'string' ? { message: options } : options
    const opt = {
      time: defaultConfig.time,
      position: defaultConfig.position,
      close: defaultConfig.close,
      closeIcon: defaultConfig.closeIcon,
      closeText: defaultConfig.closeText,
      mode: defaultConfig.mode,
      ...options
    }
    const id = openMessage(opt)
    if (opt.time > 0) {
      setTimeout(() => closeMessage(id), opt.time as number)
    }

    return id
  },
  install(Vue: VueConstructor, options: ToastOptions) {
    Toast.config(options)
    Vue.prototype.$toast = Toast
  }
};

[
  'success',
  'error',
  'info',
  'warning'
].forEach((type) => {
  Toast[type] = function(options: any) {
    if (!options) return
    options = typeof options === 'string'
      ? {
        message: options,
        color: type,
        icon: defaultConfig[type + 'Icon']
      } : {
        ...options,
        color: type,
        icon: defaultConfig[type + 'Icon']
      }
    return Toast.message(options)
  }
})

Toast.close = (id: string) => closeMessage(id)

export default Toast
