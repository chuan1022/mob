import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'discoveryDetail',
  state: {
    detail:{},
    isLoading:true
  },
  reducers: {
    handleChangeDetail(state,{payload}){
      console.log(payload)
      return {
        ...state,
        detail:payload
      };
    }
  },
  effects: {
    *getFindingDetail({ payload }, { call, put }) {
      const response = yield call( API.findingDetail, payload);
      yield put({
        type: 'handleChangeDetail',
        payload:response
      })
    },

    *getArticlLikes({ payload }, { call, put }) {
      const response = yield call( API.getArticlLikes, payload);
      yield put({
        type: 'handleChangeDetail',
        payload:response
      })
    },
    
    *getArticleComments({ payload }, { call, put }) {
      const response = yield call( API.getArticleComments, payload);
      yield put({
        type: 'handleChangeDetail',
        payload:response
      })
    }
    
  }
}
