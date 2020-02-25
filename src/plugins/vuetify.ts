import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import { SettingsModule } from '@/store/modules/settings'
import Vuetify from 'vuetify/lib'
import zh from 'vuetify/src/locale/zh-Hans'
import en from 'vuetify/src/locale/en'

interface Itheme {
  [index: string]: string
}

export const theme: Itheme = {
  primary: '#fb8c00',
  secondary: '#4caf50',
  tertiary: '#495057',
  accent: '#82B1FF',
  error: '#f55a4e',
  info: '#00d3ee',
  success: '#5cb860',
  warning: '#ffa21a'
}

const primary = theme[SettingsModule.theme]

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        ...theme,
        primary
      }
    }
  },
  lang: {
    locales: { zh, en },
    current: 'zh'
  },
  icons: {
    iconfont: 'md'
  }
})
