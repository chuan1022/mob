
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
import { WhiteSpace,InputItem,List } from 'antd-mobile';

import dva, {connect} from 'dva'
const app = dva();

@connect(({ global ,discoveryDetail}) => ({
  global,discoveryDetail
}))

class DiscoveryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zanList: [],
      comment:[],
      text:'state这家店真不错'
    }
  }

  componentDidMount() {
    console.log(111);
    
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
    // this.getArticlLikes();
    // this.getArticleComments();
  }
  getFindingDetail(){
    const {dispatch} = this.props;
    let params={
      id:this.state.id
    }
    dispatch({
      type: 'discoveryDetail/getFindingDetail',
      payload:params
    })
  }
  getArticlLikes(){
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
    const {dispatch} = this.props;
    let params={
      id:this.state.id
    }
    dispatch({
      type: 'discoveryDetail/getArticleComments',
      payload:params
    })
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

//     avatar: "ofWEE8puYPCIJzUFIocRGTcsz2BedsyTgTMfNMI869bzjvrjpinOgibqy2TNifpbf5VsTRnTA80uM3sxK3XDliy6mRA14AOIjrU4"
// follow_num: 0
// id: 4
// is_follow: 0
// name: "9N0p4rRyix
    return (
     
      <div className="page-discoverydetail has-bottom-bar" id="page-discoverydetail">
        {
          isLoading ? <Loading></Loading>:
          
          <div>
            <WhiteSpace />
            <UserCard
              // user={{
              //   name: detail.author.name,
              //   fansNum: detail.author.follow_num,
              //   avatar: detail.author.avatar,
              // }}
            />
            <div dangerouslySetInnerHTML={{ __html:detail.content}}>
            </div>
            <WhiteSpace />
            <WhiteSpace />
            {/* <CommentCard /> */}
            <p className="text-color-666 font-size-14 sees-num">浏览 {53}万</p>
            <WhiteSpace />
            <div className="zanList padding20-t padding20-b padding-10-l padding-10-r">
            <WhiteSpace size="lg"/>
              {(
                false ?
                  <span className="text-color-666 font-size-14">快来第一个点赞吧 </span> :
                  <ul className="text-color-666 font-size-14">
                    <li className="avatar">
                      <Avatar size={30} />
                    </li>
                    <li className="avatar">
                      <Avatar size={30} />
                    </li>
                    <li className="avatar">
                      <Avatar size={30} />
                    </li>
                  </ul>
              )}
              <WhiteSpace size="lg"/>
            </div>
            <WhiteSpace />
            <div className="comment-list margin10-t">
              <WhiteSpace />
              <p className="f17 text-color-333 font-bold">评论({this.state.comment.length})</p>
              <WhiteSpace size="lg"/>
              <div className="flex align-item-center justify-content-start align-items-center">
                <div style={{
                  marginRight:'15px'
                }}>
                  <Avatar size={40} />
                </div>
              <input  
              placeholder={(true?'快来写下你的评论吧':'快来写下第一个评论')}
              className="comment-input font-size-15 flex-1 text-color-999" type="text"/>
                {/* <List className="comment-input-list">
                  <InputItem
                    className="comment-input font-size-15"
                    name="comment"
                    placeholder="快来写下你的评论吧"
                  />
                </List> */}
              </div>

              {/* 评论列表 */}
              {
                (false ? <div className="no-comment">
                暂无评论
              </div> :
              <div className="flex align-item-center justify-content-start align-items-start">
                
                <ul className="comment-list">
                  <li className="comment-item">
                    <div className="flex align-items-start justify-content-start comment-list-card">
                        <div style={{
                          marginRight:'15px'
                        }}>
                          <Avatar size={40} />
                        </div>
                        <div className="flex-1 flex align-items-start justify-content-between border-bottom">
                          <div>
                            <p className="text-color-333 font-size-15">user</p>
                            <p className="font-size-14 margin-top-10 margin-bottom-10 text-color-999">
                              <span>2019.10.10</span>
                              <span className="padding-left-15">15:20</span>
                            </p>
                            <p className="text-color-333 font-size-15 line-height-18">
                              又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐
                            </p>
                          </div>
                          <span className="zan">点赞</span>
                        </div>
                        
                    </div> 
                  </li>
                  <li className="comment-item">
                    <div className="flex align-items-start justify-content-start comment-list-card">
                        <div style={{
                          marginRight:'15px'
                        }}>
                          <Avatar  size={40} />
                        </div>
                        <div className="flex-1 flex align-items-start justify-content-between border-bottom">
                          <div>
                            <p className="text-color-333 font-size-15">user</p>
                            <p className="font-size-14 margin-top-10 margin-bottom-10 text-color-999">
                              <span>2019.10.10</span>
                              <span className="padding-left-15">15:20</span>
                            </p>
                            <p className="text-color-333 font-size-15 line-height-18">
                              又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐又去了一次真不错，推荐
                            </p>
                          </div>
                          <span className="zan">点赞</span>
                        </div>
                        
                    </div> 
                  </li>
                </ul>
              </div>)
              }
            </div>
            {/* 底部工具栏 */}
            <div className="bottom-bar">
              <div className="flex text-align-center">
                <div className="item flex-1 ">
                  点赞
                </div>
                <div className="item flex-1">
                  评论
                </div>
                <div className="item flex-1">
                  收藏
                </div>
                <div className="item flex-1">
                  分享
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