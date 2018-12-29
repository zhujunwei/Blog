import axios from 'axios';
//测试环境
//axios.defaults.baseURL = "http://zc.miyaketang.com:8082";
//生产环境
axios.defaults.baseURL = "https://zktapi.cqmapp.com";
const appId = "2zuz25wpw2rlz4grtuwl4swm5kvfyzfz"

//请求头设置
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容  
	config.data = { ...config.data, ...{ appId } }
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.token = token;
	}
	return config;
}, function (err) {
	return Promise.reject(err);
});

//拦截请求
axios.interceptors.request.use(function (config) {
	return config
});

//拦截请求回应, 在这里做统一的状态处理
axios.interceptors.response.use(function (result) {
	if (result.data.code === 200) {
		return result.data.data;
	}
	return Promise.reject(result.data)
	
}, (err) => {
	return Promise.reject(err)
})