
import request  from 'umi-request';
import { resolve } from 'upath';

// function proxyRequest(url, options, showError = true) {
//   options = options || {};
//   console.log(options)
//   // return new  Promise((resolve,reject)=>{
//   //   extend(url, options).then((res)=>{
//   //     resolve(res.data)
//   //   }).catch(err=>{
//   //     reject(err)
//   //   });
//   // return extend(url, options).then((response) => {
//   //   console.log(response)
//   //   if (response.errcode === 0) {
//   //     return response;
//   //   }
//   // }).catch((e,url) => {
//   //   const status = e.code;
//   //     if (status === 401) {
//   //       // @HACK
//   //       /* eslint-disable no-underscore-dangle */
//   //       window.g_app._store.dispatch({
//   //         type: 'login/logout',
//   //       });
//   //       return;
//   //     }
//   //     if (status === 403) {
//   //       router.push('/login');
//   //       return;
//   //     }
//   //     if (status <= 504 && status >= 500) {
//   //       // router.push('/login');
//   //       return;
//   //     }
//   //     if (status >= 404 && status < 422) {
//   //       router.push('/404');
//   //       return;
//   //     }
//   // });
// }
let proxyRequest={};
proxyRequest.get = (url, params, options, showError) => {
  // options = options || {};
  // options.body = data || {};
  // options.method = 'GET';
  // return proxyRequest(url, options, showError);
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

proxyRequest.post = (url, params, options, showError) => {
  // options = options || {};
  // options.body = data || {};
  // options.method = 'POST';
  // return proxyRequest(url, options, showError);
  return request.post(url, {
    params:params
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
};
export default proxyRequest;
