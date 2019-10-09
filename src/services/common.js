import proxyRequest from './request';

const baseUrl="/cmm"

let API = {

}

// 获取省市区ID
API.getCityId=(params)=> {
  return proxyRequest.get(baseUrl+'/geocoder/translate', params)
};

export default API;

