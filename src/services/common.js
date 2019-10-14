import proxyRequest from './request';

const baseUrl="/cmm"

let API = {

}

// 获取省市区ID
API.getCityId=(params)=> {
  return proxyRequest.get(baseUrl+'/geocoder/translate', params)
};
// 获取区域列表
API.getRegionList=(params)=> {
  return proxyRequest.get(baseUrl+'/area/region', params)
};
// 获取热门搜索
API.getHotSearch=(params)=> {
  return proxyRequest.get(baseUrl+'/search/hot', params)
};

export default API;

