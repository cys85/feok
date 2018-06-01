import storage from 'store2'
import _Cookies from 'js-cookie'

export const Cookies = _Cookies

/**
 * 补丁方案： 解决微信端在部分机型下 localstorage 无法长期存储的bug
 *
 * @param {any} key
 * @param {any} value
 */
export function setStorage (key, value) {
  Cookies.set(key, value, { expires: 365 })
  storage.set(key, value)
}

/**
 *  * 补丁方案： 解决微信端在部分机型下 localstorage 无法长期存储的bug
 *
 * @param {any} key
 * @returns
 */
export function getStorage (key) {
  if (storage.get(key)) {
    return storage.get(key)
  }
  if (Cookies.get(key)) {
    try {
      return JSON.parse(Cookies.get(key))
    } catch (error) {
      return Cookies.get(key)
    }
  }
  return ''
}

/**
 *  * 补丁方案： 解决微信端在部分机型下 localstorage 无法长期存储的bug
 *
 * @param {any} key
 */
export function rempveStorage (key) {
  storage.remove(key)
  Cookies.remove(key)
}
export default storage
