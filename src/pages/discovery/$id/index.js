
import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import router from 'umi/router';

import './index.less';
import '@/styles/mixins.less';
import '@/styles/vr-antd.less';

import UserCard from '@/components/UserCard';
import CommentCard from '@/components/CommentCard';
import Avatar from '@/components/avatar';
import Loading from '@/components/loading';
import { WhiteSpace,List,Badge,Button,Toast } from 'antd-mobile';

import dva, {connect} from 'dva'
const app = dva();

@connect(({ global ,discoveryDetail}) => ({
  global,discoveryDetail
}))

class DiscoveryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  componentDidMount() {
    const { match, dispatch}  = this.props;
    dispatch({
      type:'global/handleChangeShowTab',
      payload:false
    })
 
    if (match.params.id) {
      this.setState({
        id: match.params.id
      },()=>{
        this.initPage()
      });
    }else{
      console.log('重定向到发现页');
      
    }
  }
  initPage(){
    this.getFindingDetail();
    this.getArticlLikes();
    this.getArticleComments();
   
  }
  getFindingDetail(){
    //详情
    const {dispatch} = this.props;
    let params={
      id:this.state.id,
      user_id:this.props.global.user.id
    }
    dispatch({
      type: 'discoveryDetail/getFindingDetail',
      payload:params
    })
  }
  getArticlLikes(){
    //点赞列表
    const {dispatch} = this.props;
    let params={
      id:this.state.id
    }
    dispatch({
      type: 'discoveryDetail/getArticlLikes',
      payload:params
    })
  }
  getArticleComments(){
    //评论列表
    const {dispatch} = this.props;
    let params={
      id:this.state.id,
      user_id:this.props.global.user.id,
      page:1,
      pageSize:10
    }
    dispatch({
      type: 'discoveryDetail/getArticleComments',
      payload:params
    })
  }
  handleLikeArticle(id){
    //文章点赞
    let params={
      article_id:this.state.id,
      user_id:this.props.global.user.id
    }
    this.props.dispatch({
      type: 'discoveryDetail/postArticleCommentLike',
      payload:params
    })
  }
  handleLikeComment(id){
    //评论点赞
    console.log(id);
    let params={
      comment_id:id,
      user_id:this.props.global.user.id
    }
    this.props.dispatch({
      type: 'discoveryDetail/postArticleCommentLike',
      payload:params
    }).then(()=>{
      this.getArticleComments()
    })
  }
  handleLikeArticle(){
    //点赞文章
    let params={
      article_id:this.state.id,
      user_id:this.props.global.user.id
    }
    this.props.dispatch({
      type: 'discoveryDetail/postArticleLike',
      payload:params
    }).then(()=>{
      this.getFindingDetail();
      this.getArticlLikes();
    })
  }
  handleCommentArticleBtn(isComment){
  
    if(isComment){
      Toast.info('您已评论，不能重复评论',1);
      return;
    } 
    this.refs['$commentInput'].focus();
  }
  handleComentChange(ev){
    this.setState({
      commentContent:ev.target.value
    })
  }
  handleCommentArticle(){
    //评论文章
    let params={
      article_id:this.state.id,
      user_id:this.props.global.user.id,
      content:this.state.commentContent
    }
    this.props.dispatch({
      type: 'discoveryDetail/postArticComment',
      payload:params
    }).then(()=>{
      this.getArticleComments();
      this.getFindingDetail();
    })
  }
  handleFavArticle(){
    //收藏文章
    let params={
      article_id:this.state.id,
      user_id:this.props.global.user.id
    }
    this.props.dispatch({
      type: 'discoveryDetail/postArticleFavorite',
      payload:params
    }).then(()=>{
      this.getFindingDetail()
    })
  }
  handleFollowAuthor(id){
    //关注作者
    console.log('guanzhu ')
    let params={
      author_id:id,
      user_id:this.props.global.user.id
    }
    this.props.dispatch({
      type: 'discoveryDetail/postFollowAuthor',
      payload:params
    }).then(()=>{
      this.getFindingDetail();
    })
  }

  handleShareArticle(){
    //分享文章
  }
  render() {
    const {
      detail,
      commentList,
      likeList,      
      isLike,     //是否点赞
      isComment,  //是否评论
      isFavorite, //是否收藏
      isLoading
    } = this.props.discoveryDetail
    const {
      user
    } = this.props.global
    
    return (
     
      <div className="page-discoverydetail has-bottom-bar" id="page-discoverydetail">
        
        {
          isLoading ? <Loading></Loading>:
          
          <div>
            <WhiteSpace />
            <UserCard
              user={{
                name: detail.author.name,
                fansNum: detail.author.follow_num,
                avatar: detail.author.avatar,
              }}
              time={detail.created_at}
              isFollow={detail.author.is_follow}
              handleClickFollow={
                this.handleFollowAuthor.bind(this,detail.author.id)
              }
            />
            <WhiteSpace />
            <WhiteSpace />
            <div className="detail-wrapper" dangerouslySetInnerHTML={{ __html:detail.content}}>
            </div>
            <WhiteSpace />
            <WhiteSpace />
            {/* <CommentCard /> */}
            <p className="text-color-666 font-size-14 sees-num">浏览 {53}万</p>
            <WhiteSpace />
            {
              likeList!=undefined?
              <div className={`like-list-wrapper padding20-t padding20-b padding-10-l padding-10-r ${likeList.length===0?'':'active'}`}>
              <WhiteSpace size="lg"/>
                {(
                  likeList.length===0?
                    <span className="text-color-666 font-size-14">快来第一个点赞吧 </span> :
                    <ul className="text-color-666 font-size-14 like-list flex justify-content-start flex-wrap">
                      {
                        likeList.slice(0,6).map((item,index)=>
                        <li key={index} className="avatar">
                          <Avatar size={30} avatarUrl={item.avatar} alt={item.avatar} />
                        </li>
                        )
                      }
                      {
                        likeList.length>6?
                        <li className="avatar">
                          <Avatar size={30} avatarUrl={require('./更多.png')} />
                        </li>:null
                      } 
                    </ul>
                )}
                <WhiteSpace size="lg"/>
              </div>:null
            }
            
            <WhiteSpace />
            <div className="comment-list margin10-t">
              <WhiteSpace />
              <p className="f17 text-color-333 font-bold">评论({commentList.length})</p>
              <WhiteSpace size="lg"/>
              {
                user? 
                <div className="flex align-item-center justify-content-start align-items-center">
                  <div style={{
                    marginRight:'15px'
                  }}>
                    <Avatar size={40} avatarUrl={user.avatar}/>
                  </div>
                  <input
                  ref="$commentInput"
                  onChange={(ev)=>this.handleComentChange(ev)}
                  placeholder={(true?'快来写下你的评论吧':'快来写下第一个评论')}
                  className="flex-1 comment-input font-size-15  text-color-999" type="text"/>
                 <Button 
                    className="margin-left-10"
                    onClick={this.handleCommentArticle.bind(this)} 
                    inline 
                    activeClassName="vr-btn-theme-active"
                    type="primary" 
                    size="small">提交</Button>
              </div>:
              <p className="text-align-center text-color-666">你还没有登录</p>
              }
             

              {/* 评论列表 */}
              {
                (commentList.length>0 ? 
              <div className="flex align-item-center justify-content-start align-items-start">
                <ul className="comment-list">
                  {
                    commentList.map((item,index)=>
                      <li key={index} className="comment-item">
                        <div className="flex align-items-start justify-content-start comment-list-card">
                            <div style={{
                              marginRight:'15px'
                            }}>
                              <Avatar size={40} avatarUrl={item.user_avatar} />
                            </div>
                            <div className="flex-1 flex align-items-start justify-content-between border-bottom">
                              <div>
                                <p className="text-color-333 font-size-15">{item.user_nickname}</p>
                                <p className="font-size-14 margin-top-10 margin-bottom-10 text-color-999">
                                  <span>{item.created_at}</span>
                                </p>
                                <p className="text-color-333 font-size-15 line-height-18">
                                  {item.content}
                                </p>
                              </div>
                              <span
                               onClick={this.handleLikeComment.bind(this,item.id)}
                               className={`zan ${item.is_like?'active':''}`}></span>
                            </div>
                        </div> 
                      </li>
                    )
                  }
                </ul>
              </div>:
              <div className="no-comment text-align-center">
                <img  width="100px" src={require('./无评论.png')} alt=""/>
                <p className="text-color-999 font-size-15 line-height-l margin-column-10">暂时还没有评论哟</p>
              </div>)
              }
            </div>
            {/* 底部工具栏 */}
            <div className="bottom-bar">
              <div className="flex text-align-center">
                <div className="item flex-1 ">
                  <div 
                  onClick={this.handleLikeArticle.bind(this,detail.id)}
                  className="item-content" >
                    <span className={`icon icon-zan ${isLike?'active':''}`} />
                    <sup>{detail.like_num}</sup>
                  </div>
                </div>
                <div className="item flex-1">
                  <div 
                  onClick={this.handleCommentArticleBtn.bind(this,isComment)}
                  className="item-content">
                    <span className={`icon icon-comm ${isComment?'active':''}`} />
                    <sup>{detail.comment_num}</sup>
                  </div>
                </div>
                <div className="item flex-1">
                  <div 
                   onClick={this.handleFavArticle.bind(this,detail.id)}
                  className="item-content">
                      <span className={`icon icon-fav ${isFavorite?'active':''}`} />
                    <sup>{detail.favorites_num}</sup>
                  </div>
                </div>
                <div className="item flex-1">
                  <div 
                   onClick={this.handleShareArticle.bind(this)}
                  className="item-content">
                    <span className={`icon icon-share`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div >
    );
  }
}

export default DiscoveryDetail;