import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import { MainLayout, PageLayout } from '@/layouts/'

/* Router modules */
// import nestedRouter from './modules/nested'

/*
* Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
* https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
* */

const routerMethods = ['push', 'replace']

routerMethods.forEach((method: string) => {
  const originalCall = (Router.prototype as any)[method];
  (Router.prototype as any)[method] = function(location: any, onResolve: any, onReject: any): Promise<any> {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject)
    }
    return (originalCall.call(this, location) as any).catch((err: any) => err)
  }
})

Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
                                 注意: 必须设置为组件的name,否则不会被缓存
                                 如果不设置name属性,则不会显示在tags上
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    showBack: false              if true, the navBar will show the back button
    backToRoute: '/home'         back button click
    noRedirect: false            设置为false时点击外层菜单自动定向到子菜单第一项,默认为false
    hideTag: false               设置为false时会显示在tag栏上,默认为false
  }
*/
interface Imeta {
  roles?: string[]
  title?: string
  showHeader?: boolean
  icon?: string
  hidden?: boolean
  alwaysShow?: boolean
  breadcrumb?: boolean
  noCache?: boolean
  affix?: boolean
  activeMenu?: string
  showBack?: boolean
  backToRoute?: string
  noRedirect?: boolean
  hideTag?: boolean
}

export interface IRouteConfig extends RouteConfig {
  meta?: Imeta
}

/**
 ConstantRoutes
 a base page that does not have permission requirements
 all roles can be accessed
 */
export const constantRoutes: IRouteConfig[] = [
  {
    path: '',
    redirect: '/home',
    meta: { hidden: true }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: MainLayout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect-page" */ '@/views/redirect/index.vue'),
        meta: { hidden: true }
      }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: PageLayout,
    redirect: '/account/login',
    meta: { hidden: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login-page" */ '@/views/login/index.vue'),
        meta: {
          title: 'login',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/account/*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: IRouteConfig[] = [
  {
    path: '/home',
    name: 'Home',
    component: MainLayout,
    redirect: '/home/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard-page" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          roles: ['admin']
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // nestedRouter,
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
