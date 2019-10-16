import proxyRequest from './request';
import { apiBase } from '@/utils/baseServer';


let API = {

}
const baseUrl="/find";

//发现的tab
API.findType=(params)=> {
  return proxyRequest.get(baseUrl+'/find/type', params)
};

//发现的商家列表
API.finding=(params)=> {
  return proxyRequest.get(baseUrl+'/finding', params)
};

//发现的内容
API.findingDetail=(params)=> {
  return proxyRequest.get(baseUrl+'/finding/detail', params)
};

export default API