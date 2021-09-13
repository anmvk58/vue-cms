import {http} from '@/plugins/axios/axios'

const login = (body) => {
  return http.post('/login', body)
}


export default {
  login
}
