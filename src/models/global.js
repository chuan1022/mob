import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'global',
  state: {
    isLogiin:false, 
    showTab:true,
    // addressID:2656,
    locationInfo:{
      address: "",
      area_id: 0,
      city_name: "",
    },

    locationPoint:{
      lat:'',
      lng:''
    }
  },
  reducers: {
    handleChangeAddress(state,{payload}){
      return {
        ...state,
        address:payload,
      };
    },
    handleChangeLocationPoint(state,{payload}){
      store.set('locationPoint',payload)
      return {
        ...state,
        locationPoint:payload,
      };
    },
    handleChangeLocationInfo(state,{payload}){
      store.set('locationInfo',payload)
      return {
        ...state,
        locationInfo:payload,
      };
    },
    handleChangeShowTab(state,{payload}){
      return {
        ...state,
        showTab:payload,
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
      // if(callback && typeof (callback) ==='function'){
      //   callback(response)
      // }
 
      yield put({
        type: 'handleChangeLocationInfo',
        payload:response
      })
    }
  },

}
