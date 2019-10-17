import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'list',
  state: {
    storeList:[]
  },
  reducers: {
    handleChangeStoreList(state,{payload}){
      return {
        ...state,
        storeList:payload,
      };
    }
  },
  effects: {
    *getStoreList({ payload ,callback}, { call, put }) {
      const response = yield call(API.getOtherStoreList,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }
      // if(callback && typeof (callback) ==='function'){
      //   callback(response)
      // }
 
      yield put({
        type: 'handleChangeStoreList',
        payload:response
      })
    }
  }

}
