import proxyRequest from './request';
let API = {

}
const baseUrl="/fc";

//文章的评论列表
API.getArticleComments=(params)=> {
  return proxyRequest.get(baseUrl+'/comment/article', params)
};

//发布评论
API.postArticComment=(params)=> {
  return proxyRequest.post(baseUrl+'/comment/article', params)
};

//获取点赞列表
API.getArticlLikes=(params)=> {
  return proxyRequest.get(baseUrl+'/like/article', params)
};
//文章 点赞 取消点赞
API.postArticleLike=(params)=> {
  return proxyRequest.post(baseUrl+'/like/article', params)
};

//评论 点赞 取消点赞
API.postArticleCommentLike=(params)=> {
  return proxyRequest.post(baseUrl+'/like/article/comment', params)
};

//收藏，取消收藏
API.postArticleFavorite=(params)=> {
  return proxyRequest.post(baseUrl+'/article/favorites', params)
};

//关注、取消关注作者
API.postFollowAuthor=(params)=> {
  return proxyRequest.post(baseUrl+'/follow/author', params)
};


export default API