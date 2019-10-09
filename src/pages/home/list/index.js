
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Sticky,Tabs, PullToRefresh,WhiteSpace } from 'antd-mobile';
import Masonry from 'react-masonry-component';
import dataList from './dadta';
import DiscItem from '@/components/discoveryItem'
import SearchCard from '@/components/searchCard'


import request from 'umi-request';
import API from '@/services'
import './index.less';
import '@/styles/mixins.less';
const app = dva();

const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ count }) => ({
  count
}))

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0
    }
    this.handleOnFresh = this.handleOnFresh.bind(this);
    this.getFindType = this.getFindType.bind(this);
    this.handelTabClick = this.handelTabClick.bind(this);
  }


  onScrollStart() {
    console.log('start');
  }
  componentDidMount() {
    this.getFindType();
    this.getAttentionList();
  }
  componentDidUpdate(prevProps,prevState){
    
    if(this.state.activeType!==prevState.activeType){
      //请求新列表
      this.getAttentionList();
    }
  }

  getFindType(refresh){
   if(this.state.tabs.length && !refresh) return;
   API.findType({
      type:'find'
    }).then(res=>{
      let tabs=[];
      res.forEach(el => {
        tabs.push({
          title:el.name,
          type:el.type
        })
      });

      this.setState({
        tabs:tabs,
      })
      console.log(this.state.tabs);
    }).catch(err=>{
      console.log(err);
    })
  }
  getAttentionList(){
    let para ={
      type:this.state.activeType,
      user_id:this.state.user_id,
      lon:this.state.lon,
      lat:this.state.lat,
      page:this.state.currentPage,
      pageSize:this.state.currentPageSize
    }
    let data =  [{
        "id": 1,
        "title": "string",
        "cover_image": "string",
        "author_avatar": "string",
        "author_name": "string",
        "pageview": 0,
        "is_like": 0
      },{
        "id": 2,
        "title": "string",
        "cover_image": "string",
        "author_avatar": "string",
        "author_name": "string",
        "pageview": 0,
        "is_like": 0
      }];
      this.setState({
        dataList:data
      })
  }
  handelTabClick(tab,index){
    this.setState({
      activeType:tab.type
    })
  }

  handleOnFresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  render() {
    return (
      <div className="page-list page-bg" id="page-list">
        <div className="bg-color-theme padding-left-15 padding-right-15 border-box top-wrapper padding-bottom-5">
          <WhiteSpace/>
          <SearchCard 
            showAddress={false}
            showService={false}
          >
            </SearchCard>
          <WhiteSpace size="lg"/>
          <div className="list-tab vr-tabs position-relative">
            <Tabs
              tabBarBackgroundColor='#ED6C2D'
              tabBarTextStyle={{
                'fontSize': '15px',
                'color': '#fff',
                width:'auto'
              }}
              tabBarUnderlineStyle={{
                'border': '1px solid #ED6C2D',
                'width': '20px',
                'display': 'none'
              }}
              tabs={this.state.tabs}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
              onTabClick={(tab,index)=>this.handelTabClick(tab,index)}
            >
            </Tabs>
            <div className="down-button text-color-fff bg-color-theme flex align-items-center justify-content-center">
              >
            </div>
          </div>
        </div>
       
      </div >
    );
  }
}
export default Discovery;

// export default Discovery;