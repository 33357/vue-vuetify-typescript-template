interface IValidateFunction {
  (value: string): boolean
}

type TTrigger = 'blur' | 'change'

interface IValidator {
  validator: (rule: any, value: string, callback: Function) => void
  trigger: TTrigger
}

interface IValidatorOption {
  message: string
  include?: IValidateFunction
  exclude?: IValidateFunction
  trigger?: TTrigger
}

export const isValidUsername: IValidateFunction = (str) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal: IValidateFunction = (path) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL: IValidateFunction = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export const lessThan = (length: number): IValidateFunction => (value) => value.length < length

export const required: IValidateFunction = (value) => value.length === 0

export const getValidators = (options: IValidatorOption[]) => {
  const validators: IValidator[] = []
  options.forEach(option => {
    validators.push({
      validator: (rule: any, value: string, callback: Function) => {
        if (option.include?.(value) || (option.exclude && !option.exclude(value))) {
          callback(new Error(option.message))
        } else {
          callback()
        }
      },
      trigger: option.trigger || 'blur'
    })
  })
  return validators
}

