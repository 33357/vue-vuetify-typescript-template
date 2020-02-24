import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setLanguage } from '@/utils/cookies'
import { getLocale } from '@/lang'
import store from '@/store'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  language: string
  size: string
  isAppLoading: boolean
  image: string
  color: string
  drawer: boolean
  documentClientHeight: number
  documentClientWidth: number
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public language = getLocale()
  public size = 'medium'
  public isAppLoading = false
  public drawer = true
  public image = 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
  public color = 'primary'
  public documentClientHeight = 800
  public documentClientWidth = 1000

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
    setLanguage(this.language)
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
  }

  @Mutation
  private SET_COLOR(color: string) {
    this.color = color
  }

  @Mutation
  private SET_IMAGE(image: string) {
    this.image = image
  }

  @Mutation
  private SET_DRAWER(isDrawer: boolean) {
    this.drawer = isDrawer
  }

  @Mutation
  private SET_APP_LOADING(isLoading: boolean) {
    this.isAppLoading = isLoading
  }

  @Mutation
  private SET_CLIENT_WIDTH(width: number) {
    this.documentClientWidth = width
  }

  @Mutation
  private SET_CLIENT_HEIGHT(height: number) {
    this.documentClientHeight = height
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public setLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public setSize(size: string) {
    this.SET_SIZE(size)
  }

  @Action
  public setColor(color: string) {
    this.SET_COLOR(color)
  }

  @Action
  public setImage(image: string) {
    this.SET_IMAGE(image)
  }

  @Action
  public setDrawer(isDrawer: boolean) {
    this.SET_DRAWER(isDrawer)
  }

  @Action
  public setAppLoading(isLoading: boolean): void {
    this.SET_APP_LOADING(isLoading)
  }

  @Action
  public SetClientWidth(width: number) {
    this.SET_CLIENT_WIDTH(width)
  }

  @Action
  public SetClientHeight(height: number) {
    this.SET_CLIENT_HEIGHT(height)
  }
}

export const AppModule = getModule(App)
