import Vue from 'vue'
import { ErrorLogModule } from '@/store/modules/error-log'
import { isArray } from '@/utils/validate'
import settings from '@/settings'
import { handleError } from '@/utils/handleErrors'

const { errorLog: needErrorLog } = settings

const checkNeed = () => {
  const env = process.env.NODE_ENV
  if (isArray(needErrorLog) && env) {
    return needErrorLog.includes(env)
  }
  return false
}
/**
 * vue全局错误处理函数注册,可以捕获组件内的错误,但是不能捕获在声明周期钩子函数内的异步函数的错误
 */
if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
    ErrorLogModule.AddErrorLog({
      err,
      vm,
      info,
      url: window.location.href
    })
    handleError(err)
  }
}
