import API from '@/services';
import BaiduMap from '@/components/baiduMap';
import {Toast} from 'antd-mobile';
import store from 'store';
const ERR_CODE = 0;
export default  {
  namespace: 'foodStore',
  state: {
    detail:null,
    commentList:[],
    likeList:[],      
    isLike:0,     //是否点赞
    isComment:0,  //是否评论
    isFavorite:0, //是否收藏
    isLoading:true
  },
  reducers: {
    handleChangeDetail(state,{payload}){

      return {
        ...state,
        detail:payload,
        isLike:payload.is_like,     
        isComment:payload.is_comment,  
        isFavorite:payload.is_favorite, 
        isLoading:false
      };
    },
    handleChangeCommentList(state,{payload}){

      return {
        ...state,
        commentList:payload
      };
    },
    handleChangeLikeList(state,{payload}){

      return {
        ...state,
        likeList:payload
      };
    },
    handleChangeIsLike(state,{payload}){
  
      return {
        ...state,
        isLike:payload
      };
    },
    handleChangeIsComment(state,{payload}){

      return {
        ...state,
        isComment:payload
      };
    },
    handleChangeIsFavorite(state,{payload}){

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

    //文章 点赞 
    *postArticleLike({ payload }, { call, put }) {
      const response = yield call( API.postArticleLike, payload);
      if( ERR_CODE === response.errcode){
        Toast.info(response.errmsg,1)
      }
    },
    // 评论点赞 
    *postArticleCommentLike({ payload }, { call, put }) {
      const response = yield call( API.postArticleCommentLike, payload);

      if( ERR_CODE === response.errcode){
        Toast.info(response.errmsg,1)
      }
    },
    // 文章点赞 
    *postArticleLike({ payload }, { call, put }) {
      const response = yield call( API.postArticleLike, payload);
      
      if( ERR_CODE === response.errcode){
        Toast.info(response.errmsg,1)
      }
    },
    // 文章收藏
    *postArticleFavorite({ payload }, { call, put }) {
      const response = yield call( API.postArticleFavorite, payload);
      
      if( ERR_CODE === response.errcode){
        Toast.info(response.errmsg,1)
      }
    },
    //关注作者
    *postFollowAuthor({ payload }, { call, put }) {
      const response = yield call( API.postFollowAuthor, payload);

      if( ERR_CODE === response.errcode){
        Toast.info(response.errmsg,1)
      }
    },
     //发布评论
     *postArticComment({ payload }, { call, put }) {
      const response = yield call( API.postArticComment, payload);
      Toast.info(response.errmsg,1)
      // if( ERR_CODE === response.errcode){
      //   Toast.info(response.errmsg,1)
      // }
    }
  }
}
