
import proxyRequest from './request';

const baseUrl="/scenter"

let API = {

}

// 首页精选推荐列表
API.getAttentionList=(params)=> {
  return proxyRequest.get(baseUrl+'/foodie/search', params)
};

export default API;