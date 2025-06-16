import axios from 'axios';

const service = axios.create({
  baseURL: 'http://127.0.0.1:4523/m1/6263153-5957223-default',  // 从环境变量中读取
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

export default service;

// 请求拦截器
service.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      // 可以在此统一处理状态码或业务异常
      const res = response.data;
      if (res.code !== 200) {
        // 抛出业务异常
        return Promise.reject(new Error(res.message || 'Error'));
      } else {
        return res;
      }
    },
    (error) => {
      // 网络错误、超时等处理
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );