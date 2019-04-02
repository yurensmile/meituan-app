import axios from 'axios'

const instance = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:3000,
  headers:{
    'content-type': 'application/x-www-form-urlencoded'
  }
})

export default instance
