import _assignInWith from 'lodash/assignInWith'
import _partialRight from 'lodash/partialRight'
import _isUndefined from 'lodash/isUndefined'
import _unset from 'lodash/unset'
// Parse the time to string
export const parseTime = (
  time?: object | string | number,
  cFormat?: string
): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      return '0' + value
    }
    return String(value) || '0'
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) => filterKeys.map((key: string) => {
    if (key === 'timestamp') {
      return parseTime(data[key])
    } else {
      return data[key]
    }
  }))

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

interface IDownloadOptions {
  api: string
  query: { [index: string]: any }
}

export const downloadFile = ({ api, query = {}}: IDownloadOptions) => {
  if (!api) {
    return
  }
  const params = Object.keys(query).reduce((prev, cur, index) => {
    let current = `${cur}=${query[cur]}`
    if (index === 0) {
      current = `/?` + current
      return current
    }
    return prev + '&' + current
  }, '')
  const url = process.env.VUE_APP_BASE_API + api + params
  window.open(url)
}

const EXCLUDE_VALUE = 'EXCLUDE_VALUE'

const findExcludeKeys = (target: object) => Object.entries(target).filter(([key, value]) => value === EXCLUDE_VALUE).map(([key, value]) => key)

export const getPropertiesOf = (targetValue: string, sourcesValue: string) => {
  return _isUndefined(targetValue) ? EXCLUDE_VALUE : sourcesValue
}

// 目标对象的所有key保留不变,value替换为sources对象的同名key的value
export const assignInWithTarget = (target: object, ...sources: object[]): void => {
  (_partialRight(_assignInWith, getPropertiesOf) as any)(target, ...sources)
  findExcludeKeys(target).forEach(excludeKey => {
    _unset(target, excludeKey)
  })
}

