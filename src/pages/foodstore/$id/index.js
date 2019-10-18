
import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import router from 'umi/router';
import BScroll from '@better-scroll/core'

import './index.less';
import '@/styles/mixins.less';
import '@/styles/vr-antd.less';

import UserCard from '@/components/UserCard';
import CommentCard from '@/components/CommentCard';
import Avatar from '@/components/avatar';
import Loading from '@/components/loading';
import { WhiteSpace,List,Badge,Button,Toast ,Tabs} from 'antd-mobile';

import dva, {connect} from 'dva'
const app = dva();

@connect(({ global ,foodStore}) => ({
  global,foodStore
}))

class FoodStore extends Component {
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
        this.initScroll()
      });
    }else{
      console.log('重定向到发现页');
      
    }
  }
  initScroll(){
    let wrapper = this.refs.$scroll;
    let bs = new BScroll(wrapper, {
      click: true,
      scrollY: true,
      probeType: 3,
      pullUpLoad: true,
      threshold:50,
      stop:30
    })
  }
  initPage(){
  
   
  }
  getFindingDetail(){
    //详情
    const {dispatch} = this.props;
    let params={
      id:this.state.id,
      user_id:this.props.global.user.id
    }
    dispatch({
      type: 'foodStore/getFindingDetail',
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
      type: 'foodStore/getArticlLikes',
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
      type: 'foodStore/getArticleComments',
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
      type: 'foodStore/postArticleCommentLike',
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
      type: 'foodStore/postArticleCommentLike',
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
      type: 'foodStore/postArticleLike',
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
      type: 'foodStore/postArticComment',
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
      type: 'foodStore/postArticleFavorite',
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
      type: 'foodStore/postFollowAuthor',
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
    } = this.props.foodStore
    const {
      user
    } = this.props.global
    
    const tabs=[
      {
        title:'点菜'
      },
      {
        title:'评价'
      },
      {
        title:'商家'
      },
      {
        title:'其他'
      },
    ]
    return (
      <div className="page-foodStore" id="page-foodStore">
          <div 
          style={{
            height:document.documentElement.clientHeight
          }}
          className="scroll-wrapper" 
          ref="$scroll">
            <div className="scroll-content">
              {/* vr wrapper */}
              <div 
              style={{
                height:document.documentElement.clientHeight
              }}
              className="vr-wrapper">
                <div className="vr-box flex align-items-center justify-content-around">
                  <p>全景容器</p>
                </div>
                <div className="up-btn">上翻按钮</div>
              </div>
              {/* store-wrapper */}
              <div className="store-wrapper">
                <div className="vr-tabs">
                <Tabs
                  tabBarBackgroundColor='#fff'
                  tabBarTextStyle={{
                    'fontSize': '15px',
                    'color': '#333',
                    'lineHeight':'40px',
                    'height':'40px'
                  }}
                  tabBarUnderlineStyle={{
                    'display': 'none'
                  }}
                  style={{
                    height:'40px'
                  }}
                  initialPage={1}
                  tabs={tabs}
                  renderTabBar={props => <Tabs.DefaultTabBar {...props}  />}
                  // onChange={(tab,index)=>this.handleTabChange(tab,index)}
                >
                  <div className="tab-content">
                    点菜
                  </div>
                  <div className="tab-content">
                    评价
                  </div>
                  <div className="tab-content">
                    商家
                  </div>
                  <div className="tab-content">
                    其他
                  </div>
                </Tabs>
              </div>

              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default FoodStore;