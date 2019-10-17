import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'discovery',
  state: {
    tabs:[],
    discovery:{}
  },
  reducers: {
    handleChangeFindType(state,{payload}){
      let tabs=[];
      let discovery={}
      payload.forEach(el => {
        tabs.push({
          title:el.name,
          type:el.type
        })
        discovery['list'+el.type]=[];
      });

      return {
        ...state,
        tabs:tabs,
        discovery:discovery
      };
    },

    handleChangeDiscovery(state,{payload}){
      let data = state.discovery
      if(payload.payload.page===1){
        //刷新
        data['list'+payload.payload.type] = payload.response
      }else{
        //加载更多
        data['list'+payload.payload.type] = data['list'+payload.payload.type].concat(payload.response)
      }
      return {
        ...state,
        discovery:data
      };
    }
  },
  effects: {
    *getFindType({ payload }, { call, put }) {
      const response = yield call( API.findType, payload);
      yield put({
        type: 'handleChangeFindType',
        payload:response
      })
    },
    *getDiscoveryList({ payload}, { call, put }) {
      const response = yield call(API.finding,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }
      yield put({
        type: 'handleChangeDiscovery',
        payload:{response,payload}
      })
      
    }
  }

}
