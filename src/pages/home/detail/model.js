import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'detail',
  state: {
   
  },
  reducers: {
    // handleChangeAddress(state,{payload}){
    //   return {
    //     ...state,
    //     address:payload,
    //   };
    // }
  },
  effects: {
  //   *getLocationInfo({ payload, callback }, { call, put }) {
  //     const response = yield call(API.getCityId,payload);
  //     // if(!checkErrCode(response)){
  //     //   Toast.msg(response.errmsg);
  //     //   return false;
  //     // }
  //     // if(callback && typeof (callback) ==='function'){
  //     //   callback(response)
  //     // }
 
  //     yield put({
  //       type: 'handleChangeLocationInfo',
  //       payload:response
  //     })
  //   }
  }

}
