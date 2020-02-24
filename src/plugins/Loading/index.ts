import Vue, { VueConstructor } from 'vue'
import defaultConfig from './config'
import loadingOpt from './Progress.vue'
import { LoadingOptions } from './types'
import { vuetify } from '@/plugins'

const LoadingConstructor = Vue.extend(loadingOpt)
const isServer = typeof window === 'undefined'
const Loading = function(options = {}) {
  if (isServer) return

  let loading: any = new LoadingConstructor({
    vuetify,
    el: document.createElement('div'),
    propsData: {
      ...defaultConfig,
      ...options
    }
  })
  document.body.appendChild(loading.$el)
  loading.show = true
  return {
    instance: loading,
    close() {
      if (!loading) return
      loading.show = false
      if (this.instance) {
        this.instance = null
      }
      setTimeout(() => {
        loading.$el.parentNode?.removeChild(loading.$el)
        loading.$destroy()
        loading = null
      }, 500)
    }
  }
}

Loading.config = function(options: LoadingOptions) {
  if (!options || Array.isArray(options) || typeof options !== 'object') return defaultConfig
  for (const key in options) {
    // eslint-disable-next-line no-prototype-builtins
    if (!options.hasOwnProperty(key)) continue
    defaultConfig[key] = options[key]
  }
  return defaultConfig
}

Loading.install = function(Vue: VueConstructor, options: LoadingOptions) {
  Loading.config(options)
  Vue.prototype.$loading = Loading
}

export default Loading
