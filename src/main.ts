import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import '@/styles/tailwind.css'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

// plugins
import { vuetify, Loading, Message, Toast } from './plugins'
import i18n from '@/lang'
import '@/icons/components'
import '@/utils/error-log'
import '@/permission'
import * as directives from '@/directives'
import * as filters from '@/filters'
import SvgIcon from 'vue-svgicon'
import globalComponents from '@/components'

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.use(Message)
Vue.use(Toast)
Vue.use(Loading, {
  overlayColor: 'transparent',
  color: 'tertiary',
  width: 200,
  text: '拼命加载中'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

// Register global components
globalComponents.forEach((component: any) => {
  Vue.component(component.options.name, component)
})

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 给 v-on 自定义键位别名
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  'media-play-pause': 179,
  up: [38, 87]
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount('#root')
