
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


export default API;