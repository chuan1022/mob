
import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';

import './index.less';
import '@/styles/mixins.less';
import '@/styles/vr-antd.less';

import Masonry from 'react-masonry-component';
import dataList from './dadta';

import UserCard from '@/components/UserCard';
import CommentCard from '@/components/CommentCard';
import BussCard from '@/components/bussCard';
import Avatar from '@/components/avatar';
import { WhiteSpace,InputItem,List } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        "errcode": 0,
        "errmsg": "string",
        "data": [
          {
            "id": 0,
            "title": "string",
            "created_at": "string",
            "content": "string",
            "pageview": 0,
            "link_num": 0,
            "comment_num": 0,
            "favorites_num": 0,
            "is_like": 0,
            "is_comment": 0,
            "is_favorite": 0,
            "author": {
              "id": 0,
              "name": "string",
              "avatar": "string",
              "follow_num": 0,
              "is_follow": 0
            }
          }
        ]
      },
      zanList: [],
      comment:[],
      text:'state这家店真不错'
    }
  }
  static propTypes = {
    form: formShape,
   
  }
  onScrollStart() {
    console.log('start');
  }
  componentDidMount() {
    // this.props.form.setFieldsValue({
    //   input3: this.state.text
    // })
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    
    return (
      <div className="page-discoverydetail" id="page-discoverydetail">
        <WhiteSpace />
        <UserCard />
        <WhiteSpace />
        <WhiteSpace />
        <CommentCard />
        <WhiteSpace />
        <BussCard />
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
          <p className="f17 text-color-333 font-bold">评论（{this.state.comment.length}）</p>
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
            </ul>
          </div>)
          }
    
          {/* 底部工具栏 */}
          <div>
            <div className="flex ">
              <div className="item flex-1 text-align-center"></div>
              <div className="item">  </div>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default createForm()(Discovery);