import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'searchList',
  state: {
    typeList:[],
    regionList:[],
    storeList:[],
    storeListLoading:true
  },
  reducers: {
    handleChangeTypeList(state,{payload}){
      return {
        ...state,
        typeList:payload,
      };
    },
    handleChangeRegionList(state,{payload}){
      return {
        ...state,
        regionList:payload,
      };
    },
    handleChangeStoreList(state,{payload}){
      return {
        ...state,
        storeList:payload,
        storeListLoading:false
      };
    }
  },

  effects: {
    *getStoreType({ payload ,callback}, { call, put }) {
      const response = yield call(API.getStoreType,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }

      // if(callback && typeof (callback) ==='function'){
      //   callback(response)
      // }
 
      yield put({
        type: 'handleChangeTypeList',
        payload:response
      }) 
    },

    *getRegionList({ payload ,callback}, { call, put }) {
      const response = yield call(API.getRegionList,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }
      // if(callback && typeof (callback) ==='function'){
      //   callback(response)
      // }
 
      yield put({
        type: 'handleChangeRegionList',
        payload:response
      }) 
    },
    *getCommStoreList({ payload ,callback}, { call, put }) {
      const response = yield call(API.getCommStoreList,payload);
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
    },
  }

}
