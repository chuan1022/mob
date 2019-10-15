
import proxyRequest from './request';

const baseUrl="/scenter"

let API = {

}

//列表页分类
API.getStoreClassList=(params)=> {
  return proxyRequest.get(baseUrl+'/store/class/list', params)
};

//获取美食商家列表
API.getStoreList=(params)=>{
  return proxyRequest.get(baseUrl+'/foodie/search', params)
}

//获取通用商家列表
API.getCommStoreList=(params)=>{
  return proxyRequest.get(baseUrl+'/stores/search', params)
}

//获取行业类型
API.getStoreType=(params)=>{
  return proxyRequest.get(baseUrl+'/store/type', params)
}

//获取首页顶部banner

//获取首页小banner

export default API;