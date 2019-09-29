
import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';

import './index.less';
import '@/styles/mixins.less';
import '@/styles/vr-antd.less';

import Masonry from 'react-masonry-component';
import dataList from './dadta';

import UserCard from '@/components/UserCard';
import CommentCard from '@/components/CommentCard';
import { WhiteSpace } from 'antd-mobile';

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        '首页',
        '关注',
        '推荐',
        '汽车',
        '摄影天地',
        '美食',
        '电影',
        '社区',
        '逛街'
      ],
      tab: 0,
      dataList: dataList
    }
  }
  onScrollStart() {
    console.log('start');
  }
  componentDidMount() {

  }
  renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
      <p>Content of {tab.title}</p>
    </div>);
  render() {
    const tabs = [
      { title: '关注' },
      { title: '推荐' },
      { title: '关注' },
      { title: '关注' },
      { title: '关注' },
      { title: '关注' },
      { title: '关注' },
      { title: '关注' },
    ];
    return (
      <div className="page-discoverydetail" id="page-discoverydetail">
        <WhiteSpace />
        <UserCard />
        <WhiteSpace />
        <WhiteSpace />
        <CommentCard />
        <WhiteSpace />

      </div >
    );
  }
}

export default Discovery;