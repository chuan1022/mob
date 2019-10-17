import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE =0;
export default  {
  namespace: 'discoveryDetail',
  state: {
    detail:null,
    commentList:{},
    likeList:{},      
    isLike:false,     //是否点赞
    isComment:false,  //是否评论
    isFavorite:false, //是否收藏
    isLoading:true
  },
  reducers: {
    handleChangeDetail(state,{payload}){
      console.log(payload)
      return {
        ...state,
        detail:payload,
        isLoading:false
      };
    },
    handleChangeCommentList(state,{payload}){
      console.log(payload)
      return {
        ...state,
        commentList:payload
      };
    },
    handleChangeLikeList(state,{payload}){
      console.log(payload)
      return {
        ...state,
        likeList:payload
      };
    },
    handleChangeIsLike(state,{payload}){
      console.log(payload)
      return {
        ...state,
        isLike:payload
      };
    },
    handleChangeIsComment(state,{payload}){
      console.log(payload)
      return {
        ...state,
        isComment:payload
      };
    },
    handleChangeIsFavorite(state,{payload}){
      console.log(payload)
      return {
        ...state,
        isFavorite:payload
      };
    }
  },
  effects: {
    //文章
    *getFindingDetail({ payload }, { call, put }) {
      const response = yield call( API.findingDetail, payload);
      yield put({
        type: 'handleChangeDetail',
        payload:response
      })
    },
    
    //点赞列表
    *getArticlLikes({ payload }, { call, put }) {
      const response = yield call( API.getArticlLikes, payload);
      yield put({
        type: 'handleChangeLikeList',
        payload:response
      })
    },
    //评论列表
    *getArticleComments({ payload }, { call, put }) {
      const response = yield call( API.getArticleComments, payload);
      yield put({
        type: 'handleChangeCommentList',
        payload:response
      })
    },

    //点赞 取消点赞
    *postArticleLike({ payload }, { call, put }) {
      const response = yield call( API.postArticleLike, payload);
      yield put({
        type: 'handleChangeLikeList',
        payload:response
      })
    },
    //评论 
    // *postArticleCommentLike({ payload }, { call, put }) {
    //   const response = yield call( API.postArticleCommentLike, payload);
    //   yield put({
    //     type: 'handleChangeDetail',
    //     payload:response
    //   })
    // },

    //关注
    // *postFollowAuthor({ payload }, { call, put }) {
    //   const response = yield call( API.postFollowAuthor, payload);
    //   yield put({
    //     type: 'handleChangeDetail',
    //     payload:response
    //   })
    // }
  }
}
