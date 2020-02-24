import sha256 from 'crypto-js/sha256'
import aes from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
import SecureStorage from 'secure-web-storage'

const SECRET_KEY = 'beetledata'

const secureStorage = (storage: Storage) => new SecureStorage(storage, {
  hash: function hash(key: any) {
    key = sha256(key, SECRET_KEY)

    return key.toString()
  },
  encrypt: function encrypt(data: any) {
    data = aes.encrypt(data, SECRET_KEY)

    data = data.toString()

    return data
  },
  decrypt: function decrypt(data: any) {
    data = aes.decrypt(data, SECRET_KEY)

    data = data.toString(enc)

    return data
  }
})

export const secureLocalStorage = secureStorage(window.localStorage)
export const secureSessionStorage = secureStorage(window.sessionStorage)
