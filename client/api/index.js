import { httpClient } from './httpClient'

//endpoint
import homeApi from './home'
import authenticateApi from './authenticate'

export function apiFactory(http) {
  return {
    home: homeApi(http),
    authenticate: authenticateApi(http) 
  }
}
const http = httpClient('http://localhost:5000') //baseUrl
export const api = apiFactory(http)
