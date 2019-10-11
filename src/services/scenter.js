
import proxyRequest from './request';

const baseUrl="/scenter"

let API = {

}

// 首页精选推荐列表
API.getAttentionList=(params)=> {
  return proxyRequest.get(baseUrl+'/foodie/search', params)
};


//列表页分类
API.getStoreClassList=(params)=> {
  return proxyRequest.get(baseUrl+'/store/class/list', params)
};

//美食商家列表
API.getStoreList=(params)=>{
  return proxyRequest.get(baseUrl+'/foodie/search', params)
}

//通用商家列表
API.getCommStoreList=(params)=>{
  return proxyRequest.get(baseUrl+'/stores/search', params)
}
export default API;