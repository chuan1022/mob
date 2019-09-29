
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import Masonry from 'react-masonry-component';
import dataList from './dadta';
import DiscItem from '@/components/discoveryItem'
import { Sticky,Tabs, PullToRefresh } from 'antd-mobile';

import {findType,finding} from '@/services/discovery';
import request from 'umi-request';

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
    console.log(prevState,this.state);
    if(this.state.activeType!==prevState.activeType){
      //请求新列表
      this.getAttentionList();
    }
  }
  getFindType(refresh){
   if(this.state.tabs.length && !refresh) return;
    findType({
      type:'find'
    }).then(res=>{
      let tabs=[];
      res.data.forEach(el => {
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
      <div className="page-discovery page-bg" id="page-discovery">
        <div className="discovery-tab vr-tabs">
          <Tabs
            tabBarBackgroundColor='#fff'
            tabBarTextStyle={{
              'fontSize': '15px',
              'color': '#333'
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
        </div>
        <div >
          <PullToRefresh
            onRefresh={this.handleOnFresh}
            refreshing={this.state.refreshing}
            className='discovery-items-wrapper'
            style={{
              overflow: 'auto',
            }}
          >
            <Masonry
              elementType={'ul'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
              ref={function (c) { this.masonry = this.masonry || c.masonry; }.bind(this)}
            >
              {
                (this.state.dataList ?
                  this.state.dataList.map(
                    (item, j) =>
                      <li
                        className={`item overflow-hidden ${(j + 1) % 2 ? 'item-odd' : 'item-even'}`}
                        key={j}>
                          <Link className="link" to={`/discovery/${item.id}`}>
                            <DiscItem data={item} type={(j + 1) % 2 ? 'odd' : 'even'} />
                          </Link>
                      </li>
                  ) : null)
              }
            </Masonry>
          </PullToRefresh>
        </div>

      </div >
    );
  }
}
export default Discovery;

// export default Discovery;