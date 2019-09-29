export default  {
  namespace: 'user',
  state: {
    isLogiin:false,
    coordinate:{
      lon:0,
      lat:0
    },
    addressID:0
  },
  reducers: {
    handleChangeLogin(state,val){
      return {
        ...state,
        isLogiin:data,
      };
    },
    handleChangeCoo(state,val){
      return {
        ...state,
        isLogiin:val,
      };
    },
    handleChangeAddressID(state,val){
      return {
        ...state,
        addressID:val,
      };
    }
  },
  effects: {
    *getInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, payload.user_id );
      console.log(checkErrCode(response));
      if(!checkErrCode(response)){
        layer.msg(response.errmsg);
        return false;
      }
      yield put({
        type: 'saveUser',
        payload: response,
      });
    },
    *editInfo({ payload, callback }, { call, put }) {
      const response = yield call(changeUserInfo, payload.user_id, payload );
      if(!checkErrCode(response)){
        layer.msg(response.errmsg);
        return false;
      }else{
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
  }
}
