import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'search',
  state: {
    hotSearchList:[],
    historySearchList:['asd']
  },
  reducers: {
    handleChangeSearchList(state,{payload}){
      return {
        ...state,
        hotSearchList:payload,
      };
    },
    getHistory(state,{payload}){
      store.set(state.historySearchList);
      return {
        ...state,
        historySearchList:data,
      };
    },
    addHistory(state,{payload}){
      let data = state.historySearchList
      data.unshift(payload);
      store.set('historySearchList',data)
      return {
        ...state,
        historySearchList:data,
      };
    },
    clearHistory(state,{payload}){
      const data=[]
      store.set('historySearchList',data)
      return {
        ...state,
        historySearchList:data,
      };
    }

  },
  effects: {
    *getHotSearch({ payload ,callback}, { call, put }) {
      const response = yield call(API.getHotSearch,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }
      // if(callback && typeof (callback) ==='function'){
      //   callback(response)
      // }
 
      yield put({
        type: 'handleChangeSearchList',
        payload:response
      })
      
    }
  }

}
