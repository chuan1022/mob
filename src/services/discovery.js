import proxyRequest from './request';
import { apiBase } from '@/utils/baseServer';

const baseUrl="/find"
export const findType=(params)=> {
  return proxyRequest.get(baseUrl+'/find/type', params)
};

export const finding=(params)=> {
  return proxyRequest.get(baseUrl+'/finding', params)
};

export const findDetail=(params)=> {
  return proxyRequest.get(baseUrl+'/find/detail', params)
};
