import { Component, Vue } from 'vue-property-decorator'
import { DeviceType } from '@/store/modules/app'
import { State, Action } from 'vuex-class'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class ResizeMixin extends Vue {
  @State(state => state.app.device) readonly device!: number

  @Action('app/ToggleDevice') ToggleDevice!: (device: DeviceType) => void

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.ToggleDevice(DeviceType.Mobile)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      this.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
    }
  }
}
