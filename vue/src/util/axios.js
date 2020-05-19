import axios from 'axios'
import store from '../store/store';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求头添加 token
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = store.state.token
    return config
}, function (error) {
    return Promise.reject(error)
})

export default axios