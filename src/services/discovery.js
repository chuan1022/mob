import proxyRequest from './request';
import { apiBase } from '@/utils/baseServer';


let API = {

}
const baseUrl="/find";

API.findType=(params)=> {
  return proxyRequest.get(baseUrl+'/find/type', params)
};

API.finding=(params)=> {
  return proxyRequest.get(baseUrl+'/finding', params)
};

API.findDetail=(params)=> {
  return proxyRequest.get(baseUrl+'/find/detail', params)
};
export default API