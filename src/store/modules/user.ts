import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import to from 'await-to-js'
import avatarHolder from '@/assets/common/avatar-holder.jpg'

export interface IUserState {
  token: string
  name: string
  avatar: any
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = avatarHolder
  public introduction = ''
  public roles: string[] = []
  public email = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: any) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action({ rawError: true })
  public userLogin(userInfo: { username: string, password: string}): Promise<any> {
    return new Promise(async(resolve, reject) => {
      const { username, password } = userInfo
      const [err, data] = await to(login({ account: username, password }))
      if (err) {
        reject(err)
        return
      }
      if (!data) {
        reject('Has No Response')
        return
      }
      if (data?.success !== 1) {
        resolve(data)
        return
      }
      const token = getToken()
      if (!token) {
        reject('token 不存在')
        return
      }
      this.SET_TOKEN(token)
      resolve(data)
    })
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action({ rawError: true })
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const roles = ['admin']
    // const [err, userData] = await to(getUserInfo({ /* Your params here */ }))
    // if (err) {
    //   throw Error(err)
    // }
    // if (!userData) {
    //   throw Error('Verification failed, please Login again.')
    // }
    // const { roles, name, avatar, introduction, email } = userData
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    // this.SET_NAME(name)
    // this.SET_AVATAR(avatar)
    // this.SET_INTRODUCTION(introduction)
    // this.SET_EMAIL(email)
  }

  @Action({ rawError: true })
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action({ rawError: true })
  public userLogout(): Promise<any> {
    return new Promise(async(resolve, reject) => {
      if (this.token === '') {
        reject('LogOut: token is undefined!')
        return
      }
      const [err, data] = await to(logout())
      if (err) {
        reject(err)
        return
      }
      if (!data) {
        reject('Has No Response')
        return
      }
      removeToken()
      resetRouter()

      // Reset visited views and cached views
      TagsViewModule.delAllViews()
      this.SET_TOKEN('')
      this.SET_ROLES([])
      resolve(data)
    })
  }
}

export const UserModule = getModule(User)
