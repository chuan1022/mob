import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';

const ERR_CODE =0;
export default  {
  namespace: 'global',
  state: {
    address:"郑州市",
    isLogiin:false,
    coordinate:{
      lon:0,
      lat:0
    },
    addressID:2656,
    locationInfo:{
      lng:113.64964385,
      lat:34.75661006
    },
    locationPoint:null
  },
  reducers: {
    handleChangeAddress(state,{payload}){
      return {
        ...state,
        address:payload,
      };
    },
    handleChangeLocationPoint(state,{payload}){
      return {
        ...state,
        locationPoint:payload,
      };
    },
    handleChangeLocationInfo(state,{payload}){
      return {
        ...state,
        locationInfo:payload,
      };
    },
  },
  effects: {
    *getLocationInfo({ payload, callback }, { call, put }) {
      const response = yield call(API.getCityId,payload);
      // if(!checkErrCode(response)){
      //   Toast.msg(response.errmsg);
      //   return false;
      // }
      yield put({
        type: 'handleChangeLocationInfo',
        payload:response
      })
    }
  },

}
