import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'food',
  state: {
    navData:[],
    tabs:[],
    storeList:[],
    class_id:0,
    isLoading:true
  },
  reducers: {
    handleChangeTabList(state,{payload}){
      let array=[];
      payload.forEach(el => {
        array.push({
          title:el.name,
          id:el.id
        })
      });
      return {
        ...state,
        tabs:array,
      };
    },
    handleChangeNavList(state,{payload}){
      return {
        ...state,
        navData:payload,
      };
    },
    handleChangeStoreList(state,{payload}){
      return {
        ...state,
        storeList:payload,
        isLoading:false
      };
    }
  },

  effects: {
    *getStoreClassList({ payload ,callback}, { call, put }) {
      const response = yield call(API.getStoreClassList,payload);
      yield put({
        type: 'handleChangeTabList',
        payload:response.recommend
      }) 
      yield put({
        type: 'handleChangeNavList',
        payload:response.list
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
    *getStoreList({ payload ,callback}, { call, put }) {
      const response = yield call(API.getStoreList,payload);
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
