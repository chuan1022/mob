
import request  from 'umi-request';
import { resolve } from 'upath';

let proxyRequest={};
proxyRequest.get = (url, params, options, showError) => {
  return request.get(url, {
    params:params
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
};

proxyRequest.post = (url, data, options, showError) => {
  return request.post(url, {
    params:params
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
};
export default proxyRequest;
